import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addUnFollowUserId,
  addUnFollowUserIds,
  removeUnFollowUserId,
  removeUnFollowUserIds,
  
  addBlockUserId,
  addBlockUserIds,
  removeBlockUserId,
  removeBlockUserIds,
} from './actions';
import { Api } from 'apis';
import uniqBy from 'lodash/uniqBy';
import { stat } from 'fs';
import { MapModuleState } from 'store/types';

const initialState: MapModuleState = {
  postMap: {},
  userMap: {},
  postStatusMap: {},
  userStatusMap: {},
  unFollowUsersIds: [],
  blockUsersIds: [],
  status: []
};


export const fetchPostDetailAsync =
  (id: string | number) => async (dispatch, getState) => {
    try {
      const detailRes = await Api.HomeApi.articleFindById({
        id: `${id}`,
      });
      if (Api.isSuccess(detailRes)) {
        dispatch(
          setPostDetail({
            id,
            post: detailRes.data,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

export const fetchUserInfoAsync =
  (id: string | number) => async (dispatch, getState) => {
    try {
      const res = await Api.UserApi.getUserInfoByUID(id);
      if (Api.isSuccess(res)) {
        dispatch(
          setPostDetail({
            id,
            userInfo: res.data,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };


export const Post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostDetail: (state, { payload }) => {
      const { id, post } = payload;
      state.postMap = {
        ...state.postMap,
        [id]: {
          ...post,
        },
      };
    },
    setUserInfo: (state, { payload }) => {
      const { id, userInfo } = payload;
      state.userMap = {
        ...state.userMap,
        [id]: {
          ...userInfo,
        },
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addUnFollowUserId, (state, { payload }) => {
        if (!state.unFollowUsersIds.includes(payload)) {
          state.unFollowUsersIds = [...state.unFollowUsersIds, payload]
        }
      })
      .addCase(addUnFollowUserIds, (state, { payload }) => {
        // XXX: 未做去重处理
        state.unFollowUsersIds = [...state.unFollowUsersIds, ...payload]
      })
      .addCase(removeUnFollowUserId, (state, { payload }) => {
        state.unFollowUsersIds = state.unFollowUsersIds.filter(item => item !== payload)
      })
      .addCase(removeUnFollowUserIds, (state, { payload }) => {
        state.unFollowUsersIds = state.unFollowUsersIds.filter(item => !payload.includes(item))
      })
      .addCase(addBlockUserId, (state, { payload }) => {
        if (!state.blockUsersIds.includes(payload)) {
          state.blockUsersIds = [...state.blockUsersIds, payload]
        }
      })
      .addCase(addBlockUserIds, (state, { payload }) => {
        // XXX: 未做去重处理
        state.blockUsersIds = [...state.blockUsersIds, ...payload]
      })
      .addCase(removeBlockUserId, (state, { payload }) => {
        state.blockUsersIds = state.blockUsersIds.filter(item => item !== payload)
      })
      .addCase(removeBlockUserIds, (state, { payload }) => {
        state.blockUsersIds = state.blockUsersIds.filter(item => !payload.includes(item))
      })
  },
});

export const { setPostDetail } = Post.actions;

export default Post.reducer;
