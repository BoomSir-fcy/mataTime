import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Box, Flex, Image, Text, RefreshRingIcon, Button } from 'uikit'
import QuestionHelper from '../QuestionHelper'

const CoinItemStyled = styled(Flex) <{ fillClickArea?: boolean; isActive?: boolean }>`
  width: 100%;
  height: 75px;
  cursor: ${({ fillClickArea, isActive }) => isActive ? 'default' : (fillClickArea ? 'pointer' : 'auto')};
  opacity: ${({ isActive }) => isActive ? '0.5' : '1'};
`
const StyledTriangle = styled.span`
  border: 6px solid transparent;
  border-top-color: ${({ theme }) => theme.colors.primary};
  position: relative;
  top: 3px;
`

interface CoinItemProps {
  fillClickArea?: boolean
  showHelp?: boolean
  isActive?: boolean
  onClick?: (coinInfo: Api.Coins.CoinInfo) => void
  onTouch?: (coinInfo: Api.Coins.CoinInfo) => void
  onRefresh?: (coinInfo: Api.Coins.CoinInfo) => void
  coinInfo: Api.Coins.CoinInfo
}

const CoinItem: React.FC<CoinItemProps> = ({ fillClickArea, showHelp, coinInfo, isActive, onClick, onTouch, onRefresh }) => {
  const { t } = useTranslation()

  const toggling = (event: React.MouseEvent<HTMLDivElement | HTMLOrSVGElement>) => {
    event.stopPropagation()
  }

  return (
    <CoinItemStyled isActive={isActive} fillClickArea={fillClickArea} onClick={(event) => {
      toggling(event);
      if (isActive) return
      onClick && onClick(coinInfo);
    }}>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Flex onClick={(subEvent) => {
          toggling(subEvent);
          onTouch && onTouch(coinInfo);
        }} style={{ cursor: isActive ? 'default' : 'pointer' }} alignItems="center">
          <Box width="40px">
            <Image width={40} height={40} src={coinInfo?.coin_image_url} />
          </Box>
          <Box ml="8px">
            <Flex pr="8px" alignItems="center" justifyContent="space-between">
              <Text bold color="primary" fontSize="18px">{coinInfo?.coin_symbol}</Text>
              {showHelp && (
                <QuestionHelper
                  text={<>
                    <Text fontSize="14px">{t('Update time:')} {coinInfo?.add_time}</Text>
                    <Text fontSize="14px">{t('Powered by CoinMarketCap')}</Text>
                  </>}
                  ml="4px"
                  onClick={toggling}
                  placement="top-start"
                  style={{ cursor: 'auto' }}
                />)
              }
              {onTouch && (<StyledTriangle />)}
            </Flex>
            <Text color="textTips" fontSize="14px">{coinInfo?.coin_name}</Text>
          </Box>
        </Flex>
        <Box>
          <Text bold color="primary" fontSize="18px" textAlign="right">${coinInfo?.current_price}</Text>
          <Flex>
            <Text color="upPrice" fontSize="14px" textAlign="right">+{coinInfo?.price_change_percentage_24h}%</Text>
            {
              onRefresh && (
                <RefreshRingIcon
                  onClick={(subEvent) => {
                    toggling(subEvent);
                    onRefresh(coinInfo)
                  }}
                  style={{ cursor: 'pointer' }}
                  ml="4px"
                  color="textPrimary"
                  width="16px" />
              )
            }
          </Flex>
        </Box>
      </Flex>
    </CoinItemStyled>
  )
}

export default CoinItem