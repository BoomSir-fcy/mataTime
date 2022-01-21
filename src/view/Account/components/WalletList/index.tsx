import React, { useState, useEffect } from 'react';
import { Box, Text, Spinner } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { Link } from 'react-router-dom';
import { useStore } from 'store';
import Coins from './Coins';

const ContentBox = styled(Box)`
  color: ${({ theme }) => theme.colors.white_black};
`;
export const HeadBox = styled.div`
  width: 100%;
  grid-template-columns: 50% 50%;
  align-items: center;
  min-height: 30px;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  display: none;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: grid;
    grid-template-columns: 18% 19% 19% 19% 25%;
  }
`;
const HeadText = styled(Text)`
  font-size: 14px;
  &:last-child {
    text-align: center;
  }
`;

export interface info {
  address: string;
  available_balance: string;
  freeze_balance: string;
  token_type: number;
  total_balance: string;
  uid: number;
  tokenAddress: string;
}
interface init {
  BalanceList: info[];
  Balance: string;
  TokenWithDrawFee: string;
  TokenWithDrawMinNum: string;
  WithDrawFeeType: number;
  BnbAvailableBalance: string;
}
const WalletList: React.FC<init> = ({
  BalanceList,
  TokenWithDrawMinNum,
  Balance,
  TokenWithDrawFee,
  WithDrawFeeType,
  BnbAvailableBalance,
}) => {
  return (
    <ContentBox>
      <Head />
      {BalanceList.length > 1 ? (
        BalanceList.map((item, index) => (
          <Coins
            key={item.token_type}
            BalanceList={BalanceList}
            TokenWithDrawMinNum={TokenWithDrawMinNum}
            Balance={Balance}
            TokenInfo={item}
            TokenWithDrawFee={TokenWithDrawFee}
            WithDrawFeeType={WithDrawFeeType}
            BnbAvailableBalance={BnbAvailableBalance}
          />
        ))
      ) : (
        <Spinner />
      )}
    </ContentBox>
  );
};

const Head = () => {
  const { t } = useTranslation();
  return (
    <HeadBox>
      <HeadText>{t('Assets')}</HeadText>
      <HeadText>{t('Account Wallet Balance')}</HeadText>
      <HeadText>{t('Frozen')}</HeadText>
      <HeadText>{t('Account Available Balance')}</HeadText>
      <HeadText>{t('Manage')}</HeadText>
    </HeadBox>
  );
};

export default WalletList;
