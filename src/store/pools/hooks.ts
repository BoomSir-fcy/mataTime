import BigNumber from 'bignumber.js'
import { useRef, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useRefresh from 'hooks/useRefresh'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSinglePoolDataAsync } from './thunks'
import { State } from '../types'


export const useFetchSinglePool = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    dispatch(fetchSinglePoolDataAsync(account))
  }, [slowRefresh, account])
}


export const useLiquidityPoolState = () => {
  const pools = useSelector((state: State) => state.pools.liquidity)
  return pools
}

export const useSinglePoolState = () => {
  const pools = useSelector((state: State) => state.pools.single)
  return pools
}


