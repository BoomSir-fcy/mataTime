import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCashierDeskAddress, getTimeAddress } from 'utils/addressHelpers';
import erc20Abi from 'config/abi/erc20.json'
import { Api } from 'apis';
import multicall from 'utils/multicall';
import { getBalanceNumber } from 'utils/formatBalance';

import { AppDispatch, AppState } from '../index'
import { fetchHistoryAsync, fetchWalletAsync, fetchApproveNumAsync } from './reducer'


const REFRESH_INTERVAL = 30 * 1000

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

const useRefresh = () => {
  const [fefresh, setFefresh] = useState(0)
  const isBrowserTabActiveRef = useIsBrowserTabActive()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setFefresh((prev) => prev + 1)
      }
    }, REFRESH_INTERVAL)
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


// 获取钱包余额详情
export const useFetchWalletInfo = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  const refresh = useRefresh()
  useEffect(() => {
    account && dispatch(fetchWalletAsync())
  }, [refresh, account])
}

// 获取充提记录
export const useFetchHistoryList = (page?) => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchHistoryAsync(page))
  }, [])
}


// 获取授权数量
export const useFetchApproveNum = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  useEffect(() => {
    dispatch(fetchApproveNumAsync(account))
  }, [account])
}

