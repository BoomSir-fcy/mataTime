import React, { useState } from 'react';
import { Flex, Box, Text, Image, Button } from 'uikit';
import { Container } from 'components'
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import RechargeOrWithdrawPop from './Pops/RechargeOrWithdrawPop';

const Content = styled(Box)`
width: 48%;
min-width: 300px;
background:${({ theme }) => theme.colors.backgroundCard};
${({ theme }) => theme.mediaQueriesSize.padding}
border-radius: 10px;
${({ theme }) => theme.mediaQueriesSize.marginb}
`
const TopInfo = styled(Flex)`
align-content: center;
flex-wrap:wrap;
`
const Icon = styled(Image)`
${({ theme }) => theme.mediaQueriesSize.marginr}
min-width: 50px;
`
const Info = styled(Flex)`
flex: 1;
justify-content: space-between;
align-items: center;
flex-wrap:wrap;
`
const NumText = styled(Text)`
color: #3d5fcfba;
font-weight: bold;
`
const TokenText = styled(Text)`
color: #3d5fcfba;
font-weight: bold;
${({ theme }) => theme.mediaQueriesSize.marginr}
`
const Fount = styled(Text)`
color:${({ theme }) => theme.colors.textTips};
font-size: 14px;
`
const RechargeBtn = styled(Button)`
padding: 6px 30px;
background: ${({ theme }) => theme.colors.backgroundPrimary};
`
const WithdrawBtn = styled(Button)`
padding: 6px 30px;
background: #ccc;
background: ${({ theme }) => theme.colors.disabled};
`
interface Wallet {
  Token: string
}
const WalletBox: React.FC<Wallet> = ({ Token }) => {

  const { account } = useWeb3React()
  return (
    <Content>
      <TopInfo mb='10px'>
        <Icon src={require('assets/images/message/logo.png').default} width={50} height={50} alt='' />
        <Info>
          <Flex flexDirection='column' justifyContent='space-between'>
            <Fount >平台余额</Fount>
            <NumText>19,123</NumText>
          </Flex>
          <Flex flexDirection='column' justifyContent='space-between'>
            <Fount >今日收入</Fount>
            <NumText>19,123</NumText>
          </Flex>
          <Flex flexDirection='column' justifyContent='space-between'>
            <Fount >钱包余额</Fount>
            <NumText>311,355</NumText>
          </Flex>
        </Info>
      </TopInfo>
      <Flex mb='10px'>
        <TokenText>$Time</TokenText>
        {Token === 'Time' && <Fount>( 预计使用 28h )</Fount>}
      </Flex>
      <Flex justifyContent='end'>
        <RechargeBtn mr='20px'>充值</RechargeBtn>
        <WithdrawBtn>提现</WithdrawBtn>
      </Flex>
    </Content>
  )
}

export default WalletBox;