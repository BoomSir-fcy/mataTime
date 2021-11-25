import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { ethers, Contract } from 'ethers'
import { useTimeShop, useERC20 } from 'hooks/useContract'
import { getDsgAddress, getTimeShopAddress } from 'utils/addressHelpers';
import { stakeNftFarm, CancelNftStake } from 'utils/calls';
import { uniq } from 'lodash';
import multicall from 'utils/multicall';
import timeShopAbi from 'config/abi/TimeShop.json'
import erc20Abi from 'config/abi/erc20.json'
import { NftInfo } from 'store/app/type';
import { getNftsList, getNftInfo } from 'apis/DsgRequest';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { fetchUserNftInfoAsync } from 'store/login/reducer';
import { storeAction, useStore } from 'store';
import { getBep20Contract, getTimeShopContract } from 'utils/contractHelpers';
import useRefresh from 'hooks/useRefresh';
import { getBalanceNumber } from 'utils/formatBalance';
import { BIG_TEN } from 'utils/bigNumber';


type UseTokenBalanceState = {
  balance: number
  fetchStatus: FetchStatus
}
export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}
// 获取代币余额
export const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: 0,
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      try {
        const res = await contract.balanceOf(account)
        setBalanceState({ balance: getBalanceNumber(new BigNumber(res.toString())), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED])

  return balanceState
}
// 授权Dsg
export const useApproveErc20Change = () => {
  const tokenAddress = getDsgAddress()
  const TimeContract = useERC20(tokenAddress)
  const TimeShopAddr = getTimeShopAddress()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await TimeContract.approve(TimeShopAddr, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [TimeContract, TimeShopAddr])

  return { onApprove: handleApprove }
}
// 兑换
export const useExchangeErc20 = () => {
  const TimeContract = useTimeShop()
  const handleApprove = useCallback(async (DsgNum: number) => {
    const addPrecisionNum = new BigNumber(DsgNum).times(BIG_TEN.pow(18)).toString()
    try {
      const tx = await TimeContract.buyTimeToken(addPrecisionNum)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [TimeContract])

  return { onExchange: handleApprove }
}

// 领取
export const useRewardErc20 = () => {
  const TimeContract = useTimeShop()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await TimeContract.withdrawAll()
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [TimeContract])

  return { onWithdraw: handleApprove }
}

// 获取详情
export const FetchTimeShopInfo = async () => {
  const TimeShop = getTimeShopAddress()
  const calls = [
    {
      address: TimeShop,
      name: 'getViews'
    },
  ]
  try {
    const Views = await multicall(timeShopAbi, calls)
    const info = Views[0][0].map((item, index) => ({
      times: index + 1,
      long_time: Number(new BigNumber(item.long_time.toJSON().hex)),
      max_dsg_token: getBalanceNumber(new BigNumber(item.max_dsg_token.toJSON().hex)),
      max_time_token: getBalanceNumber(new BigNumber(item.max_time_token.toJSON().hex)),
      right_now_release: Number(new BigNumber(item.right_now_release.toJSON().hex)),
      total_dsg: getBalanceNumber(new BigNumber(item.total_dsg.toJSON().hex))
    }))
    return info
  } catch (error) {
    console.log(error);
    return []
  }
}

// 获取授权数量
export const FetchApproveNum = async (account: string) => {
  const dsgAdd = getDsgAddress()
  const TimeShop = getTimeShopAddress()
  const calls = [
    {
      address: dsgAdd,
      name: 'allowance',
      params: [account, TimeShop]
    },
  ]
  try {
    const approvedNum = await multicall(erc20Abi, calls)
    return getBalanceNumber(approvedNum)
  } catch (error) {
    throw error
  }
}

// 获取可领取数量
export const FetchRewardNum = async (account: string) => {
  const TimeShop = getTimeShopAddress()
  const calls = [
    {
      address: TimeShop,
      name: 'getReward',
      params: [account]
    },
  ]
  console.log(calls);
  try {
    const RewardNum = await multicall(timeShopAbi, calls)
    console.log(RewardNum);
    return getBalanceNumber(new BigNumber(RewardNum[0][0].toJSON().hex))
  } catch (error) {
    throw error
  }
}