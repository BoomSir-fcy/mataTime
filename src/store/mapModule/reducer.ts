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

  addDeletePostId,
  addTranslateIds,
  removeTranslateIds,
} from './actions';
import { Api } from 'apis';
import uniqBy from 'lodash/uniqBy';
import { stat } from 'fs';
import { MapModuleState } from 'store/types';
import { FetchStatus } from 'config/types';
import { getLanguageCodeFromLS } from 'contexts/Localization/helpers';
import { EN } from 'config/localization';
import checkTranslateIds from 'utils/checkTranslateIds';

const initialState: MapModuleState = {
  postMap: {},
  userMap: {},
  postStatusMap: {},
  userStatusMap: {},
  postTranslateMap: {},
  needTranslatePostIds: [],
  unFollowUsersIds: [],
  blockUsersIds: [],
  deletePostIds: [],
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
        const ids = checkTranslateIds([detailRes.data])
        dispatch(addTranslateIds(ids))
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
          setUserInfo({
            id,
            userInfo: res.data,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

export const fetchAllPostTranslateAsync = () => (dispatch, getState) => {
  const { mapModule: { postTranslateMap } } = getState() as { mapModule: MapModuleState }
  const noFetchIds: number[] = []
  Object.keys(postTranslateMap).forEach(key => {
    if (postTranslateMap[key].status === FetchStatus.NOT_FETCHED) {
      noFetchIds.push(Number(key))
    }
  })
  // 最大价值20条数据
  if (noFetchIds.length && noFetchIds.length < 20) {
    dispatch(fetchPostTranslateAsync(noFetchIds))
  }
}

export const fetchPostTranslateAsync =
  (ids: number[]) => async (dispatch, getState) => {
    dispatch(setPostTranslate({ ids, data: {}, status: FetchStatus.LOADING, showTranslate: true  }))
    try {
      const res = await Api.HomeApi.getPostTranslateById({
        pids: ids,
        target: getLanguageCodeFromLS() === EN.locale ? 'en' : 'zh-TW', // TODO: 后面语言增加需要更改
        source: '',
      });
      if (Api.isSuccess(res)) {
        dispatch(
          setPostTranslate({
            ids,
            data: res.data,
            status: FetchStatus.SUCCESS
          }),
        );
      } else {
        dispatch(
          setPostTranslate({
            ids,
            data: {},
            status: FetchStatus.FAILED
          }),
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setPostTranslate({
          ids,
          data: {},
          status: FetchStatus.FAILED
        }),
      );
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
    setPostTranslate: (state, { payload }) => {
      const { ids, data, ...info } = payload;
      const datas = {}
      ids.forEach(id => {
        datas[id] = {
          ...state.postTranslateMap[id],
          content: data[id],
          ...info,
        }
      })
      state.postTranslateMap = {
        ...state.postTranslateMap,
        ...datas,
      };
    },
    changePostTranslateState: (state, { payload }) => {
      const { id, showTranslate } = payload
      state.postTranslateMap = {
        ...state.postTranslateMap,
        [id]: {
          ...state.postTranslateMap[id],
          showTranslate, // 是否显示翻译
        }
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
      .addCase(addDeletePostId, (state, { payload }) => {
        state.deletePostIds = [...state.deletePostIds, payload]
      })
      .addCase(addTranslateIds, (state, { payload }) => {
        state.needTranslatePostIds = [...state.needTranslatePostIds, ...payload]
      })
      .addCase(removeTranslateIds, (state, { payload }) => {
        state.needTranslatePostIds = state.needTranslatePostIds.filter(item => !payload.includes(item))
      })
  },
});

export const { setPostDetail, setUserInfo, setPostTranslate, changePostTranslateState } = Post.actions;

export default Post.reducer;
