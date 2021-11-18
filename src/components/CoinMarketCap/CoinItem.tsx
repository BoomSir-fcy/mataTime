import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Image, Text, RefreshRingIcon, Button } from 'uikit'


const CoinItemStyled = styled(Flex)`
  width: 100%;
  height: 75px;
`
const StyledTriangle = styled.span`
  border: 6px solid transparent;
  border-top-color: ${({ theme }) => theme.colors.primary};
  position: relative;
  top: 3px;
`

interface CoinItemProps {
  fillClickArea?: boolean
  onClick?: (coinInfo: Api.Coins.CoinInfo) => void
  onTouch?: (coinInfo: Api.Coins.CoinInfo) => void
  onRefresh?: (coinInfo: Api.Coins.CoinInfo) => void
  coinInfo: Api.Coins.CoinInfo
}

const CoinItem: React.FC<CoinItemProps> = ({ fillClickArea, coinInfo, onClick, onTouch, onRefresh }) => {

  const toggling = (event: React.MouseEvent<HTMLDivElement | HTMLOrSVGElement>) => {
    event.stopPropagation()
  }

  return (
    <CoinItemStyled onClick={(event) => {
      toggling(event);
      onClick && onClick(coinInfo);
    }}>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Flex onClick={(subEvent) => {
          toggling(subEvent);
          onTouch && onTouch(coinInfo);
        }} style={{ cursor: 'pointer' }} alignItems="center">
          <Box width="40px">
            <Image width={40} height={40} src={coinInfo?.coin_image_url} />
          </Box>
          <Box ml="8px">
            <Flex pr="8px" alignItems="center" justifyContent="space-between">
              <Text bold color="primary" fontSize="18px">{coinInfo?.coin_symbol}</Text>
              <StyledTriangle />
            </Flex>
            <Text color="textTips" fontSize="14px">{coinInfo?.coin_name}</Text>
          </Box>
        </Flex>
        <Box>
          <Text bold color="primary" fontSize="18px" textAlign="right">${coinInfo?.current_price}</Text>
          <Flex>
            <Text color="upPrice" fontSize="14px" textAlign="right">+{coinInfo?.price_change_percentage_24h}%</Text>
            <RefreshRingIcon
              onClick={(subEvent) => {
                toggling(subEvent);
                onRefresh && onRefresh(coinInfo)
              }}
              style={{ cursor: 'pointer' }}
              ml="4px"
              color="textPrimary"
              width="16px" />
          </Flex>
        </Box>
      </Flex>
    </CoinItemStyled>
  )
}

export default CoinItem
