import React, { useState, useCallback, useEffect } from 'react';
import { Flex, Box, Text, Image, Button, Heading, CloseLineIcon } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { ModalWrapper } from 'components'
import RechargeOrWithdrawPop from './Pops/RechargeOrWithdrawPop';
import HistoryModal from './Pops/HistoryModal';
import { Api } from 'apis';
import { formatDisplayApr } from 'utils/formatBalance';
import { useTranslation } from 'contexts/Localization';


const Content = styled(Flex)`
flex-direction: column;
justify-content:space-between;
flex: 1;
min-width: 300px;
/* background:${({ theme }) => theme.card.background}; */
${({ theme }) => theme.mediaQueriesSize.padding}
`
const TopInfo = styled(Flex)`
justify-content: space-between;
align-content: center;
flex-wrap:wrap;
`
const Icon = styled(Image)`
${({ theme }) => theme.mediaQueriesSize.marginr}
min-width: 43px;
`
const NumText = styled(Text)`
color: ${({ theme }) => theme.colors.textPrimary};
font-weight: bold;
`

const Fount = styled(Text)`
color:${({ theme }) => theme.colors.textTips};
font-size: 14px;
`
const WithdrawBtn = styled(Button)`
min-width: 80px;
background: ${({ theme }) => theme.colors.backgroundPrimary};
`



interface Wallet {
  Token: string
  Balance: number
  TokenAddr: string
  BalanceInfo: Api.Account.Balance
}
const WalletBox: React.FC<Wallet> = ({ Token, Balance, TokenAddr, BalanceInfo, ...props }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [visible, setVisible] = useState(false)
  const [ModalTitle, setModalTitle] = useState('')
  const [ChosenType, setChosenType] = useState(1)
  const openModaal = (title) => {
    const titleText = title === 1 ? t('AccountRecharge') : t('Accountwithdraw')
    setModalTitle(`${titleText} ${Token}`)
    setChosenType(title)
    setVisible(true)
  }
  const onClose = useCallback(() => setVisible(false), [setVisible])
  return (
    <Content {...props}>
      <TopInfo mb='4px'>
        <Flex>
          <Icon src='/images/tokens/TIME.svg' width={43} height={43} alt='' />
          <Text fontSize='26px'>Time</Text>
        </Flex>
        <WithdrawBtn onClick={() => openModaal(2)}>{t('Accountwithdraw')}</WithdrawBtn>
      </TopInfo>
      <Flex alignItems='baseline'>
        <Fount mr='26px'>{t('Account balance')}</Fount>
        <NumText>{formatDisplayApr(Number(BalanceInfo.available_balance))}</NumText>
      </Flex>
      <Flex alignItems='baseline'>
        <Fount mr='26px'>{t('Account Frozen amount')}</Fount>
        <NumText>{formatDisplayApr(Number(BalanceInfo.freeze_balance))}</NumText>
      </Flex>
      <Flex alignItems='baseline'>
        <Fount mr='26px'>{t('预计阅读')}</Fount>
        <NumText>{t('超过 28 小时')}</NumText>
      </Flex>

      {/* 输入框弹窗 */}
      <ModalWrapper title={ModalTitle} creactOnUse visible={visible} setVisible={setVisible}>
        <RechargeOrWithdrawPop onClose={onClose} TokenAddr={TokenAddr} type={ChosenType} token={Token} balance={Balance} withdrawalBalance={BalanceInfo.available_balance} />
      </ModalWrapper>
    </Content>
  )
}

export default WalletBox;