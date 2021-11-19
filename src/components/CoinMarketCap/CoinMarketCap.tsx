import React, { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js';
import styled from 'styled-components'
import { Card, BoxProps, Flex, Box, Text } from 'uikit'
import { languagesOptions } from 'config/localization';
import { Select } from 'components';
import { useTranslation } from 'contexts/Localization'
import { useLanguange } from 'store/app/hooks';
import { useCoinsList, useFetchCoinInfo, useFetchCoinsList } from 'store/coins/hooks';
import CoinItem from './CoinItem'
import { DropDown } from '../DropDown'

const StyledPage = styled(Card)`
  width: 300px;
  height: 150px;
  /* padding: 16px; */
  box-shadow: 0px 0px 8px 4px rgba(65, 104, 237);
  overflow: visible;
`

const StyledPageItem = styled(Box)`
  margin: 0 16px;
`


export const CoinMarketCap: React.FC<BoxProps> = ({ ...props }) => {
  const [languange, setUseLanguage] = useLanguange();
  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState(false);

  useFetchCoinsList()
  const coinsList = useCoinsList()
  const [currentCoin, setCurrentCoin] = useState(coinsList[0])
  useFetchCoinInfo(currentCoin?.coin_id)

  useEffect(() => {
    if (coinsList.length && !currentCoin) {
      setCurrentCoin(coinsList[0])
    }
  }, [currentCoin, coinsList])

  const marketCap = useMemo(() => {
    if (!currentCoin) return '--'
    return new BigNumber(currentCoin?.circulating_supply).times(currentCoin?.current_price).toFixed(0)
  }, [currentCoin])

  return (
    <StyledPage {...props}>
      <StyledPageItem pt="8px">
        <CoinItem showHelp onTouch={() => setIsOpen(!isOpen)} coinInfo={currentCoin} />
      </StyledPageItem>
      <Box>
        <DropDown fillWidth isOpen={isOpen} setIsOpen={setIsOpen}>
          <StyledPageItem>
            {
              coinsList.map(item => (<CoinItem key={item.coin_id}
                fillClickArea
                isActive={item.coin_id === currentCoin?.coin_id}
                onClick={(coin) => {
                  setIsOpen(!isOpen)
                  setCurrentCoin(coin)
                }}
                coinInfo={item} />))
            }
          </StyledPageItem>
        </DropDown>
      </Box>
      <StyledPageItem>
        <Flex mt="8px" justifyContent="space-between">
          <Box>
            <Text fontSize="14px" color="textTips">{t('MARKET CAP')}</Text>
            <Text bold color="textPrimary" fontSize="14px">${marketCap}</Text>
          </Box>
          <Box>
            <Text fontSize="14px" color="textTips" textAlign="right">{t('VOLUME')}</Text>
            <Text bold color="textPrimary" fontSize="14px" textAlign="right">$--</Text>
          </Box>
        </Flex>
      </StyledPageItem>
    </StyledPage>
  )
}
