import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from 'apis';

export interface CoinsState {
  total: number;
  pageSize: number;
  page: number;
  loaded: boolean;
  data: {
    [coinId: string]: Api.Coins.CoinInfo;
  };
}

const initialState: CoinsState = {
  total: 0,
  pageSize: 200,
  page: 1,
  loaded: false,
  data: {}
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
