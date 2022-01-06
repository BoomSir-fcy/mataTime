import { createSlice } from '@reduxjs/toolkit';
import random from 'lodash/random';
import stuffRes from 'config/constants/stuffImages';
import { PickNftState, AppThunk } from '../types';
import { updateSelectData, randomPick, setInviteCodes } from './actions';
import {
  fetchCodeUsed,
  fetchNftApproval,
  fetchTicketAllowance,
  fetchTicketPrice,
  fetchCodeInfo,
} from './fetchUserAllowance';
import { fetchStuffAllInfo } from './fetchStuffInfo';
import { fetchInviteInfo } from './fetchInviteInfo';

const initialState: PickNftState = {
  selectData: [],
  stuffRes: JSON.parse(JSON.stringify(stuffRes)),
  isApprove: false,
  codeUsed: false,
  loaded: false,
  allowanceTicket: '0',
  ticketInfo: {
    ticketPrice: '0',
    count: '0',
    limit: '0',
    loaded: false,
  },
  codes: {
    code: '54ec8296b88e1e0e678a8aa918f6e6324ffc925364285bf57debbacf973f5581',
    code_hash: '4a3037bbc979534f168bd18cae63179b255600af8fcfe8efb677df039e92974f',
    lock_hash: '8ed1ffe3ff633ea24e5e4ce8123febcdb5b1b0f01483e78b910364aab912e2be',
  },
  inviteInfo: {
    nft_: '',
    userProfile_: '',
    codeLockDuration_: 0,
    maxGendCodeCount_: 0,
    toToken_: '',
  },
  codeInfo: {
    lockUser: '',
    lockedAt: 0,
    address: '',
    state: '',
  }
};
export const fetchCodeUsedAsync =
  (code?: string): AppThunk =>
    async dispatch => {
      const data = await fetchCodeInfo(code);
      dispatch(setCodeUsed(data));
      dispatch(setCodeInfo(data));
    };
export const fetchNftApprovalAsync =
  (account?: string): AppThunk =>
    async dispatch => {
      const data = await fetchNftApproval(account);
      dispatch(setNftApproval(data));
    };

export const fetchTicketAllowanceAsync =
  (account?: string): AppThunk =>
    async dispatch => {
      const data = await fetchTicketAllowance(account);
      dispatch(setTicketAllowance(data));
    };

export const fetchInviteInfoAsync =
  (): AppThunk =>
    async dispatch => {
      const data = await fetchInviteInfo();
      dispatch(setInviteInfo(data));
    };

export const fetchTicketPriceAsync = (): AppThunk => async dispatch => {
  const data = await fetchTicketPrice();
  dispatch(setTicketPrice(data));
};
export const fetchStuffAllLimitsAsync = (): AppThunk => async dispatch => {
  const data = await fetchStuffAllInfo();
  dispatch(setStuffAllLimits(data));
};

// export const fetchCodeInfoAsync = (codeHash: string): AppThunk => async dispatch => {
//   const data = await fetchCodeInfo(codeHash);
//   dispatch(setCodeInfo(data));
// };

export const picknft = createSlice({
  name: 'PickNft',
  initialState,
  reducers: {
    setCodeUsed: (state, action) => {
      const { payload } = action;
      state.codeUsed = payload;
    },
    setNftApproval: (state, action) => {
      const { payload } = action;
      state.isApprove = payload;
    },
    setTicketAllowance: (state, action) => {
      const { payload } = action;
      state.allowanceTicket = payload;
    },
    setInviteInfo: (state, action) => {
      const { payload } = action;
      state.inviteInfo = payload;
    },
    setTicketPrice: (state, action) => {
      const { payload } = action;
      state.ticketInfo = {
        ...payload,
        loaded: true,
      };
    },
    setCodeInfo: (state, action) => {
      const { payload } = action;
      state.codeInfo = {
        ...payload
      }
    },
    setStuffAllLimits: (state, action) => {
      const { payload } = action;
      const limitData = [];
      // 设置所以组件的 总量(limitSize) 和 已经使用量(createdSize)
      const stuffData = stuffRes.map((item, index) =>
        item.map((subItem, subIndex) => {
          const renderItem = {
            ...subItem,
            limitSize: payload.limitSizes?.[index]?.[0]?.[subIndex] || 0,
            createdSize: payload.createdSizes?.[index]?.[0]?.[subIndex] || 0,
            enable:
              !(payload.limitSizes?.[index]?.[0]?.[subIndex] || 0) ||
              (payload.limitSizes?.[index]?.[0]?.[subIndex] || 0) -
              (payload.createdSizes?.[index]?.[0]?.[subIndex] || 0) >
              0,
          };
          if (payload.limitSizes?.[index]?.[0]?.[subIndex]) {
            limitData.push({
              ...renderItem,
            });
          }
          return {
            ...renderItem,
          };
        }),
      );
      // const renderState =
      // const renderState = stuffData.map(item => item.filter( subItem => !subItem.limitSize))
      state.stuffRes = [...stuffData];
      state.loaded = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateSelectData, (state, action) => {
      const { payload } = action;
      // 当前部件是否已存在
      const isExistence = state.selectData.some(
        item => item.index === payload.index && item.id === payload.id,
      );
      // 必选
      if (payload.isBase && isExistence) {
        return;
      }
      const newData = state.selectData.filter(item => {
        return item.index !== payload.index;
      });
      if (isExistence) {
        const sameIndex = stuffRes.find(
          item => item[0].index === payload.index,
        );
        state.selectData = newData.concat({
          ...sameIndex.find(item => item.isDefault),
        });
        return;
      }
      state.selectData = newData.concat({ ...payload });
    });
    builder.addCase(randomPick, state => {
      // state.selectData = randomStuff()
      state.selectData = state.stuffRes.map(item => {
        const enableItems = item.filter(subItem => subItem.enable);
        const { length } = enableItems;
        const index = random(0, length - 1);
        return enableItems[index];
      });
    });
    builder.addCase(setInviteCodes, (state, { payload }) => {
      state.codes = {
        ...state.codes,
        ...payload
      }
    });
  },
});

// Actions
export const {
  setNftApproval,
  setTicketAllowance,
  setTicketPrice,
  setCodeUsed,
  setCodeInfo,
  setStuffAllLimits,
  setInviteInfo,
} = picknft.actions;

export default picknft.reducer;
