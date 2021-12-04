import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCashierDeskAddress, getDsgAddress, getTimeAddress, getTimeShopAddress } from 'utils/addressHelpers';
import erc20Abi from 'config/abi/erc20.json'
import timeShopAbi from 'config/abi/TimeShop.json';
import { Api } from 'apis';
import multicall from 'utils/multicall';
import { getBalanceNumber } from 'utils/formatBalance';
import { AppDispatch, AppState } from '../index'
import { fetchWalletAsync, fetchTimeShopInfo, fetchApproveNumAsync, fetchDSGApproveNumAsync } from './reducer'


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

// 获取钱包余额详情
export const useFetchWalletInfo = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  const refresh = useRefresh()
  useEffect(() => {
    account && dispatch(fetchWalletAsync())
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
    account && dispatch(fetchTimeShopInfo())
  }, [refresh, account])
}

// 获取DSG授权数量
export const useFetchDSGApproveNum = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  useEffect(() => {
    dispatch(fetchDSGApproveNumAsync(account))
  }, [account])
}

