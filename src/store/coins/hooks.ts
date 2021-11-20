import BigNumber from 'bignumber.js'
import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchCoinInfoAsync, fetchCoinsListAsync } from './reducer'

const REFRESH_INTERVAL = 5 * 60 * 1000

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

export const useFetchCoinsList = () => {
  const dispatch = useDispatch<AppDispatch>()

  const refresh = useRefresh()

  useEffect(() => {
    dispatch(fetchCoinsListAsync())
  }, [refresh])
}

export const useFetchCoinInfo = (coinId) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (coinId) {
      dispatch(fetchCoinInfoAsync(coinId))
    }
  }, [coinId])
}


export function useCoinsState(): AppState['coins'] {
  return useSelector<AppState, AppState['coins']>((state) => state.coins)
}

export function useCoinsMap(): {
  [coinId: string]: Api.Coins.CoinInfo
} {
  const { data } = useCoinsState()
  return data
}

export function useCoinsList(): Api.Coins.CoinInfo[] {
  const { data } = useCoinsState()
  return Object.values(data)
}
