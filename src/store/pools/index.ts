import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PoolsState, LiquidityPoolData, UserData, SinglePoolData, PoolUserData, UserTokenData } from './types'

const initialState: PoolsState = {
  liquidity: {
    data: [],
    loaded: false,
    userDataMap: {}
  },
  single: {
    data: [],
    loaded: false,
    userDataMap: {}
  },
};


export const pools = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    setLpDataList: (state, { payload: datas }: { payload: LiquidityPoolData[] }) => {
      state.liquidity.data = datas.map(item => {
        const oldItem = state.liquidity.data.find(subItem => subItem.pid === item.pid)
        return {
          ...oldItem,
          ...item,
        }
      })
      state.liquidity.loaded = true
    },
    setLpUserData: (state, { payload: userDatas }: { payload: UserData[] }) => {
      state.liquidity.data = state.liquidity.data.map(item => {
        const userData = userDatas.find(subItem => subItem.pid === item.pid)
        return {
          ...item,
          userData: {
            ...userData
          }
        }
      })
    },
    setSpDataList: (state, { payload: datas }: { payload: SinglePoolData[] }) => {
      state.single.data = datas.map(item => {
        const oldItem = state.single.data.find(subItem => subItem.pid === item.pid)
        return {
          ...oldItem,
          ...item,
        }
      })
      state.single.loaded = true
    },
    setSpUserData: (state, { payload: userDatas }: { payload: PoolUserData[] | UserTokenData[] }) => {
      console.log(userDatas, '=payload')
      userDatas.forEach(item => {
        state.single.userDataMap[item.pid] = {
          ...state.single.userDataMap[item.pid],
          ...item
        }
      })
    }
  },
});

// Actions
export const {
  setLpDataList,
  setSpDataList,
  setSpUserData,
} = pools.actions

export default pools.reducer;
