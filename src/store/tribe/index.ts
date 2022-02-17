import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NftInfo, TribeBaseInfo, TribeState } from './type';
import {
  getFeeTokenList,
  getTicketNftTokenList,
  getTribeNftInfo,
} from './fetchTribe';
import { getNftsList } from 'apis/DsgRequest';
import { Api } from 'apis';
import uniqBy from 'lodash/uniqBy';

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
  postList: {
    list: [],
    lastList: [],
    page: 1,
    selected: 0,
    top: 0,
    addListNum: -1,
    loading: false,
    isEnd: false,
    userTags: [],
  },
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

export const fetchTribePostAsync = createAsyncThunk(
  'tribe/fetchTribePostAsync',
  async (params: Api.Tribe.tribePostListParams, { dispatch }) => {
    // dispatch()
    dispatch(setLoading(true));
    const response = await Api.TribeApi.tribePostList({
      ...params,
    });
    if (Api.isSuccess(response)) {
      return {
        list: response.data.List,
        page: params.page,
        per_page: params.per_page,
        selected: params.selected,
      };
    }
    return {};
  },
);
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
    setLoading: (state, { payload }) => {
      state.postList.loading = payload;
    },
    setIsEnd: (state, { payload }) => {
      state.postList.isEnd = payload;
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
      })
      .addCase(fetchTribeListAsync.fulfilled, (state, action) => {
        state.tribeList = action.payload;
      })
      .addCase(fetchTribeInfoAsync.fulfilled, (state, action) => {
        state.tribeInfo = action.payload;
      })
      .addCase(fetchTribePostAsync.fulfilled, (state, action) => {
        const { list, page, per_page, selected } = action.payload;
        let articleList = list ?? [];
        const { length } = state.postList.list;
        if (page === 1) {
          state.postList.list = articleList;
          state.postList.addListNum = -1;
        } else {
          const list = state.postList.list.concat(articleList);
          state.postList.list = uniqBy(list, 'id');
          state.postList.addListNum = state.postList.list.length - length;
        }
        state.postList.lastList =
          articleList.length >= per_page || page > 1 ? articleList : [];
        state.postList.page = articleList.length >= per_page ? page + 1 : page;
        state.postList.selected = Number(selected);
        state.postList.loading = false;
      })
      .addCase(fetchTribePostAsync.rejected, (state, action) => {
        state.postList.loading = false;
      });
  },
});

// Actions
export const { setActiveNftInfo, setTribeNftInfo, setLoading, setIsEnd } =
  tribe.actions;

export default tribe.reducer;
