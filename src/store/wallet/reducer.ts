import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Api } from 'apis';
import { FetchApproveNum, FetchDSGApproveNum, FetchTimeShopInfo } from './hooks';
import { WalletState } from './type';

const initialState: WalletState = {
  ApproveNum: {
    time: 0,
    matter: 0,
    dsg: 0,
  },
  wallet: [{
    address: "",
    available_balance: "0",
    freeze_balance: "0",
    token_type: 1,
    total_balance: "0",
    uid: 0
  }],
  TimeInfo: []
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
// DSG授权数量
export const fetchDSGApproveNumAsync = createAsyncThunk<any, string>('wallet/fetchDSGApproveNumAsync', async (account) => {
  const res = await FetchDSGApproveNum(account);
  return res
});
// Time兑换详情
export const fetchTimeShopInfo = createAsyncThunk<any>('wallet/fetchTimeShopInfo', async () => {
  const res = await FetchTimeShopInfo();
  return res
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
      .addCase(fetchApproveNumAsync.fulfilled, (state, action) => {
        state.ApproveNum.time = action.payload.time;
        state.ApproveNum.matter = action.payload.matter;
      })
      .addCase(fetchDSGApproveNumAsync.fulfilled, (state, action) => {
        state.ApproveNum.dsg = action.payload;
      })
      .addCase(fetchTimeShopInfo.fulfilled, (state, action) => {
        state.TimeInfo = action.payload;
      })
  }
});

export default wallet.reducer;
