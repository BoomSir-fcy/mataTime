import React, { useState, useEffect, useMemo } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { Container } from 'components'
import WalletBox from './walletBox'
import Recharge from './Recharge'
import { getMatterAddress, getTimeAddress } from 'utils/addressHelpers';
import { useFetchWalletInfo, useFetchApproveNum, useFetTimeIncometoday } from 'store/wallet/hooks';
import { useWeb3React } from '@web3-react/core';
import { useStore } from 'store';
import { formatDisplayApr } from 'utils/formatBalance';
import EarningsRecord from './EarningsRecord';
import Chart from './Chart';
import Matter from './Matter';
import { useTokenBalance } from '../ExchangeTime/hook';
import { WalletHead } from '../../head';
import { useTranslation } from 'contexts/Localization';

const NoPdBottom = styled(Container)`
padding: 0;
`
const ScrollBox = styled(Box)`
padding-top: 70px;
/* height:calc(100vh - 70px);
overflow-y: auto;
::-webkit-scrollbar {
  display: none;
}
-ms-overflow-style: none;
scrollbar-width: none; */
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
  useFetTimeIncometoday(7)
  const { t } = useTranslation();
  const { account } = useWeb3React()
  const info = {
    address: "",
    available_balance: "0",
    freeze_balance: "0",
    token_type: 1,
    total_balance: "0",
    uid: 0
  }
  // const [TimeInfo, setTimeInfo] = useState(info)
  // const [MatterInfo, setMatterInfo] = useState(info)
  const [WalletInfo, setWalletInfo] = useState(info)
  const [walletBalance, setwalletBalance] = useState(0)
  const [tokenAddress, settokenAddress] = useState('')
  const [ActiveTab, setActiveTab] = useState(1)
  const [ActiveToken, setActiveToken] = useState(1)
  const timeAddress = getTimeAddress()
  const MatterAddress = getMatterAddress()
  const { balance: timeBalance } = useTokenBalance(timeAddress)
  const { balance: matterBalance } = useTokenBalance(MatterAddress)
  const BalanceList = useStore(p => p.wallet.wallet);
  const activeToken = useStore(p => p.wallet.activeToken);
  const TimeIncometoday = useStore(p => p.wallet.TimeIncometoday);

  const TimeTodayIncome = useMemo(() => {
    const num = Number(TimeIncometoday.today_income)
    return num
  }, [TimeIncometoday])

  const TimeTotalIncome = useMemo(() => {
    const num = Number(TimeIncometoday.total_income)
    return num
  }, [TimeIncometoday])

  const TimeChartList = useMemo(() => {
    const num = Number(TimeIncometoday.data)
    return num
  }, [TimeIncometoday])

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
                <Text color='white_black' fontWeight='bold'>{formatDisplayApr(TimeTodayIncome)}</Text>
              </Flex>
            </IncomeBox>
            <IncomeBox>
              <Img src={require('assets/images/myWallet/total.png').default} />
              <Flex ml='22px' flexDirection='column' justifyContent='space-between'>
                <Text fontSize='14px' color='textTips'>{t('Account Cumulative income')}</Text>
                <Text color='white_black' fontWeight='bold'>{formatDisplayApr(TimeTotalIncome)}</Text>
              </Flex>
            </IncomeBox>
          </RightBox>
        </ContentTab>
        {/* 收益切换 */}
        {/* <ContentTab>
          <Flex alignItems='baseline'>
            {ActiveToken === 1 ?
              <>
                <TabText className={ActiveTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>{t('Account Content income')}</TabText>
                <TabText className={ActiveTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>{t('Account Reward income')}</TabText>
              </>
              :
              <TabText className='active'>Matter {t('Rewards')}</TabText>
            }
          </Flex>
        </ContentTab> */}
        {
          ActiveToken !== 2 ?
            <>
              <Chart type={ActiveTab} chartData={TimeChartList} />
              <EarningsRecord type={ActiveTab} />
            </>
            :
            <Matter BalanceInfo={WalletInfo} TokenAddr={MatterAddress} />
        }
      </ScrollBox>
    </NoPdBottom>
  )
}

export default TokenAccount;