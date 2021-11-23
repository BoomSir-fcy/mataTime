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


const Center = styled(Flex)`
height: 100vh;
color: #fff;
width: 50vw;
margin: 0 auto;
`

const Exchange: React.FC = () => {
  const { account } = useWeb3React()
  const [approvedNum, setapprovedNum] = useState(0)
  const [TimeShopInfo, setTimeShopInfo] = useState({
    long_time: 0,
    max_dsg_token: 0,
    max_time_token: 0,
    right_now_release: 0,
    times: 1,
    total_dsg: 0
  })
  const [pending, setpending] = useState(false)
  const [Receiving, setReceiving] = useState(false)
  const address = getDsgAddress()
  const { balance } = useTokenBalance(address)
  const timeAddress = getTimeAddress()
  const { balance: timeBalance } = useTokenBalance(timeAddress)
  const { onApprove } = useApproveErc20Change()
  const { onExchange } = useExchangeErc20()
  const { onWithdraw } = useRewardErc20()
  const [rewardNum, setrewardNum] = useState(0)
  const [inputNum, setinputNum] = useImmer({
    Dsg: '',
    Time: ''
  });
  const getTimeShopInfo = async () => {
    const info = await FetchTimeShopInfo()
    let nowTimeInfo = {
      long_time: 0,
      max_dsg_token: 0,
      max_time_token: 0,
      right_now_release: 0,
      times: 1,
      total_dsg: 0
    }
    for (let i = 0; i < info.length; i++) {
      if (info[i].right_now_release <= info[i].max_dsg_token) {
        nowTimeInfo = info[i];
        break
      }
    }
    setTimeShopInfo(nowTimeInfo)
  }
  // 领取
  const handleReward = useCallback(async () => {
    try {
      setReceiving(true)
      await onWithdraw()
    } catch (e) {
      console.error(e)
    } finally {
      setReceiving(false)
      getTimeShopInfo()
    }
  }, [onApprove, account])
  // 兑换
  const handleExchange = useCallback(async () => {
    try {
      setpending(true)
      await onExchange(Number(inputNum.Dsg))
    } catch (e) {
      console.error(e)
    } finally {
      setpending(false)
      getTimeShopInfo()
      getApproveNum()
    }
  }, [onExchange, account, inputNum])
  // 授权
  const handleApprove = useCallback(async () => {
    try {
      setpending(true)
      await onApprove()
    } catch (e) {
      console.error(e)
    } finally {
      setpending(false)
      getApproveNum()
    }
  }, [onApprove, account])
  const getApproveNum = async () => {
    const Num = await FetchApproveNum(account)
    setapprovedNum(Num)
    const RewardNum = await FetchRewardNum()
    setrewardNum(RewardNum)
  }
  useEffect(() => {
    if (account) {
      getTimeShopInfo()
      getApproveNum()
    }
    return () => {

    }
  }, [account])
  return (
    <Center flexDirection='column' justifyContent='center' alignItems='center'>
      <div>
        当前周期：{TimeShopInfo.long_time} <br />
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
    </Center>
  )
}
export default Exchange