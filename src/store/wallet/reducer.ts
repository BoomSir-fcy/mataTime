import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Api } from 'apis';
import { changeActiveToken } from './actions';
import { FetchApproveNum, FetchDSGApproveNum, FetchExchangeList, FetchRewardNum, FetchTimeShopInfo } from './hooks';
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
  TimeInfo: [],
  CurrentRound: {
    long_time: 0,
    max_dsg_token: 0,
    max_time_token: 0,
    right_now_release: 0,
    times: 1,
    total_dsg: 0
  },
  TimeExchangeList: [],
  activeToken: localStorage.getItem("activeToken") ? localStorage.getItem("activeToken") : 'Time',
  rewardNum: 0
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
// Time兑换历史
export const fetchTimeExchangeList = createAsyncThunk<any, any>('wallet/fetchTimeExchangeList', async ({ account, page, pageSize = 10, end = 0 }) => {
  const res = await FetchExchangeList(account, page, pageSize, end);
  return res
});

// DSG全部可领取数量
export const fetchRewardNumAsync = createAsyncThunk<any, string>('wallet/fetchRewardNumAsync', async (account) => {
  const res = await FetchRewardNum(account);
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
        const arr = action.payload;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].total_dsg < arr[i].max_dsg_token) {
            state.CurrentRound = arr[i]
            break
          }
        }
        state.TimeInfo = action.payload;
      })
      .addCase(fetchTimeExchangeList.fulfilled, (state, action) => {
        state.TimeExchangeList = action.payload;
      })
      .addCase(changeActiveToken, (state, action) => {
        state.activeToken = action.payload.activeToken;
        localStorage.setItem("activeToken", action.payload.activeToken);
      })
      .addCase(fetchRewardNumAsync.fulfilled, (state, action) => {
        state.rewardNum = action.payload;
      })
  }
});

export default wallet.reducer;
