import React, { useState } from 'react';
import { Flex, Box, Heading, LinkExternal, Card, Text } from 'uikit';
import styled from 'styled-components'
import { Container } from 'components'
import { TokenPairImage } from 'components';
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
  background: pink;
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

interface PoolCardHeader {
  singleToken?: boolean
  primaryAddress?: string
  secondaryAddress?: string
  secondarySymbol?: string
  primarySymbol?: string
  lpAddress?: string
}

const PoolCardHeader: React.FC<PoolCardHeader> = ({
  singleToken,
  primaryAddress,
  secondaryAddress,
  primarySymbol,
  secondarySymbol,
  lpAddress,
}) => {
  const { t } = useTranslation()

  return (
    <BoxHeaderStyled>
      <ContainerStyled>
        <Flex>
          {singleToken ? (
            <TokenPairImage variant="binary" primaryAddress={primaryAddress} secondaryAddress={secondaryAddress} width={55} height={55} />
          ) : (
            <TokenPairImage variant="inverted" primaryAddress={primaryAddress} secondaryAddress={secondaryAddress} width={55} height={55} />
          )}
          <Box ml="8px">
            <Heading>{primarySymbol}-{secondarySymbol}</Heading>
            <LinkExternal fontSize="16px" href={getBscScanLink(lpAddress, 'token')}>
              {t('View Contract')}
            </LinkExternal>
          </Box>
        </Flex>
      </ContainerStyled>
      <CardTipsStyled>
        <TextTipsStyled textAlign="center" color="white">赚取 BNB</TextTipsStyled>
      </CardTipsStyled>
    </BoxHeaderStyled>
  )
}

export default PoolCardHeader;
