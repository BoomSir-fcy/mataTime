import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NftInfo, TribeBaseInfo, TribeState, MemberNft } from './type';
import {
  getFeeTokenList,
  getTicketNftTokenList,
  getTribeBaseInfo,
  getBasicFee,
  getTokenTribeApprove,
} from './fetchTribe';
import { getNftsList } from 'apis/DsgRequest';
import { Api } from 'apis';
import uniqBy from 'lodash/uniqBy';
import { getIsApproveStakeNft } from './fetchStakeNFT';
import {
  saveTribeBaseInfo,
  setInitMemberNft,
  updateTribeDetails,
  setJoinTribeVisibleModal,
} from './actions';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import checkTranslateIds from 'utils/checkTranslateIds';
import { addTranslateIds } from 'store/mapModule/actions';

const LOCAL_STORAGE_TRIBE_INFO = 'info';

const tribeStore = sessionStorage.getItem(LOCAL_STORAGE_TRIBE_INFO);

const initialState: TribeState = {
  isApproveStakeNft: false,
  tribeBaseInfo: tribeStore ? JSON.parse(tribeStore) : {},
  feeCoinList: [],
  ticketNftList: [],
  loading: true,
  activeNftInfo: {
    nftId: tribeStore ? JSON.parse(tribeStore)?.nftid : '',
    nftToken: tribeStore ? JSON.parse(tribeStore)?.nftAddress : '',
  },
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
      owner_address: '',
      nick_name: '',
      nft_image: '',
      create_time: 0,
      nft_id: null,
    },
    topics: [],
    status: 0,
    tribe_id: null,
    selected_count: '',
    post_count: '',
    member_count: '',
    detail: null,
    baseInfo: null,
    nftInfo: null,
    member_nft: {} as MemberNft,
  },
  postList: {
    list: [],
    lastList: [],
    page: 1,
    selected: 0,
    top: 0,
    newest_sort: 0,
    tophot_sort: 0,
    addListNum: -1,
    loading: false,
    isEnd: false,
    userTags: [],
    start: 0,
  },
  tribeDetails: {
    charge: '0',
    create_time: 0,
    name: '',
    nick_name: '',
    reward_author: 0,
    reward_master: 0,
    reward_member: 0,
    spend_max_time: 0,
    spend_time: 0,
    summary: '',
    symbol: '',
    timing_method: 0,
    tribe_id: 0,
    type: 0,
    valid_time: 0,
    nft_image: '',
    nft_id: 0,
    expire_time: 0,
    memberNft: {} as MemberNft,
  },
  joinTribe: {
    loading: false,
    joinVisible: false,
    approveLimit: 0,
    basicServiceCharge: 0,
  },
};

export const fetchIsApproveStakeNft = createAsyncThunk<any, any>(
  'tribe/fetchIsApproveStakeNft',
  async ({ account }, { dispatch }) => {
    const isApprove = await getIsApproveStakeNft(account);
    return isApprove;
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
  async ({ page = 1, page_size = 10, tab = 1 }) => {
    const list = await Api.TribeApi.tribeList({ page, page_size, tab });
    return list.data;
  },
);

export const fetchTribeInfoAsync = createAsyncThunk<any, any>(
  'tribe/fetchTribeInfoAsync',
  async ({ tribe_id }) => {
    const list = await Api.TribeApi.tribeInfo({ tribe_id });
    return {
      ...list.data,
      tribe_id,
    };
  },
);

export const fetchTribeDetailAsync = createAsyncThunk<any, any>(
  'tribe/fetchTribeDetailAsync',
  async ({ tribe_id }) => {
    const [detail, memberNft] = await Promise.all([
      Api.TribeApi.tribeDetail({ tribe_id }),
      Api.TribeApi.tribeMemberNftDetail({ tribe_id }),
    ]);

    return {
      ...detail.data,
      memberNft: memberNft.data,
      tribe_id,
    };
  },
);

export const fetchTribePostAsync = createAsyncThunk(
  'tribe/fetchTribePostAsync',
  async (params: Api.Tribe.tribePostListParams, { dispatch }) => {
    if (params.page === 1) dispatch(setResetData([]));
    dispatch(setLoading(true));
    const response = await Api.TribeApi.tribePostList({
      ...params,
    });

    if (Api.isSuccess(response)) {
      const { postIds } = checkTranslateIds(response.data.List || []);
      dispatch(addTranslateIds(postIds));
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

export const fetchTribeSearchPostAsync = createAsyncThunk(
  'tribe/fetchTribeSearchPostAsync',
  async (params: Api.Tribe.tribeSearchParams, { dispatch }) => {
    if (params.start === 0) dispatch(setResetData([]));
    dispatch(setLoading(true));
    const { type: SearchType, ...param } = params;
    const response = await Api.TribeApi[
      Number(SearchType) === 0 ? 'tribeSearchPostList' : 'tribeSearchUserList'
    ]({
      ...param,
    });
    if (Api.isSuccess(response)) {
      return {
        list: response.data.data,
        start: param.start,
        next: response.data.start,
        limit: param.limit,
      };
    }
    return {};
  },
);

// 查询加入basic类型部落的matter手续费
export const fetchTribeJoinBasicServiceAsync = createAsyncThunk(
  'tribe/fetchTribeJoinBasicService',
  async (parmas, { dispatch }) => {
    dispatch(setJoinLoading(true));
    const info = await getBasicFee();
    dispatch(setJoinBasicServiceCharge(info.toString()));
  },
);

export const fetchisApprove = createAsyncThunk(
  'tribe/fetchTisApprove',
  async (params: { account: string; address: string }, { dispatch }) => {
    if (params.address === '0x0000000000000000000000000000000000000001') {
      dispatch(setTokenIsApprove(1));
      return;
    }
    const isApprove = await getTokenTribeApprove(
      params.account,
      params.address,
    );
    dispatch(setTokenIsApprove(isApprove));
  },
);

export const tribe = createSlice({
  name: 'tribe',
  initialState,
  reducers: {
    setResetData: (state, { payload }) => {
      state.postList.list = payload;
    },
    setActiveNftInfo: (state, { payload }) => {
      state.activeNftInfo = payload;
    },
    setLoading: (state, { payload }) => {
      state.postList.loading = payload;
    },
    setIsEnd: (state, { payload }) => {
      state.postList.isEnd = payload;
    },
    setJoinLoading: (state, { payload }) => {
      state.joinTribe.loading = payload;
    },
    setJoinBasicServiceCharge: (state, { payload }) => {
      state.joinTribe.basicServiceCharge = payload;
      state.joinTribe.loading = false;
    },
    setTokenIsApprove: (state, { payload }) => {
      state.joinTribe.approveLimit = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(saveTribeBaseInfo, (state, action) => {
        state.tribeBaseInfo = action.payload
          ? Object.assign({}, state.tribeBaseInfo, action.payload)
          : {};

        sessionStorage.setItem(
          LOCAL_STORAGE_TRIBE_INFO,
          JSON.stringify(state.tribeBaseInfo),
        );
      })
      .addCase(fetchIsApproveStakeNft.fulfilled, (state, action) => {
        state.isApproveStakeNft = action.payload;
      })
      .addCase(fetchFeeTokenListAsync.fulfilled, (state, action) => {
        state.feeCoinList = action.payload;
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
      .addCase(fetchTribeDetailAsync.fulfilled, (state, action) => {
        state.tribeDetails = action.payload;
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
      })
      .addCase(fetchTribeSearchPostAsync.fulfilled, (state, action) => {
        const { list, start, limit, next } = action.payload;
        let articleList = list ?? [];
        const { length } = state.postList.list;
        if (start === 0) {
          state.postList.list = articleList;
          state.postList.addListNum = -1;
        } else {
          const list = state.postList.list.concat(articleList);
          state.postList.list = uniqBy(list, 'id');
          state.postList.addListNum = state.postList.list.length - length;
        }
        state.postList.lastList =
          articleList.length >= limit || start > limit ? articleList : [];

        state.postList.start = articleList.length >= limit ? next : start;
        state.postList.loading = false;
      })
      .addCase(setJoinTribeVisibleModal, (state, { payload }) => {
        state.joinTribe.joinVisible = payload;
      });
  },
});

// Actions
export const {
  setActiveNftInfo,
  setLoading,
  setIsEnd,
  setJoinLoading,
  setJoinBasicServiceCharge,
  setTokenIsApprove,
  setResetData,
} = tribe.actions;

export default tribe.reducer;
