import BigNumber from 'bignumber.js'
import { AppThunk } from '../types'
import { LiquidityPoolData, SinglePoolData, PoolUserDataBase } from './types'
import { fetchLpDataList } from './fetchLpData'
import { fetchSinglePoolData, fetchPoolTokensPrice, fetchSinglePoolUserData, fetchUserTokenVal } from './fetchSinglePoolData'
import { setLpDataList, setSpDataList, setSpUserData, setSpUserStakesData, setSpAprsData } from '.'
import { getPoolsApr, getUserPoolsMap, getUserStakesMap } from './utils'
import { fetchLpRewardsApr } from './fetchLpAprs'

export const fetchSpPublicDatasAsync = (datas: SinglePoolData[]): AppThunk => async (dispatch) => {
  const priceData = await fetchPoolTokensPrice(datas)
  dispatch(setSpDataList(priceData))
  dispatch(fetchSpRewardsAprAsync(priceData))
}

export const fetchSpRewardsAprAsync = (datas: SinglePoolData[]): AppThunk => async (dispatch) => {
  const donateAprs = await fetchLpRewardsApr(datas)
  const aprs = {}
  datas.forEach(item => {
    const donateApr = donateAprs.find(donate => donate.pid === item.pid)
    aprs[item.pid] = getPoolsApr(item, donateApr?.totalDonateAmount)
  })

  dispatch(setSpAprsData(aprs))
}

export const fetchSpVaultUserAsync = (account: string, datas?: SinglePoolData[]): AppThunk => async (dispatch, getState) => {
  const userPoolData = await fetchSinglePoolUserData(account)

  dispatch(setSpUserStakesData(getUserStakesMap(userPoolData)))

  dispatch(setSpUserData(getUserPoolsMap(userPoolData)))

  const pools = datas ? datas : getState().pools.single.data
  const userTokens = await fetchUserTokenVal(account, pools)
  dispatch(setSpUserData(userTokens))
}

export const fetchSinglePoolDataAsync =
  (account?: string): AppThunk =>
    async (dispatch, getState) => {
      const data = await fetchSinglePoolData()

      dispatch(setSpDataList(data))
      dispatch(fetchSpPublicDatasAsync(data))
      if (account) {
        dispatch(fetchSpVaultUserAsync(account))
      }
    }

