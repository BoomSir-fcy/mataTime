import React, { useState, useEffect, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components';
import { Flex, Button, Box, Text, Input } from 'uikit';
import { getDsgAddress, getTimeAddress } from 'utils/addressHelpers';
import {
  useTokenBalance,
  FetchTimeShopInfo,
  FetchApproveNum,
  FetchRewardNum,
  useApproveErc20Change,
  useExchangeErc20,
  useRewardErc20
} from './hook';
import { useWeb3React } from '@web3-react/core';
import Dots from 'components/Loader/Dots';
import { useImmer } from 'use-immer';
import { WalletHead } from '../../head';
import { useTranslation } from 'contexts/Localization';
import { TimeHeader } from './head';
import ExchangeTime from './exchange';
import { useFetchDSGApproveNum, useFetTimeInfo } from 'store/wallet/hooks';
import { useStore } from 'store';
import VestingTime from './VestingTime';

const ScrollBox = styled(Box)`
height:calc(100vh - 70px);
overflow-y: auto;
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
-ms-overflow-style: none;
scrollbar-width: none;
`
const VestingBox = styled(Flex)`
height:160px;
align-items: center;
justify-content: center;
width: max-content;
margin: 0 auto;
${({ theme }) => theme.mediaQueriesSize.marginb}
`

const Exchange: React.FC = () => {
  useFetchDSGApproveNum()
  useFetTimeInfo()
  const { t } = useTranslation();
  const { account } = useWeb3React()
  const [TimeShopInfo, setTimeShopInfo] = useState({
    long_time: 0,
    max_dsg_token: 0,
    max_time_token: 0,
    right_now_release: 0,
    times: 1,
    total_dsg: 0
  })
  const [TimeNext, setTimeNext] = useState({
    long_time: 0,
    max_dsg_token: 0,
    max_time_token: 0,
    right_now_release: 0,
    times: 1,
    total_dsg: 0
  })
  const TimeInfo = useStore(p => p.wallet.TimeInfo);
  const getTimeShopInfo = async () => {
    for (let i = 0; i < TimeInfo.length; i++) {
      if (TimeInfo[i].total_dsg < TimeInfo[i].max_dsg_token) {
        setTimeShopInfo(TimeInfo[i])
        setTimeNext(TimeInfo[i + 1])
        break
      }
    }
  }
  useEffect(() => {
    if (account && TimeInfo.length > 1) {
      getTimeShopInfo()
    }
  }, [TimeInfo, account])

  return (
    <>
      <WalletHead title={t('Time兑换')} />
      <ScrollBox>
        <TimeHeader nowRound={TimeShopInfo} NextRound={TimeNext} />
        <ExchangeTime nowRound={TimeShopInfo} />
        <VestingBox>
          <Text fontSize='30px' bold>My Vesting Time</Text>
        </VestingBox>
        <VestingTime />
        {/* <Center flexDirection='column' justifyContent='center' alignItems='center'>
          <div>
            当前周期：{TimeShopInfo.times} <br />
            最大Dsg兑换量：{TimeShopInfo.max_dsg_token}<br />
            最大Time兑换量：{TimeShopInfo.max_time_token}<br />
            立即获得百分比：{new BigNumber(TimeShopInfo.right_now_release).div(10000).times(100).toString()}%<br />
            当前总Dsg：{TimeShopInfo.total_dsg}<br />
            当前可领取Time：{rewardNum}<br />
            当前Time余额：{Number(timeBalance)}<br />
            <Button disabled={Receiving || rewardNum <= 0} onClick={handleReward}>{Receiving ? <Dots>领取中</Dots> : '领取'}</Button>
          </div>
          <Flex flexDirection='column'>
            <Input type="number" value={inputNum.Dsg} onChange={event =>
              setinputNum(p => {
                p.Dsg = event.target.value;
                p.Time = new BigNumber(Number(event.target.value)).times(new BigNumber(TimeShopInfo?.max_time_token).div(TimeShopInfo?.max_dsg_token)).toString()
              })
            } />DSG余额{Number(balance)}
            <Input type="number" value={inputNum.Time} onChange={event =>
              setinputNum(p => {
                p.Dsg = new BigNumber(Number(event.target.value)).div(new BigNumber(TimeShopInfo?.max_time_token).div(TimeShopInfo?.max_dsg_token)).toString();
                p.Time = event.target.value
              })
            } />Time
            <Button disabled={pending} onClick={async () => {
              if (approvedNum > 0) {
                // 兑换
                await handleExchange()
              } else {
                // 授权
                await handleApprove()
              }
            }}>{pending ? <Dots>{approvedNum > 0 ? "兑换中" : "授权中"}</Dots> : approvedNum > 0 ? "兑换" : "授权"}</Button>
          </Flex>
        </Center> */}
      </ScrollBox>
    </>
  )
}
export default Exchange