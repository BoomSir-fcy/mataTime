import React, { useState, useCallback, useEffect } from 'react';
import { Flex, Box, Text, Image, Button, Heading, CloseLineIcon } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { ModalWrapper } from 'components'
import RechargeOrWithdrawPop from './Pops/RechargeOrWithdrawPop';
import HistoryModal from './Pops/HistoryModal';
import { Api } from 'apis';
import { splitThousandSeparator } from 'utils/formatBalance';


const Content = styled(Box)`
width:50%;
min-width: 300px;
background:${({ theme }) => theme.colors.backgroundCard};
${({ theme }) => theme.mediaQueriesSize.padding}
${({ theme }) => theme.mediaQueriesSize.marginb}
border-right: 1px solid #3A4459;
`
const TopInfo = styled(Flex)`
align-content: center;
flex-wrap:wrap;
`
const Icon = styled(Image)`
${({ theme }) => theme.mediaQueriesSize.marginr}
min-width: 43px;
`
const Info = styled(Flex)`
flex: 1;
justify-content: space-between;
align-items: center;
flex-wrap:wrap;
`
const NumText = styled(Text)`
color: #7393FF;
font-weight: bold;
`
const TokenText = styled(Text)`
color: #7393FF ;
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
background: ${({ theme }) => theme.colors.tertiary};
`
const HistoryIcon = styled.img`
width: 25px;
height: 25px;
display: inline-block;
cursor: pointer;
`
const PopHeard = styled(Flex)`
.active{
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white_black};
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size:20px;
  }
}
`
const HistoryHead = styled(Heading)`
cursor: pointer;
color: ${({ theme }) => theme.colors.textTips};
${({ theme }) => theme.mediaQueriesSize.marginr}
`

interface Wallet {
  Token: string
  Balance: number
  TokenAddr: string
  BalanceInfo: Api.Account.Balance
}
const WalletBox: React.FC<Wallet> = ({ Token, Balance, TokenAddr, BalanceInfo }) => {
  // useFetchWalletInfo()
  const { account } = useWeb3React()
  const [visible, setVisible] = useState(false)
  const [visibleHistory, setVisibleHistory] = useState(false)
  const [ModalTitle, setModalTitle] = useState('')
  const [ChosenType, setChosenType] = useState(1)
  const [ActiveHistory, setActiveHistory] = useState(1)
  const openModaal = (title) => {
    const titleText = title === 1 ? '充值' : '提现'
    setModalTitle(`${titleText} ${Token}`)
    setChosenType(title)
    setVisible(true)
  }
  const onClose = useCallback(() => setVisible(false), [setVisible])
  return (
    <Content mb='12px'>
      <TopInfo mb='4px'>
        <Icon src={require('assets/images/myWallet/wallet.png').default} width={43} height={43} alt='' />
        <Info>
          <Flex flexDirection='column' justifyContent='space-between'>
            <Fount >平台余额</Fount>
            <NumText>{splitThousandSeparator(Number(BalanceInfo.available_balance))}</NumText>
          </Flex>
          <Flex flexDirection='column' justifyContent='space-between'>
            <Fount >今日收入</Fount>
            <NumText>{splitThousandSeparator(3444311)}</NumText>
          </Flex>
          <Flex flexDirection='column' justifyContent='space-between'>
            <Fount >钱包余额</Fount>
            <NumText>{splitThousandSeparator(Balance)}</NumText>
          </Flex>
        </Info>
      </TopInfo>
      <Flex mb='10px'>
        <TokenText>${Token}</TokenText>
        {Token === 'Time' && <Fount>( 预计使用 28h )</Fount>}
      </Flex>
      <Flex justifyContent='space-between'>
        <Flex flexDirection='column' justifyContent='space-between'>
          <Fount >冻结金额</Fount>
          <NumText>{splitThousandSeparator(Number(BalanceInfo.freeze_balance))}</NumText>
        </Flex>
        <Flex justifyContent='end' alignItems='center'>
          <RechargeBtn mr='20px' onClick={() => openModaal(1)}>充值</RechargeBtn>
          <WithdrawBtn mr='16px' onClick={() => openModaal(2)}>提现</WithdrawBtn>
          <HistoryIcon onClick={() => setVisibleHistory(true)} src={require('assets/images/myWallet/history.png').default} />
        </Flex>
      </Flex>
      {/* 输入框弹窗 */}
      <ModalWrapper title={ModalTitle} creactOnUse visible={visible} setVisible={setVisible}>
        <RechargeOrWithdrawPop onClose={onClose} TokenAddr={TokenAddr} type={ChosenType} token={Token} balance={Balance} withdrawalBalance={BalanceInfo.available_balance} />
      </ModalWrapper>
      {/* 提币、充值记录 */}
      <ModalWrapper customizeTitle={true} creactOnUse visible={visibleHistory} setVisible={setVisibleHistory}>
        <PopHeard mb="8px" justifyContent="space-between" alignItems="center">
          <Flex alignItems="baseline">
            <HistoryHead className={ActiveHistory === 1 ? 'active' : ''} onClick={() => setActiveHistory(1)} scale='ld'>充值记录</HistoryHead>
            <HistoryHead className={ActiveHistory === 2 ? 'active' : ''} onClick={() => setActiveHistory(2)} scale='ld'>提现记录</HistoryHead>
          </Flex>
          <Button onClick={() => setVisibleHistory(false)} padding="0" variant="text">
            <CloseLineIcon width={16} color="primary"></CloseLineIcon>
          </Button>
        </PopHeard>
        <HistoryModal token={Token} type={ActiveHistory} />
      </ModalWrapper>
    </Content>
  )
}

export default WalletBox;