import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { Container } from 'components'
import WalletBox from './walletBox'
import Recharge from './Recharge'
import { getMatterAddress, getTimeAddress } from 'utils/addressHelpers';
import { useFetchWalletInfo, useFetchApproveNum } from 'store/wallet/hooks';
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
height:calc(100vh - 70px);
overflow-y: auto;
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
-ms-overflow-style: none;
scrollbar-width: none;
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
  const [ActiveTab, setActiveTab] = useState(1)
  const timeAddress = getTimeAddress()
  const MatterAddress = getMatterAddress()
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
      <WalletHead title={t('我的钱包')} />
      <ScrollBox>
        <Flex flexWrap='wrap' justifyContent='space-between'>
          <BorderWalletBox BalanceInfo={TimeInfo} Token='Time' Balance={timeBalance} TokenAddr={timeAddress} />
          <Recharge balance={timeBalance} TokenAddr={timeAddress} />
        </Flex>
        {/* tab切换 */}
        <ContentTab>
          <Flex alignItems='baseline'>
            <TabText className={ActiveTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>内容收益</TabText>
            <TabText className={ActiveTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>打赏收益</TabText>
            <TabText className={ActiveTab === 3 ? 'active' : ''} onClick={() => setActiveTab(3)}>Matter收益</TabText>
          </Flex>
          <RightBox justifyContent='space-between' alignItems='center'>
            <IncomeBox>
              <Img src={require('assets/images/myWallet/today.png').default} />
              <Flex ml='22px' flexDirection='column' justifyContent='space-between'>
                <Text fontSize='14px' color='textTips'>当日收益</Text>
                <Text color='textPrimary' fontWeight='bold'>{formatDisplayApr(21565)}</Text>
              </Flex>
            </IncomeBox>
            <IncomeBox>
              <Img src={require('assets/images/myWallet/total.png').default} />
              <Flex ml='22px' flexDirection='column' justifyContent='space-between'>
                <Text fontSize='14px' color='textTips'>累计收益</Text>
                <Text color='textPrimary' fontWeight='bold'>{formatDisplayApr(21565)}</Text>
              </Flex>
            </IncomeBox>
          </RightBox>
        </ContentTab>
        {
          ActiveTab !== 3 ?
            <>
              <Chart />
              <EarningsRecord type={ActiveTab} />
            </>
            :
            <Matter BalanceInfo={MatterInfo} TokenAddr={MatterAddress} />
        }
      </ScrollBox>
    </NoPdBottom>
  )
}

export default TokenAccount;