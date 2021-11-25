import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from 'apis';
import { FetchApproveNum } from './hooks';

export interface WalletState {
  ApproveNum: {
    time: number
    matter: number
  }
  wallet: [{
    address: string,
    available_balance: string,
    freeze_balance: string,
    token_type: number,
    total_balance: string
    uid: number,
  }]
  history: {
    event_list: [{
      event_type: number,
      event_amount: string
      event_time: number,
      event_hash: string
    }]
    page: number
    page_size: number
    totalCount: number
  }
}

const initialState: WalletState = {
  ApproveNum: {
    time: 0,
    matter: 0
  },
  wallet: [{
    address: "",
    available_balance: "0",
    freeze_balance: "0",
    token_type: 1,
    total_balance: "0",
    uid: 0
  }],
  history: {
    event_list: [{
      event_type: 0,
      event_amount: '',
      event_time: 0,
      event_hash: ''
    }],
    page: 0,
    page_size: 0,
    totalCount: 0
  }
};

// Async thunks
// 平台钱包余额
export const fetchWalletAsync = createAsyncThunk<any>('wallet/fetchWalletAsync', async () => {
  const res = await Api.AccountApi.balance();
  return res.data
});
// 授权数量
export const fetchApproveNumAsync = createAsyncThunk<any, string>('wallet/fetchApproveNumAsync', async (account) => {
  const res = await FetchApproveNum(account);
  return res
});
// 充提记录
export const fetchHistoryAsync = createAsyncThunk<any, Api.Account.History>('wallet/fetchHistoryAsync', async (Page?) => {
  const res = await Api.AccountApi.history(Page);
  return res.data
});

export const wallet = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWalletAsync.fulfilled, (state, action) => {
        state.wallet = action.payload;
      })
      .addCase(fetchHistoryAsync.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(fetchApproveNumAsync.fulfilled, (state, action) => {
        state.ApproveNum = action.payload;
      })
  }
});

export default wallet.reducer;
