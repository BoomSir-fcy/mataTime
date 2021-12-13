import React, { useState, useEffect, useMemo } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { Container } from 'components'
import WalletBox from './walletBox'
import Recharge from './Recharge'
import { getMatterAddress, getTimeAddress } from 'utils/addressHelpers';
import { useFetchWalletInfo, useFetchApproveNum, useFetTimeIncometoday, useFetTimeIncomeList } from 'store/wallet/hooks';
import { useWeb3React } from '@web3-react/core';
import { useStore } from 'store';
import { formatDisplayApr } from 'utils/formatBalance';
import EarningsRecord from './EarningsRecord';
import Chart from './Chart';
import { useTokenBalance } from '../ExchangeTime/hook';
import { WalletHead } from '../../head';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux'
import { fetchTimeIncometoday, fetchMatterIncometoday, fetchIncomeList, fetchMatterIncomeList } from 'store/wallet/reducer';


const NoPdBottom = styled(Container)`
padding: 0;
`
const ScrollBox = styled(Box)`
padding-top: 70px;
`
const BorderWalletBox = styled(WalletBox)`
border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
${({ theme }) => theme.mediaQueries.sm} {
  border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
}
`
const ContentTab = styled(Flex)`
align-items: center;
justify-content: space-between;
${({ theme }) => theme.mediaQueriesSize.padding}
padding-bottom: 0;
padding-top: 0;
border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
.active{
    font-size: 18px;
    color:${({ theme }) => theme.colors.white_black};
    font-weight: bold;
  }
`
const TabText = styled(Text)`
  color:${({ theme }) => theme.colors.textTips};
  ${({ theme }) => theme.mediaQueriesSize.marginr}
  font-size: 14px;
  cursor: pointer;
`
const RightBox = styled(Flex)`
min-width: 23vw;
`
const IncomeBox = styled(Flex)`
align-items: center;
${({ theme }) => theme.mediaQueriesSize.marginr}
width: max-content;
`
const Img = styled.img`
width: 36px;
height: 36px;
`


const TokenAccount: React.FC = () => {
  useFetchWalletInfo()
  useFetchApproveNum()
  const { t } = useTranslation();
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const info = {
    address: "",
    available_balance: "0",
    freeze_balance: "0",
    token_type: 1,
    total_balance: "0",
    uid: 0
  }
  const [WalletInfo, setWalletInfo] = useState(info)
  const [walletBalance, setwalletBalance] = useState(0)
  const [tokenAddress, settokenAddress] = useState('')
  const [ActiveToken, setActiveToken] = useState(1)
  const [pageSize, setpageSize] = useState(5);
  const [day, setday] = useState(7)
  const timeAddress = getTimeAddress()
  const MatterAddress = getMatterAddress()
  const { balance: timeBalance } = useTokenBalance(timeAddress)
  const { balance: matterBalance } = useTokenBalance(MatterAddress)
  const BalanceList = useStore(p => p.wallet.wallet);
  const activeToken = useStore(p => p.wallet.activeToken);
  const TimeIncometoday = useStore(p => p.wallet.TimeIncometoday);
  const MatterIncometoday = useStore(p => p.wallet.MatterIncometoday);
  const ContentHistoryInfo = useStore(p => p.wallet.TimeIncomeList);
  const TaskHistoryinfo = useStore(p => p.wallet.MatterIncomeList);

  useFetTimeIncometoday(day)
  useFetTimeIncomeList(1, pageSize)

  const TodayIncome = useMemo(() => {
    let num
    if (ActiveToken === 1) {
      num = Number(TimeIncometoday.today_income)
    } else {
      num = Number(MatterIncometoday.today_income)
    }
    return num
  }, [TimeIncometoday, MatterIncometoday, ActiveToken])

  const TotalIncome = useMemo(() => {
    let num
    if (ActiveToken === 1) {
      num = Number(TimeIncometoday.total_income)
    } else {
      num = Number(MatterIncometoday.total_income)
    }
    return num
  }, [TimeIncometoday, MatterIncometoday, ActiveToken])

  const ChartList = useMemo(() => {
    let data
    if (ActiveToken === 1) {
      data = TimeIncometoday.data
    } else {
      data = MatterIncometoday.data
    }
    if (!data) {
      data = []
    }
    return data
  }, [TimeIncometoday, MatterIncometoday, ActiveToken])

  const LoadStatus = useMemo(() => {
    let Status
    if (ActiveToken === 1) {
      Status = TimeIncometoday.loadStatus
    } else {
      Status = MatterIncometoday.loadStatus
    }
    return Status
  }, [TimeIncometoday, MatterIncometoday, ActiveToken])

  const getMyBalance = async () => {
    for (let i = 0; i < BalanceList.length; i++) {
      if (BalanceList[i].token_type === 1 && activeToken === 'Time') {
        setWalletInfo(BalanceList[i])
      }
      if (BalanceList[i].token_type === 2 && activeToken === 'Matter') {
        setWalletInfo(BalanceList[i])
      }
    }
  }

  useEffect(() => {
    if (account) {
      if (activeToken === 'Time') {
        setwalletBalance(timeBalance)
        settokenAddress(timeAddress)
      } else {
        setwalletBalance(matterBalance)
        settokenAddress(MatterAddress)
      }
    }
    return () => {
      setwalletBalance(0)
    }
  }, [account, matterBalance, timeBalance, timeAddress, MatterAddress, activeToken])

  useEffect(() => {
    account && BalanceList.length > 1 && getMyBalance()
    return () => {
      setWalletInfo(info)
    }
  }, [BalanceList, account, activeToken])

  useEffect(() => {
    if (ActiveToken === 1) {
      dispatch(fetchTimeIncometoday({ day }))
      dispatch(fetchIncomeList({ page: 1 }))
    } else {
      dispatch(fetchMatterIncometoday({ day }))
      dispatch(fetchMatterIncomeList({ page: 1 }))
    }
  }, [ActiveToken])

  return (
    <NoPdBottom>
      <WalletHead title={t('Account My Wallet')} />
      <ScrollBox>
        <Flex flexWrap='wrap' justifyContent='space-between'>
          <BorderWalletBox BalanceInfo={WalletInfo} Token={activeToken} Balance={walletBalance} TokenAddr={tokenAddress} />
          <Recharge Token={activeToken} balance={walletBalance} TokenAddr={tokenAddress} />
        </Flex>
        {/* token切换 */}
        <ContentTab>
          <Flex alignItems='baseline'>
            <TabText className={ActiveToken === 1 ? 'active' : ''} onClick={() => setActiveToken(1)}>Time {t('Rewards')}</TabText>
            <TabText className={ActiveToken === 2 ? 'active' : ''} onClick={() => setActiveToken(2)}>Matter {t('Rewards')}</TabText>
          </Flex>
          <RightBox justifyContent='space-between' alignItems='center'>
            <IncomeBox>
              <Img src={require('assets/images/myWallet/today.png').default} />
              <Flex ml='22px' flexDirection='column' justifyContent='space-between'>
                <Text fontSize='14px' color='textTips'>{t('Account Day income')}</Text>
                <Text color='white_black' fontWeight='bold'>{formatDisplayApr(TodayIncome)}</Text>
              </Flex>
            </IncomeBox>
            <IncomeBox>
              <Img src={require('assets/images/myWallet/total.png').default} />
              <Flex ml='22px' flexDirection='column' justifyContent='space-between'>
                <Text fontSize='14px' color='textTips'>{t('Account Cumulative income')}</Text>
                <Text color='white_black' fontWeight='bold'>{formatDisplayApr(TotalIncome)}</Text>
              </Flex>
            </IncomeBox>
          </RightBox>
        </ContentTab>
        <Chart type={ActiveToken} chartData={ChartList} load={LoadStatus} />
        <EarningsRecord type={ActiveToken} info={ActiveToken === 1 ? ContentHistoryInfo : TaskHistoryinfo} />
      </ScrollBox>
    </NoPdBottom>
  )
}

export default TokenAccount;