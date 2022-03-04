import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NftInfo, TribeBaseInfo, TribeState } from './type';
import {
  getFeeTokenList,
  getTicketNftTokenList,
  getTribeBaseInfo,
  getTribeNftInfo,
  getBasicFee,
  getTokenTribeApprove,
} from './fetchTribe';
import { getNftsList } from 'apis/DsgRequest';
import { Api } from 'apis';
import uniqBy from 'lodash/uniqBy';
import { getIsApproveStakeNft } from './fetchStakeNFT';
import { setInitMemberNft, updateTribeDetails } from './actions';

import { MemberNft } from './type';

const initialState: TribeState = {
  isApproveStakeNft: false,
  tribeBaseInfo: {
    name: '',
    logo: '',
    introduction: '',
    feeToken: '',
    feeAmount: '',
    validDate: null,
    perTime: null,
    ownerPercent: null,
    authorPercent: null,
    memberPercent: null,
    nftAddress: '',
    nftid: null,
    memberNFTImage: '',
    memberNFTIntroduction: '',
    memberNFTName: '',
  },
  tribesNftInfo: {
    claimOnwerNFT: false,
    ownerNFTName: '',
    ownerNFTIntroduction: '',
    ownerNFTImage: '',
    memberNFTName: '',
    memberNFTIntroduction: '',
    memberNFTImage: '',
    initMemberNFT: true,
    create_time: 0,
    nick_name: '',
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
    top: 1,
    newest_sort: 0,
    tophot_sort: 0,
    addListNum: -1,
    loading: false,
    isEnd: false,
    userTags: [],
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

export const fetchGetTribeBaseInfo = createAsyncThunk<any, any>(
  'tribe/fetchGetTribeBaseInfo',
  async ({ tribeId }, { dispatch }) => {
    const info = await getTribeBaseInfo(tribeId);
    dispatch(setTribeBaseInfo(info));
  },
);

export const fetchTribeNftInfo = createAsyncThunk<any, { tribeId: number }>(
  'tribe/fetchTribeNftInfo',
  async ({ tribeId }, { dispatch }) => {
    const [extraTribeInfo, detail] = await Promise.all([
      getTribeNftInfo(tribeId),
      Api.TribeApi.tribeMemberNftDetail({
        tribe_id: tribeId,
      }),
    ]);
    const nftInfo = {
      claimOnwerNFT: extraTribeInfo.claimOnwerNFT,
      initMemberNFT: extraTribeInfo.initMemberNFT,
      ownerNFTName: detail.data.owner_nft_name,
      ownerNFTIntroduction: detail.data.owner_nft_introduction,
      ownerNFTImage: detail.data.owner_nft_image,
      memberNFTName: detail.data.member_nft_name,
      memberNFTIntroduction: detail.data.member_nft_introduction,
      memberNFTImage: detail.data.member_nft_image,
      create_time: detail.data.create_time,
      nick_name: detail.data.nick_name,
    };
    dispatch(setTribeNftInfo(nftInfo));
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
    setTribeBaseInfo: (state, { payload }) => {
      state.tribeBaseInfo = payload;
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
      .addCase(setInitMemberNft, (state, action) => {
        state.tribesNftInfo.initMemberNFT = action.payload;
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
      .addCase(updateTribeDetails, (state, { payload }) => {
        state.tribeInfo = payload;
      });
  },
});

// Actions
export const {
  setActiveNftInfo,
  setTribeNftInfo,
  setTribeBaseInfo,
  setLoading,
  setIsEnd,
  setJoinLoading,
  setJoinBasicServiceCharge,
  setTokenIsApprove,
} = tribe.actions;

export default tribe.reducer;
