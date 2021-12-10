import React, { useState, useCallback, useMemo } from 'react';
import { Flex, Box, Text, Image, Button, Heading, CloseLineIcon } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { ModalWrapper } from 'components'
import RechargeOrWithdrawPop from './Pops/RechargeOrWithdrawPop';
import { formatDisplayApr } from 'utils/formatBalance';
import { useTranslation } from 'contexts/Localization';
import walletBg from 'assets/images/myWallet/wallet.png'
import walletBg_w from 'assets/images/myWallet/wallet_w.png'
import { useStore, storeAction } from 'store';
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
import { useEstimatedServiceTime } from 'store/wallet/hooks';


const Content = styled(Flex)`
flex-direction: column;
justify-content:space-between;
flex: 1;
min-width: 300px;
background:url('${({ theme }) => theme.isDark ? walletBg : walletBg_w}') no-repeat;
background-position: right 30px bottom 14px;
background-size: 80px;
${({ theme }) => theme.mediaQueriesSize.padding}
`
const TopInfo = styled(Flex)`
justify-content: space-between;
align-items: center;
flex-wrap:wrap;
`
const Icon = styled(Image)`
${({ theme }) => theme.mediaQueriesSize.marginr}
min-width: 43px;
`
const LeftBox = styled(Flex)`
min-height: 86px;
flex-direction: column;
justify-content:space-between;

`
const NumText = styled(Text)`
color: ${({ theme }) => theme.colors.textPrimary};
font-weight: bold;
`

const Fount = styled(Text)`
color:${({ theme }) => theme.colors.textTips};
font-size: 14px;
min-width: 76px;
`
const WithdrawBtn = styled(Button)`
min-width: 80px;
background: ${({ theme }) => theme.colors.backgroundPrimary};
&:disabled{
  background: ${({ theme }) => theme.colors.disableStep};
}
`
const ChangeTokenBtn = styled(Flex)`
cursor: pointer;
`
const ChangeToken = styled.img`
width: 21px;
display: inline-block;
margin-right: 12px;
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
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [ModalTitle, setModalTitle] = useState('')
  const [ChosenType, setChosenType] = useState(1)
  const leftTime = useEstimatedServiceTime()

  const ReleaseTime = useMemo(() => {
    dayjs.extend(duration)
    const num = dayjs.duration(leftTime, "seconds").humanize();
    return num
  }, [leftTime])

  const openModaal = (title) => {
    const titleText = title === 1 ? t('AccountRecharge') : t('Accountwithdraw')
    setModalTitle(`${titleText} ${Token}`)
    setChosenType(title)
    setVisible(true)
  }
  const onClose = useCallback(() => setVisible(false), [setVisible])
  const onChangeToken = useCallback(() => {
    if (Token === 'Time') {
      dispatch(storeAction.changeActiveToken({ activeToken: 'Matter' }))
    } else {
      dispatch(storeAction.changeActiveToken({ activeToken: 'Time' }))
    }
  }, [Token])
  return (
    <Content {...props}>
      <TopInfo mb='4px'>
        <Flex alignItems='center'>
          <Icon src='/images/tokens/TIME.svg' width={43} height={43} alt='' />
          <Text fontSize='26px'>{Token}</Text>
        </Flex>
        <ChangeTokenBtn alignItems='center' onClick={onChangeToken}>
          <ChangeToken src={require('assets/images/myWallet/changeToken.png').default} alt="" />
          <NumText fontSize='14px'>{t('%token%Wallet', { token: Token === 'Time' ? 'Matter' : 'Time' })}</NumText>
        </ChangeTokenBtn>
      </TopInfo>
      <Flex alignItems='flex-end' justifyContent='space-between'>
        <LeftBox>
          <Flex alignItems='baseline'>
            <Fount mr='16px'>{t('Account balance')}</Fount>
            <NumText>{formatDisplayApr(Number(BalanceInfo.available_balance))}</NumText>
          </Flex>
          {
            Token === 'Time' ?
              <>
                <Flex alignItems='baseline'>
                  <Fount mr='16px'>{t('Account Frozen amount')}</Fount>
                  <NumText>{formatDisplayApr(Number(BalanceInfo.freeze_balance))}</NumText>
                </Flex>
                <Flex alignItems='baseline'>
                  <Fount mr='16px'>{t('Account Estimated use of')}</Fount>
                  <NumText>{leftTime > 0 ? t('More than %time% hours', { time: ReleaseTime }) : 0}</NumText>
                </Flex>
              </>
              :
              <Fount>{t('AccountMenu Over %num% can be withdrawn to the wallet on the chain', { num: 100 })}</Fount>
          }

        </LeftBox>
        <WithdrawBtn disabled={Token === 'Matter' && Number(BalanceInfo.available_balance) < 100} onClick={() => openModaal(2)}>{t('Accountwithdraw')}</WithdrawBtn>
      </Flex>

      {/* 输入框弹窗 */}
      <ModalWrapper title={ModalTitle} creactOnUse visible={visible} setVisible={setVisible}>
        <RechargeOrWithdrawPop onClose={onClose} TokenAddr={TokenAddr} type={ChosenType} token={Token} balance={Balance} withdrawalBalance={BalanceInfo.available_balance} />
      </ModalWrapper>
    </Content>
  )
}

export default WalletBox;