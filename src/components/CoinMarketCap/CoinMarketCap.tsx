import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card, BoxProps, Flex, Box, Text } from 'uikit'
import { languagesOptions } from 'config/localization';
import { Select } from 'components';
import { useTranslation } from 'contexts/Localization'
import { useLanguange } from 'store/app/hooks';
import { useCoinsList, useFetchCoinsList } from 'store/coins/hooks';
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
  padding: 0 16px;
`


export const CoinMarketCap: React.FC<BoxProps> = ({ ...props }) => {
  const [languange, setUseLanguage] = useLanguange();

  const [isOpen, setIsOpen] = useState(false);

  useFetchCoinsList()
  const coinsList = useCoinsList()
  const [currentCoin, setCurrentCoin] = useState(coinsList[0])

  console.log(currentCoin, coinsList)

  useEffect(() => {
    if (coinsList.length && !currentCoin) {
      setCurrentCoin(coinsList[0])
    }
  }, [currentCoin, coinsList])

  return (
    <StyledPage {...props}>
      <StyledPageItem>
        <CoinItem onTouch={() => setIsOpen(!isOpen)} coinInfo={currentCoin} />
      </StyledPageItem>
      <Box>
        <DropDown fillWidth isOpen={isOpen} setIsOpen={setIsOpen}>
          <StyledPageItem>
            {
              coinsList.map(item => (<CoinItem key={item.coin_id} coinInfo={item} />))
            }
          </StyledPageItem>
        </DropDown>
      </Box>
      <StyledPageItem>
        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="14px" color="textTips">MARKET CAP</Text>
            <Text bold color="textPrimary" fontSize="14px">$16M</Text>
          </Box>
          <Box>
            <Text fontSize="14px" color="textTips" textAlign="right">VOLUME</Text>
            <Text bold color="textPrimary" fontSize="14px" textAlign="right">$16M</Text>
          </Box>
        </Flex>
      </StyledPageItem>
    </StyledPage>
  )
}
