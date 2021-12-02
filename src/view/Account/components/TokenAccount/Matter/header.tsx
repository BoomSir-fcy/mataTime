import React, { useState, useEffect, useCallback } from 'react';
import { Flex, Box, Text, Button } from 'uikit';
import styled from 'styled-components';
import { ModalWrapper } from 'components';
import { useTranslation } from 'contexts/Localization';
import RechargeOrWithdrawPop from '../Pops/RechargeOrWithdrawPop';
import { formatDisplayApr } from 'utils/formatBalance';

const Content = styled(Box)`
${({ theme }) => theme.mediaQueriesSize.padding}
background:${({ theme }) => theme.card.background};
border-radius: 10px;
`
const Title = styled(Flex)`
align-items: center;
justify-content: space-between;
${({ theme }) => theme.mediaQueriesSize.marginbmd}
img{
  width: 41px;
  ${({ theme }) => theme.mediaQueriesSize.marginr}
}
`
const WithdrawBtn = styled(Button)`
min-width: 80px;
background: ${({ theme }) => theme.colors.backgroundPrimary};
`
const NumText = styled(Text)`
color: ${({ theme }) => theme.colors.textPrimary};
font-weight: bold;
`

const Fount = styled(Text)`
color:${({ theme }) => theme.colors.textTips};
font-size: 14px;
min-width: 25%;
`
const BalanceBox = styled(Flex)`
width: 50%;
min-width: max-content;
${({ theme }) => theme.mediaQueriesSize.marginbsm}
`

interface HeaderInfo {
  Balance?: number
  TokenAddr: string
  BalanceInfo: Api.Account.Balance
}
const Header: React.FC<HeaderInfo> = ({ Balance, TokenAddr, BalanceInfo }) => {
  const { t } = useTranslation()

  const [visible, setVisible] = useState(false)
  const [ModalTitle, setModalTitle] = useState('')
  const openModaal = () => {
    setModalTitle(`${t('Accountwithdraw')} Matter`)
    setVisible(true)
  }
  const onClose = useCallback(() => setVisible(false), [setVisible])
  return (
    <Content>
      <Title>
        <Flex alignItems='center'>
          <img src="/images/tokens/Matter.svg" alt="" />
          <Text fontSize='24px' color='white_black'>Matter</Text>
        </Flex>
        <WithdrawBtn onClick={() => openModaal()}>{t('Accountwithdraw')}</WithdrawBtn>
      </Title>
      <Flex flexWrap='wrap'>
        <BalanceBox alignItems='baseline'>
          <Fount>待提取余额</Fount>
          <NumText>{formatDisplayApr(Number(BalanceInfo.available_balance))}</NumText>
        </BalanceBox>
        <BalanceBox alignItems='baseline'>
          <Fount>今日收入</Fount>
          <NumText>{formatDisplayApr(Number(BalanceInfo.available_balance))}</NumText>
        </BalanceBox>
        <BalanceBox alignItems='baseline'>
          <Fount>已提取</Fount>
          <NumText>{formatDisplayApr(Number(BalanceInfo.available_balance))}</NumText>
        </BalanceBox>
        <BalanceBox alignItems='baseline'>
          <Fount>累计收入</Fount>
          <NumText>{formatDisplayApr(Number(BalanceInfo.available_balance))}</NumText>
        </BalanceBox>
      </Flex>

      {/* 输入框弹窗 */}
      <ModalWrapper title={ModalTitle} creactOnUse visible={visible} setVisible={setVisible}>
        <RechargeOrWithdrawPop onClose={onClose} TokenAddr={TokenAddr} type={2} token='Matter' balance={Balance} withdrawalBalance={BalanceInfo.available_balance} />
      </ModalWrapper>
    </Content>
  )
}

export default Header;