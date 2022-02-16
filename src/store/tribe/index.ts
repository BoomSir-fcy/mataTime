import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NftInfo, TribeBaseInfo, TribeState } from './type';
import {
  getFeeTokenList,
  getTicketNftTokenList,
  getTribeNftInfo,
} from './fetchTribe';
import { getNftsList } from 'apis/DsgRequest';

const initialState: TribeState = {
  tribeId: 1415926538,
  ownerNFTId: null,
  memberNFTId: null,
  tribeBaseInfo: {
    name: '',
    logo: '',
    intruction: '',
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
    claimOnwerNFT: false,
    ownerNFTName: '',
    ownerNFTIntroduction: '',
    ownerNFTImage: '',
    memberNFTName: '',
    memberNFTIntroduction: '',
    memberNFTImage: '',
    initMemberNFT: false,
  },
  feeCoinList: [],
  ticketNftList: [],
  loading: true,
  activeNftInfo: {},
};
export const fetchSetTribeBaseInfo = createAsyncThunk(
  'tribe/fetchSetTribeBaseInfo',
  async (tribeBaseInfo: TribeBaseInfo, { dispatch }) => {
    // todo: 修改部落基本信息
  },
);
export const fetchTribeNftInfo = createAsyncThunk<any, { tribeId: number }>(
  'tribe/fetchTribeNftInfo',
  async ({ tribeId }, { dispatch }) => {
    const info = await getTribeNftInfo(tribeId);
    dispatch(setTribeNftInfo(info));
  },
);
export const fetchActiveNftInfo = createAsyncThunk<any, { info: NftInfo }>(
  'tribe/fetchActiveNftInfo',
  async ({ info }, { dispatch }) => {
    dispatch(setActiveNftInfo(info));
  },
);

export const fetchFeeTokenListAsync = createAsyncThunk(
  'tribe/fetchFeeTokenListAsync',
  async () => {
    const list = await getFeeTokenList();
    return list;
  },
);

export const fetchTicketNftListAsync = createAsyncThunk<
  any,
  { account: string }
>('tribe/fetchTicketNftListAsync', async ({ account }) => {
  const [nftList, ticketNftToken] = await Promise.all([
    getNftsList(account),
    getTicketNftTokenList(),
  ]);
  const tokens = ticketNftToken
    .map(val => {
      return val?.toLowerCase();
    })
    .toString();
  const list = nftList
    .filter(v => tokens.indexOf(v.properties?.token?.toLowerCase()) !== -1)
    .map(item => {
      return {
        name: item.name,
        image: item.image,
        nftToken: item.properties.token,
        nftId: item.properties.token_id,
      };
    });
  return list;
});

export const tribe = createSlice({
  name: 'tribe',
  initialState,
  reducers: {
    setActiveNftInfo: (state, { payload }) => {
      state.activeNftInfo = payload;
    },
    setTribeNftInfo: (state, { payload }) => {
      state.tribesNftInfo = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFeeTokenListAsync.fulfilled, (state, action) => {
        // todo: 根据token获取代币symbol值
        const tokenMap = {
          '0x0000000000000000000000000000000000000001': 'BNB',
          '0x865746A11eC78819c0067a031e9dd8D69F0B319d': 'USDT',
        };
        const coinList = action.payload.map(item => {
          return { tokenAddress: item, symbol: tokenMap[item] };
        });
        state.feeCoinList = [...coinList];
      })
      .addCase(fetchTicketNftListAsync.fulfilled, (state, { payload }) => {
        state.ticketNftList = payload;
        state.loading = false;
      });
  },
});

// Actions
export const { setActiveNftInfo, setTribeNftInfo } = tribe.actions;

export default tribe.reducer;
