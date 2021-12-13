import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useRef, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCashierDeskAddress, getDsgAddress, getTimeAddress, getTimeShopAddress } from 'utils/addressHelpers';
import erc20Abi from 'config/abi/erc20.json'
import timeShopAbi from 'config/abi/TimeShop.json';
import { REFRESH_TIME_BURN_PER_CIRCLE } from 'config'
import { Api } from 'apis';
import multicall from 'utils/multicall';
import { getBalanceNumber } from 'utils/formatBalance';
import { AppDispatch, AppState } from '../index'
import {
  fetchWalletAsync,
  fetchTimeShopInfo,
  fetchApproveNumAsync,
  fetchDSGApproveNumAsync,
  fetchTimeExchangeList,
  fetchRewardNumAsync,
  fetchWalletAverageburntime,
  fetchWalletBurncointoday,
  fetchIncomeList,
  fetchTimeIncometoday,
  fetchMatterIncomeList,
  fetchMatterIncometoday,
} from './reducer'
import { ExchangeList } from './type';
import { State } from '../types'
import { BIG_TEN } from 'utils/bigNumber';
import { useTokenBalance } from 'hooks/useTokenBalance';


const REFRESH_INTERVAL = 30 * 1000
const SLOW_INTERVAL = 60 * 1000

// Check if the tab is active in the user browser
const useIsBrowserTabActive = () => {
  const isBrowserTabActiveRef = useRef(true)

  useEffect(() => {
    const onVisibilityChange = () => {
      isBrowserTabActiveRef.current = !document.hidden
    }

    window.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return isBrowserTabActiveRef
}

const useRefresh = (slow?) => {
  const [fefresh, setFefresh] = useState(0)
  const isBrowserTabActiveRef = useIsBrowserTabActive()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setFefresh((prev) => prev + 1)
      }
    }, slow ? SLOW_INTERVAL : REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [isBrowserTabActiveRef])

  return fefresh
}

const useRefreshTimeBurn = () => {
  const [fefresh, setFefresh] = useState(0)
  const isBrowserTabActiveRef = useIsBrowserTabActive()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setFefresh((prev) => prev + 1)
      }
    }, REFRESH_TIME_BURN_PER_CIRCLE)
    return () => clearInterval(interval)
  }, [isBrowserTabActiveRef])

  return fefresh
}

// 获取授权数量
export const FetchApproveNum = async (account: string) => {
  const CashierDesk = getCashierDeskAddress()
  const timeAddress = getTimeAddress()
  const calls = [
    {
      address: timeAddress,
      name: 'allowance',
      params: [account, CashierDesk]
    },
    {
      address: timeAddress,
      name: 'allowance',
      params: [account, CashierDesk]
    },
  ]
  try {
    const [TimeApprovedNum, MatterApproveNum] = await multicall(erc20Abi, calls)
    const data = {
      time: getBalanceNumber(TimeApprovedNum),
      matter: getBalanceNumber(MatterApproveNum)
    }
    return data
  } catch (error) {
    throw error
  }
}

// 获取DSG授权数量
export const FetchDSGApproveNum = async (account: string) => {
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
// 获取Time详情
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
// 获取兑换列表条数
export const FetchRecordLength = async (account: string) => {
  const TimeShop = getTimeShopAddress()
  const calls = [
    {
      address: TimeShop,
      name: 'getUsersRecordLength',
      params: [account]
    },
  ]
  try {
    const res = await multicall(timeShopAbi, calls)
    return new BigNumber(res[0][0].toJSON().hex).toNumber()
  } catch (error) {
    console.log(error);
    return []
  }
}
// 获取当前可领取数量
export const FetchReleaseAmount = async (list: any) => {
  const TimeShop = getTimeShopAddress()
  const calls = list.map((item, index) => ({
    address: TimeShop,
    name: 'getReleaseAmount',
    params: [item.latestTime, item.endTime, new BigNumber(item.totalAmount).times(BIG_TEN.pow(18)).toString(), new BigNumber(item.debtAmount).times(BIG_TEN.pow(18)).toString()]
  }))
  try {
    const numArr = await multicall(timeShopAbi, calls)
    const AmountList = numArr.map((item) => (
      getBalanceNumber(new BigNumber(item[0].toJSON().hex))
    ))
    return AmountList
  } catch (error) {
    throw error
  }
}
// 获取Time详情
export const FetchExchangeList = async (account: string, page: number, pageSize: number) => {
  const TimeShop = getTimeShopAddress()
  const getTotalPage = (totalNum) => {
    if (pageSize != 0 && totalNum % pageSize == 0) {
      return parseInt(String(totalNum / pageSize));
    }
    if (pageSize != 0 && totalNum % pageSize != 0) {
      return parseInt(String(totalNum / pageSize)) + 1;
    }
  }

  // 获取当前页的数据
  const ListArr = (start, end) => {
    let calls = []
    for (let i = start; i >= end; i--) {
      let item = {
        address: TimeShop,
        name: 'getUserRecordKey',
        params: [account, i]
      }
      calls.push(item)
    }
    return calls
  }
  // 获取总条数
  const totalNum = await FetchRecordLength(account)
  if (Number(totalNum) === 0) {
    return []
  }
  // 获取总页数
  const totalPage = getTotalPage(Number(totalNum))
  // 获取当前页下标区间后返回对应请求参数列表
  const remainder = pageSize - Number(totalNum) % pageSize;
  const start = (totalPage * pageSize - (page - 1) * pageSize) - 1 - remainder
  const end = start - pageSize + 1 < 0 ? 0 : start - pageSize + 1
  console.log(totalNum, totalPage, start, end, remainder);
  const calls = ListArr(start, end)
  try {
    const arr = await multicall(timeShopAbi, calls)
    const List = arr.map((item, index) => ({
      round: Number(new BigNumber(item[0].round.toJSON().hex)) + 1,
      endTime: Number(new BigNumber(item[0].endTime.toJSON().hex)),
      latestTime: new BigNumber(item[0].latestTime.toJSON().hex).toNumber(),
      totalAmount: getBalanceNumber(new BigNumber(item[0].totalAmount.toJSON().hex)),
      debtAmount: getBalanceNumber(new BigNumber(item[0].debtAmount.toJSON().hex)),
      RemainingAmount: getBalanceNumber(new BigNumber(item[0].totalAmount.toJSON().hex).minus(new BigNumber(item[0].debtAmount.toJSON().hex))),
      totalPage: totalPage,
      page: page,
      id: start - index
    }))
    const AmountList = await FetchReleaseAmount(List)
    const completeList = AmountList.map((item, index) => ({
      ...List[index],
      ReleaseAmount: item
    }))
    return completeList
  } catch (error) {
    console.log(error);
    return []
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
  try {
    const RewardNum = await multicall(timeShopAbi, calls)
    return getBalanceNumber(new BigNumber(RewardNum[0][0].toJSON().hex))
  } catch (error) {
    throw error
  }
}

// time收益记录
export const FetchIncomeList = async (page, size) => {
  const index = (page - 1) * size
  try {
    const res = await Api.AccountApi.TimeIncomerecord({ index, size })
    if (Api.isSuccess(res)) {
      return res.data
    } else {
      throw new Error("errCode");
    }
  } catch (error) {
    console.error(error);
    throw error
  }
}

// time今日收益和K线记录
export const FetchTimeIncometoday = async (days) => {
  try {
    const res = await Api.AccountApi.TimeIncometoday({ days })
    if (Api.isSuccess(res)) {
      return res.data
    } else {
      throw new Error("errCode");
    }
  } catch (error) {
    console.error(error);
    throw error
  }
}
// 获取timeMater收益记录
export const useFetTimeIncomeList = (page: number, pageSize: number) => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  useEffect(() => {
    if (account) {
      dispatch(fetchIncomeList({ page, pageSize }))
      dispatch(fetchMatterIncomeList({ page, pageSize }))
    }
  }, [account])
}

// 获取timeMater今日收益和K线记录
export const useFetTimeIncometoday = (day: number) => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  useEffect(() => {
    if (account) {
      dispatch(fetchTimeIncometoday({ day }))
      dispatch(fetchMatterIncometoday({ day }))
    }
  }, [account, day,])
}
// 获取钱包余额详情
export const useFetchWalletInfo = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  const refresh = useRefresh()
  useEffect(() => {
    if (account) dispatch(fetchWalletAsync())
  }, [refresh, account])
}

// 获取授权数量
export const useFetchApproveNum = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  useEffect(() => {
    dispatch(fetchApproveNumAsync(account))
  }, [account])
}

// 获取Time兑换详情
export const useFetTimeInfo = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  const refresh = useRefresh(1)
  useEffect(() => {
    dispatch(fetchTimeShopInfo())
  }, [refresh, account])
}

// 获取Time兑换列表
export const useFetTimeExchangeList = (page: number, pageSize: number) => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  useEffect(() => {
    if (account) dispatch(fetchTimeExchangeList({ account, page, pageSize }))
  }, [account, page, pageSize])
}
// 获取DSG授权数量
export const useFetchDSGApproveNum = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  useEffect(() => {
    if (account) dispatch(fetchDSGApproveNumAsync(account))
  }, [account])
}
// 
export const useFetchRewardNum = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  useEffect(() => {
    dispatch(fetchRewardNumAsync(account))
  }, [account])
}

export const useFetchTimeBurnData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((p: State) => p.loginReducer.token);
  const refresh = useRefreshTimeBurn()
  useEffect(() => {
    if (token) {
      dispatch(fetchWalletAsync())
      dispatch(fetchWalletAverageburntime())
      dispatch(fetchWalletBurncointoday())
    }
  }, [refresh, token])
}


// 平台time余额
export const usePlatformTimeBalance = () => {
  const wallet = useSelector((p: State) => p.wallet.wallet);
  return useMemo(() => {
    const timeWallet = wallet.find(item => item.token_type === 1)
    // const timeWallet = wallet.find(item => item.address?.toLowerCase() === getTimeAddress().toLowerCase())
    return {
      availableBalance: new BigNumber(timeWallet?.available_balance || 0),
      uid: timeWallet?.uid,
    }
  }, [wallet])
}

// 预计使用时间
export const useEstimatedServiceTime = () => {
  const [leftTime, setLeftTime] = useState(0)
  const { averageBurnTime } = useSelector((p: State) => p.wallet.spendTimeInfo);
  const { availableBalance, uid } = usePlatformTimeBalance()
  useEffect(() => {
    if (!uid) {
      setLeftTime(0) // 未请求回数据, 剩余时间无
    } else if (!Number(averageBurnTime)) {
      setLeftTime(availableBalance.toNumber()) // 没有平均消耗值, 剩余时间为币种数量
    } else {
      setLeftTime(availableBalance.div(averageBurnTime).toNumber())

    }
  }, [availableBalance, averageBurnTime])

  return leftTime
}

