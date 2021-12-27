import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from 'apis';
import { getMatterAddress, getTimeAddress } from 'utils/addressHelpers';
import { setTopicCoins } from './actions';
import { getTime24HoursData } from './getSwapData';

export interface CoinsState {
  total: number;
  pageSize: number;
  page: number;
  loaded: boolean;
  data: {
    [coinId: string]: Api.Coins.CoinInfo;
  };
  // 点击$coin$ 储存数据
  clickCoins: {
    symbol: string
    projectLink: string,
    address: {},
    decimals: number,
    clickTime: number, // 点击时间 = ( 时间戳 / 1000 / 3 ) 除3做节流处理 三秒内点同一个只会生效一次
  }
}

const initialState: CoinsState = {
  total: 0,
  pageSize: 200,
  page: 1,
  loaded: false,
  data: {},
  clickCoins: {
    symbol: '',
    projectLink: '',
    address: {},
    decimals: 0,
    clickTime: 0, // 点击时间 = ( 时间戳 / 1000 / 3 ) 除3做节流处理 三秒内点同一个只会生效一次
  }
};

// Async thunks
export const fetchCoinsListAsync = createAsyncThunk(
  'fetch/fetchCoinsListAsync',
  async (_, { getState }) => {
    const { coins } = getState() as { coins: CoinsState };
    const response = await Api.CoinsApi.fetchCoinsList({
      page: coins.page,
      page_size: coins.pageSize
    });
    return response;
  }
);

// Async thunks
export const fetchCoinInfoAsync = createAsyncThunk<Api.Coins.CoinInfo, string>(
  'fetch/fetchCoinInfoAsync',
  async coin_id => {
    const response = await Api.CoinsApi.fetchCoinInfoById({
      coin_id
    });
    const timeToken = getTimeAddress().toLowerCase()
    const volume1 = await getTime24HoursData(timeToken)

    if (response?.coin_symbol === 'TIME') {
      const timeToken = getTimeAddress().toLowerCase()
      const volume = await getTime24HoursData(timeToken)
      response.total_volume = volume.totalVolumeUSD
    } else if (response?.coin_symbol === 'MATTER') {
      const matterToken = getMatterAddress().toLowerCase()
      const volume = await getTime24HoursData(matterToken)
      response.total_volume = volume.totalVolumeUSD
    }
    console.log(response, 'response')
    return response;
  }
);

export const coins = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        fetchCoinsListAsync.fulfilled,
        (state, { payload: { coin_list, total_count } }) => {
          coin_list?.forEach(item => {
            state.data[item.coin_id] = {
              ...state.data[item.coin_id],
              ...item
            };
          });
          state.total = total_count;
          state.loaded = true;
        }
      )
      .addCase(setTopicCoins, (state, action) => {
        // nowTime 做防抖处理
        const nowTime = Math.floor(new Date().getTime() / 1000 / 3)
        const { symbol, clickTime } = state.clickCoins
        if (symbol !== action.payload?.symbol || clickTime !== nowTime) {
          state.clickCoins = {
            ...action.payload,
            clickTime: nowTime,
          };
        }
      })
      .addCase(fetchCoinInfoAsync.fulfilled, (state, { payload: coinInfo }) => {
        if (coinInfo) {
          state.data[coinInfo.coin_id] = {
            ...state.data[coinInfo.coin_id],
            ...coinInfo
          };
        }
      });
  }
});

export default coins.reducer;
