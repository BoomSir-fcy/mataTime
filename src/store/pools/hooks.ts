import BigNumber from 'bignumber.js'
import { useRef, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useRefresh from 'hooks/useRefresh'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLpDataListAsync } from './thunks'
import { State } from '../types'

export const useFetchLiquidityPool = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    dispatch(fetchLpDataListAsync(account))
  }, [slowRefresh, account])
}

export const useLiquidityPoolState = () => {
  const pools = useSelector((state: State) => state.pools.liquidity)
  return pools
}


