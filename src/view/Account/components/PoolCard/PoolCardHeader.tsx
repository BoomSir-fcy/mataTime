import React, { useState } from 'react';
import { Flex, Box, Heading, LinkExternal, Card, Text } from 'uikit';
import styled from 'styled-components';
import { Container } from 'components';
import { TokenPairImage, TokenImage } from 'components';
import { getBscScanLink } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';

const BoxHeaderStyled = styled(Box)`
  position: relative;
`;
const ContainerStyled = styled(Container)`
  padding-bottom: 0;
`;

const CardTipsStyled = styled(Card)`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: ${({ theme }) => `0 ${theme.radii.card} 0 20px`};
  width: 30%;
  background: ${({ theme }) => theme.colors.background};
  min-width: 150px;
  &::after {
    content: '';
    display: block;
    padding-top: 38.2%;
  }
  /* height: 56px;
  line-height: 56px; */
`;
const TextTipsStyled = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
`;

type address = string;
interface PoolCardHeader {
  depositToken: address;
  rewardToken0: address;
  rewardToken1: address;
  depositSymbol: string;
  rewardToken0Symbol: string;
  rewardToken1Symbol: string;
  poolAddress: string;
}

const PoolCardHeader: React.FC<PoolCardHeader> = ({
  depositToken,
  rewardToken0,
  rewardToken1,
  depositSymbol,
  rewardToken0Symbol,
  rewardToken1Symbol,
  poolAddress,
}) => {
  const { t } = useTranslation();

  return (
    <BoxHeaderStyled>
      <ContainerStyled>
        <Flex alignItems='center'>
          <TokenImage tokenAddress={depositToken} width={45} height={45} />
          <Box ml='8px'>
            <Text fontSize='18px' color='white_black' bold>
              {depositSymbol}
            </Text>
            <LinkExternal
              height='24px'
              color='textPrimary'
              fontSize='16px'
              href={getBscScanLink(poolAddress, 'token')}
            >
              {t('View Contract')}
            </LinkExternal>
          </Box>
        </Flex>
      </ContainerStyled>
      <CardTipsStyled>
        <TextTipsStyled textAlign='center' color='white'>
          {t('Earn')} {rewardToken0Symbol}
          &#38;
          {rewardToken1Symbol}
        </TextTipsStyled>
      </CardTipsStyled>
    </BoxHeaderStyled>
  );
};

export default PoolCardHeader;
