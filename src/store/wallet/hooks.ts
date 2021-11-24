import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchWalletAsync } from './reducer'

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
// 获取钱包余额详情
export const useFetchWalletInfo = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useWeb3React()
  const refresh = useRefresh()
  useEffect(() => {
    account && dispatch(fetchWalletAsync())
  }, [refresh, account])
}



