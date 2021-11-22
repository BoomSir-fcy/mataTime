import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PoolsState, LiquidityPoolData, PoolUserData } from './types'

const initialState: PoolsState = {
  liquidity: {
    data: [],
    loaded: false,
  },
  single: {
    data: [],
    loaded: false,
  },
};


export const pools = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    setLpDataList: (state, { payload: datas }: { payload: LiquidityPoolData[] }) => {
      state.liquidity.data = datas.map(item => {
        const oldItem = state.liquidity.data.find(subItem => subItem.poolId === item.poolId)
        return {
          ...oldItem,
          ...item,
        }
      })
      state.liquidity.loaded = true
    },
    setLpUserData: (state, { payload: userDatas }: { payload: PoolUserData[] }) => {
      state.liquidity.data = state.liquidity.data.map(item => {
        const userData = userDatas.find(subItem => subItem.poolId === item.poolId)
        return {
          ...item,
          userData: {
            ...userData
          }
        }
      })
    }
  },
});

// Actions
export const {
  setLpDataList,
} = pools.actions

export default pools.reducer;
