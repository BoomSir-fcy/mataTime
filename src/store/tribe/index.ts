import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from 'apis';
import { TribeState } from './type';
import { getFeeTokenList } from './fetchTribe';

const initialState: TribeState = {
  tribeId: null,
  ownerNFTId: null,
  memberNFTId: null,
  tribeBaseInfo: {
    name: '',
    logo: '',
    feeToken: '',
    feeAmount: '',
    validDate: null,
    perTime: null,
    ownerPercent: null,
    authorPercent: null,
    memberPercent: null,
    nftAddress: '',
    nftid: null,
  },
  tribesNftInfo: {
    ownerNFTName: '',
    ownerNFTIntroduction: '',
    ownerNFTImage: '',
    memberNFTName: '',
    memberNFTIntroduction: '',
    memberNFTImage: '',
  },
  feeCoinList: [],
  tribeList: [
    {
      id: null,
      name: '',
      logo: '',
      type: null,
      nick_name: '',
      address: '',
      nft_image: '',
    },
  ],
  tribeInfo: {
    tribe: {
      name: '',
      logo: '',
      type: null,
    },
    selected_count: '',
    post_count: '',
    member_count: '',
  },
};

export const fetchTribeInfo = createAsyncThunk(
  'tribe/fetchTribeInfo',
  async dispatch => {},
);

export const fetchFeeTokenListAsync = createAsyncThunk(
  'tribe/fetchFeeTokenListAsync',
  async () => {
    const list = await getFeeTokenList();
    return list;
  },
);

export const fetchTribeListAsync = createAsyncThunk<any, any>(
  'tribe/fetchTribeListAsync',
  async ({ page = 1, psge_size = 10, tab = 1 }) => {
    const list = await Api.TribeApi.tribeList({ page, psge_size, tab });
    return list.data;
  },
);

export const fetchTribeInfoAsync = createAsyncThunk<any, any>(
  'tribe/fetchTribeInfoAsync',
  async ({ tribe_id }) => {
    const list = await Api.TribeApi.tribeInfo({ tribe_id });
    return list.data;
  },
);

export const tribe = createSlice({
  name: 'tribe',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFeeTokenListAsync.fulfilled, (state, action) => {
        const tokenMap = {
          '0x0000000000000000000000000000000000000001': 'BNB',
          '0x865746A11eC78819c0067a031e9dd8D69F0B319d': 'USDT',
        };
        const coinList = action.payload.map(item => {
          return { tokenAddress: item, symbol: tokenMap[item] };
        });
        state.feeCoinList = [...coinList];
      })
      .addCase(fetchTribeListAsync.fulfilled, (state, action) => {
        state.tribeList = action.payload;
      })
      .addCase(fetchTribeInfoAsync.fulfilled, (state, action) => {
        state.tribeInfo = action.payload;
      });
  },
});

// Actions
export const {} = tribe.actions;

export default tribe.reducer;
