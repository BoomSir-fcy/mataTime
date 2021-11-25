import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { Container } from 'components'
import WalletBox from './walletBox'
import { getTimeAddress } from 'utils/addressHelpers';
import { useTokenBalance } from 'view/exchange/hook';
import { useFetchWalletInfo, useFetchApproveNum } from 'store/wallet/hooks';
import { useWeb3React } from '@web3-react/core';
import { useStore } from 'store';


const NoPdBottom = styled(Container)`
padding: 0;
`
const BorderWalletBox = styled(WalletBox)`
border-right: 1px solid #3A4459;
`

const TokenAccount: React.FC = () => {
  useFetchWalletInfo()
  useFetchApproveNum()
  const { account } = useWeb3React()
  const info = {
    address: "",
    available_balance: "0",
    freeze_balance: "0",
    token_type: 1,
    total_balance: "0",
    uid: 0
  }
  const [TimeInfo, setTimeInfo] = useState(info)
  const [MatterInfo, setMatterInfo] = useState(info)
  const timeAddress = getTimeAddress()
  const { balance: timeBalance } = useTokenBalance(timeAddress)
  const BalanceList = useStore(p => p.wallet.wallet);
  const getMyBalance = async () => {
    for (let i = 0; i < BalanceList.length; i++) {
      if (BalanceList[i].token_type === 1) {
        setTimeInfo(BalanceList[i])
      }
      if (BalanceList[i].token_type === 2) {
        setMatterInfo(BalanceList[i])
      }
    }
  }
  useEffect(() => {
    account && BalanceList.length > 1 && getMyBalance()
    return () => {
      setTimeInfo(info)
      setMatterInfo(info)
    }
  }, [BalanceList, account])
  return (
    <NoPdBottom>
      <Flex flexWrap='wrap' justifyContent='space-between' alignItems='center'>
        <BorderWalletBox BalanceInfo={TimeInfo} Token='Time' Balance={timeBalance} TokenAddr={timeAddress} />
        <WalletBox BalanceInfo={MatterInfo} Token='Matter' Balance={timeBalance} TokenAddr={timeAddress} />
      </Flex>
    </NoPdBottom>
  )
}

export default TokenAccount;