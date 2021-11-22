import { AppThunk } from '../types'
import { LiquidityPoolData } from './types'
import { fetchLpDataList } from './fetchLpData'
import { setLpDataList } from '.'


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

