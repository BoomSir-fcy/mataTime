import BigNumber from 'bignumber.js'
import { AppThunk } from '../types'
import { LiquidityPoolData, SinglePoolData, PoolUserDataBase } from './types'
import { fetchLpDataList } from './fetchLpData'
import { fetchSinglePoolData, fetchPoolTokensPrice, fetchSinglePoolUserData, fetchUserTokenVal } from './fetchSinglePoolData'
import { setLpDataList, setSpDataList, setSpUserData, setSpUserStakesData } from '.'


export const fetchLpPublicDatasAsync = (data: LiquidityPoolData[]): AppThunk => async (dispatch) => {
  // TODO:
  dispatch(setLpDataList(data))
}
export const fetchVaultUserAsync = (account: string): AppThunk => async (dispatch) => {
  // TODO:
  // dispatch(setLpDataList(data))
  console.log(account)
}

export const fetchLpDataListAsync =
  (account?: string): AppThunk =>
    async (dispatch, getState) => {
      const state = getState()
      const { liquidity } = state.pools
      const data = await fetchLpDataList()
      dispatch(setLpDataList(data))
      dispatch(fetchLpPublicDatasAsync(data))
      if (account) {
        dispatch(fetchVaultUserAsync(account))
      }
    }


export const fetchSpPublicDatasAsync = (datas: SinglePoolData[]): AppThunk => async (dispatch) => {
  const priceData = await fetchPoolTokensPrice(datas)
  dispatch(setSpDataList(priceData))
}
export const fetchSpVaultUserAsync = (account: string, datas?: SinglePoolData[]): AppThunk => async (dispatch, getState) => {
  const userPoolData = await fetchSinglePoolUserData(account)
  dispatch(setSpUserStakesData(userPoolData))
  const farmatUserPoolsMap: { [pid: string]: PoolUserDataBase } = {}
  userPoolData.forEach(item => {
    if (!farmatUserPoolsMap[item.pid]) {
      farmatUserPoolsMap[item.pid] = {
        stakeAmount: item.stakeAmount,
        token0UnclaimedRewards: item.token0UnclaimedRewards,
        token1UnclaimedRewards: item.token1UnclaimedRewards,
        pid: item.pid,
      }
    } else {
      const stakeAmount = new BigNumber(farmatUserPoolsMap[item.pid].stakeAmount).plus(item.stakeAmount).toString()
      const token0UnclaimedRewards = new BigNumber(farmatUserPoolsMap[item.pid].token0UnclaimedRewards).plus(item.token0UnclaimedRewards).toString()
      const token1UnclaimedRewards = new BigNumber(farmatUserPoolsMap[item.pid].token1UnclaimedRewards).plus(item.token1UnclaimedRewards).toString()
      farmatUserPoolsMap[item.pid] = {
        stakeAmount,
        token0UnclaimedRewards,
        token1UnclaimedRewards,
        pid: item.pid,
      }
    }
  })

  dispatch(setSpUserData(Object.values(farmatUserPoolsMap)))
  const pools = datas ? datas : getState().pools.single.data
  const userTokens = await fetchUserTokenVal(account, pools)
  dispatch(setSpUserData(userTokens))
}

export const fetchSinglePoolDataAsync =
  (account?: string): AppThunk =>
    async (dispatch, getState) => {
      const state = getState()
      const data = await fetchSinglePoolData()
      dispatch(setSpDataList(data))
      dispatch(fetchSpPublicDatasAsync(data))
      if (account) {
        dispatch(fetchSpVaultUserAsync(account))
      }
    }

