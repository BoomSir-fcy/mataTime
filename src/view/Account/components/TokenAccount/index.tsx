import React, { useState } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { Container } from 'components'
import WalletBox from './walletBox'

const NoPdBottom = styled(Container)`
padding-bottom: 0;
`

const TokenAccount: React.FC = () => {
  return (
    <NoPdBottom>
      <Flex flexWrap='wrap' justifyContent='space-between' alignItems='center'>
        <WalletBox Token='Time' />
        <WalletBox Token='Matter' />
      </Flex>
    </NoPdBottom>
  )
}

export default TokenAccount;