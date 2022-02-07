import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Api } from 'apis';
import { changeActiveToken, changeChoiceToken } from './actions';
import {
  FetchMatterIncomeList,
  FetchMatterIncometoday,
  FetchMinimum,
} from './fetch';
import {
  FetchApproveNum,
  FetchDSGApproveNum,
  FetchExchangeList,
  FetchIncomeList,
  FetchRewardNum,
  FetchTimeIncometoday,
  FetchTimeShopInfo,
} from './hooks';
import { WalletState } from './type';

const initialState: WalletState = {
  ApproveNum: {
    time: 0,
    matter: 0,
    dsg: 0,
  },
  wallet: [
    {
      address: '',
      available_balance: '0',
      freeze_balance: '0',
      token_type: 1,
      total_balance: '0',
      uid: 0,
    },
  ],
  TimeInfo: [],
  CurrentRound: {
    long_time: 0,
    max_dsg_token: 0,
    max_time_token: 0,
    right_now_release: 0,
    times: 1,
    total_dsg: 0,
  },
  TimeExchangeList: [],
  activeToken: '',
  rewardNum: 0,
  spendTimeInfo: {
    burnCoinTody: '0',
    averageBurnTime: '0',
  },
  TimeIncomeList: {
    index: 0,
    record: [],
    size: 10,
    total: 0,
    creator_percent: 0,
  },
  TimeIncometoday: {
    data: [],
    today_income: '0',
    total_income: '0',
    loadStatus: 0,
  },
  MatterIncomeList: {
    now_page: 0,
    matter_history: [],
    page_size: 0,
    total_size: 0,
  },
  MatterIncometoday: {
    data: [],
    today_income: '0',
    total_income: '0',
    loadStatus: 0,
  },
  WithDrawSetting: {
    meta_minimum: '0',
    time_minimum: '0',
    bnb_minimum: '0',
    withdraw_time_fee: '0',
    withdraw_meta_fee: '0',
    withdraw_bnb_fee: '0',
  },
  WithDrawFeeType: 1, //提币手续费—— 1 BNB 2对应币种
  choiceToken: 0, //选择的币种
};

// Async thunks
// 平台钱包余额
export const fetchWalletAsync = createAsyncThunk<any>(
  'wallet/fetchWalletAsync',
  async () => {
    const res = await Api.AccountApi.balance();
    return res.data;
  },
);
// 授权数量
export const fetchApproveNumAsync = createAsyncThunk<any, string>(
  'wallet/fetchApproveNumAsync',
  async account => {
    const res = await FetchApproveNum(account);
    return res;
  },
);
// DSG授权数量
export const fetchDSGApproveNumAsync = createAsyncThunk<any, string>(
  'wallet/fetchDSGApproveNumAsync',
  async account => {
    const res = await FetchDSGApproveNum(account);
    return res;
  },
);
// Time兑换详情
export const fetchTimeShopInfo = createAsyncThunk<any>(
  'wallet/fetchTimeShopInfo',
  async () => {
    const res = await FetchTimeShopInfo();
    return res;
  },
);
// Time兑换历史
export const fetchTimeExchangeList = createAsyncThunk<any, any>(
  'wallet/fetchTimeExchangeList',
  async ({ account, page, pageSize = 10 }) => {
    const res = await FetchExchangeList(account, page, pageSize);
    return res;
  },
);

// DSG全部可领取数量
export const fetchRewardNumAsync = createAsyncThunk<any, string>(
  'wallet/fetchRewardNumAsync',
  async account => {
    const res = await FetchRewardNum(account);
    return res;
  },
);

// 今日 消耗
export const fetchWalletBurncointoday = createAsyncThunk<string>(
  'wallet/fetchWalletBurncointoday',
  async () => {
    const res = await Api.AccountApi.getWalletBurncointoday();
    return res;
  },
);

// 平均消耗
export const fetchWalletAverageburntime = createAsyncThunk<string>(
  'wallet/fetchWalletAverageburntime',
  async () => {
    const res = await Api.AccountApi.getWalletAverageburntime();
    return res;
  },
);

// time收益记录
export const fetchIncomeList = createAsyncThunk<any, any>(
  'wallet/fetchIncomeList',
  async ({ page, pageSize = 5, readType }) => {
    const res = await FetchIncomeList(page, pageSize, readType);
    return res;
  },
);

// time今日收益和K线记录
export const fetchTimeIncometoday = createAsyncThunk<any, any>(
  'wallet/fetchTimeIncometoday',
  async ({ day }) => {
    const res = await FetchTimeIncometoday(day - 1);
    return res;
  },
);

// Matter收益记录
export const fetchMatterIncomeList = createAsyncThunk<any, any>(
  'wallet/fetchMatterIncomeList',
  async ({ page, pageSize = 5 }) => {
    const res = await FetchMatterIncomeList(page, pageSize);
    return res;
  },
);

// Matter今日收益和K线记录
export const fetchMatterIncometoday = createAsyncThunk<any, any>(
  'wallet/fetchMatterIncometoday',
  async ({ day }) => {
    const res = await FetchMatterIncometoday(day);
    return res;
  },
);

//  Time Matter最小提币数量
export const fetchMinimum = createAsyncThunk<any>(
  'wallet/fetchMinimum',
  async () => {
    const res = await FetchMinimum();
    return res;
  },
);

export const wallet = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWalletAsync.fulfilled, (state, action) => {
        let arr = action.payload;
        const compare = (obj1, obj2) => {
          var val1 = obj1.token_type;
          var val2 = obj2.token_type;
          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0;
          }
        };
        state.wallet = arr.sort(compare);
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
            state.CurrentRound = arr[i];
            break;
          }
        }
        state.TimeInfo = action.payload;
      })
      .addCase(fetchTimeExchangeList.fulfilled, (state, action) => {
        state.TimeExchangeList = action.payload;
      })
      .addCase(changeActiveToken, (state, action) => {
        state.activeToken = action.payload.activeToken;
        // localStorage.setItem('activeToken', action.payload.activeToken);
      })
      .addCase(changeChoiceToken, (state, action) => {
        state.choiceToken = action.payload.choiceToken;
      })
      .addCase(fetchRewardNumAsync.fulfilled, (state, action) => {
        state.rewardNum = action.payload;
      })
      .addCase(fetchWalletBurncointoday.fulfilled, (state, action) => {
        if (action.payload) {
          state.spendTimeInfo.burnCoinTody = action.payload;
        }
      })
      .addCase(fetchWalletAverageburntime.fulfilled, (state, action) => {
        if (action.payload) {
          state.spendTimeInfo.averageBurnTime = action.payload;
        }
      })
      .addCase(fetchIncomeList.fulfilled, (state, action) => {
        state.TimeIncomeList = action.payload;
      })
      .addCase(fetchTimeIncometoday.fulfilled, (state, action) => {
        state.TimeIncometoday = { ...action.payload, loadStatus: 1 };
      })
      .addCase(fetchMatterIncomeList.fulfilled, (state, action) => {
        state.MatterIncomeList = action.payload;
      })
      .addCase(fetchMatterIncometoday.fulfilled, (state, action) => {
        state.MatterIncometoday = { ...action.payload, loadStatus: 1 };
      })
      .addCase(fetchMinimum.fulfilled, (state, action) => {
        state.WithDrawSetting = action.payload;
      });
  },
});

export default wallet.reducer;
