import { createSlice } from '@reduxjs/toolkit';
import random from 'lodash/random';
import stuffRes from 'config/constants/stuffImages';
import { PickNftState, AppThunk } from '../types';
import { updateSelectData, randomPick } from './actions';
import {
  fetchNftApproval,
  fetchTicketAllowance,
  fetchTicketPrice,
} from './fetchUserAllowance';
import { fetchStuffAllInfo } from './fetchStuffInfo';

const initialState: PickNftState = {
  selectData: [],
  stuffRes: JSON.parse(JSON.stringify(stuffRes)),
  isApprove: false,
  loaded: false,
  allowanceTicket: '0',
  ticketInfo: {
    ticketPrice: '0',
    count: '0',
    limit: '0',
    loaded: false,
  },
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

export const fetchTicketPriceAsync = (): AppThunk => async dispatch => {
  const data = await fetchTicketPrice();
  dispatch(setTicketPrice(data));
};
export const fetchStuffAllLimitsAsync = (): AppThunk => async dispatch => {
  const data = await fetchStuffAllInfo();
  dispatch(setStuffAllLimits(data));
};

export const picknft = createSlice({
  name: 'PickNft',
  initialState,
  reducers: {
    setNftApproval: (state, action) => {
      const { payload } = action;
      state.isApprove = payload;
    },
    setTicketAllowance: (state, action) => {
      const { payload } = action;
      state.allowanceTicket = payload;
    },
    setTicketPrice: (state, action) => {
      const { payload } = action;
      state.ticketInfo = {
        ...payload,
        loaded: true,
      };
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
  },
});

// Actions
export const {
  setNftApproval,
  setTicketAllowance,
  setTicketPrice,
  setStuffAllLimits,
} = picknft.actions;

export default picknft.reducer;
