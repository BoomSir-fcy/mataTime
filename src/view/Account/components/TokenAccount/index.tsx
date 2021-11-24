import React, { useState } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { Container } from 'components'
import WalletBox from './walletBox'
import { getTimeAddress } from 'utils/addressHelpers';
import { useTokenBalance } from 'view/exchange/hook';

const NoPdBottom = styled(Container)`
padding-bottom: 0;
`

const TokenAccount: React.FC = () => {
  const timeAddress = getTimeAddress()
  const { balance: timeBalance } = useTokenBalance(timeAddress)
  return (
    <NoPdBottom>
      <Flex flexWrap='wrap' justifyContent='space-between' alignItems='center'>
        <WalletBox Token='Time' Balance={timeBalance} TokenAddr={timeAddress} />
        <WalletBox Token='Matter' Balance={timeBalance} TokenAddr={timeAddress} />
      </Flex>
    </NoPdBottom>
  )
}

export default TokenAccount;