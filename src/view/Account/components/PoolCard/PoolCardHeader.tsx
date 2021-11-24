import React, { useState } from 'react';
import { Flex, Box, Heading, LinkExternal, Card, Text } from 'uikit';
import styled from 'styled-components'
import { Container } from 'components'
import { TokenPairImage, TokenImage } from 'components';
import { getBscScanLink } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';


const BoxHeaderStyled = styled(Box)`
 position: relative;
`
const ContainerStyled = styled(Container)`
 padding-bottom: 0;
`

const CardTipsStyled = styled(Card)`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: ${({ theme }) => `0 ${theme.radii.card} 0 20px`};
  /* border-radius: ${({ theme }) => `0 ${theme.radii.card} 0 ${theme.radii.card}`}; */
  background: ${({ theme }) => theme.colors.primary};
  width: 30%;
  background: linear-gradient(90deg, #5B3CE0, #5A7EFA);
  min-width: 150px;
  &::after{
    content: '';
    display: block;
    padding-top: 38.2%;
  }
  /* height: 56px;
  line-height: 56px; */
`
const TextTipsStyled = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
`

type address = string
interface PoolCardHeader {
  depositToken: address
  rewardToken0: address
  rewardToken1: address
  depositSymbol: string
  rewardToken0Symbol: string
  rewardToken1Symbol: string
  poolAddress: string
}

const PoolCardHeader: React.FC<PoolCardHeader> = ({
  depositToken,
  rewardToken0,
  rewardToken1,
  depositSymbol,
  rewardToken0Symbol,
  rewardToken1Symbol,
  poolAddress
}) => {
  const { t } = useTranslation()

  return (
    <BoxHeaderStyled>
      <ContainerStyled>
        <Flex>
          <TokenImage tokenAddress="0x9A78649501BbAAC285Ea4187299471B7ad4ABD35" width={55} height={55} />

          <Box ml="8px">
            <Heading>{depositSymbol}</Heading>
            <LinkExternal fontSize="16px" href={getBscScanLink(poolAddress, 'token')}>
              {t('View Contract')}
            </LinkExternal>
          </Box>
        </Flex>
      </ContainerStyled>
      <CardTipsStyled>
        <TextTipsStyled textAlign="center" color="white_black">赚取 {rewardToken0Symbol}
          &#38;
          {rewardToken1Symbol}</TextTipsStyled>
      </CardTipsStyled>
    </BoxHeaderStyled>
  )
}

export default PoolCardHeader;
