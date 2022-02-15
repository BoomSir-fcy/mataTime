import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const tribe = createSlice({
  name: 'tribe',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchFeeTokenListAsync.fulfilled, (state, action) => {
      const tokenMap = {
        '0x0000000000000000000000000000000000000001': 'BNB',
        '0x865746A11eC78819c0067a031e9dd8D69F0B319d': 'USDT',
      };
      const coinList = action.payload.map(item => {
        return { tokenAddress: item, symbol: tokenMap[item] };
      });
      state.feeCoinList = [...coinList];
    });
  },
});

// Actions
export const {} = tribe.actions;

export default tribe.reducer;
