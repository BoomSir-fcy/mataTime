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
  addCommentTranslateIds,
  removeCommentTranslateIds,
  addMuteUserId,
  removeMuteUserId,
  clearMuteUserId,
} from './actions';
import { Api } from 'apis';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
import { stat } from 'fs';
import { MapModuleState } from 'store/types';
import { FetchStatus } from 'config/types';
import { getLanguageCodeFromLS } from 'contexts/Localization/helpers';
import { EN } from 'config/localization';
import checkTranslateIds from 'utils/checkTranslateIds';
import { getTribeBaseInfoData } from 'store/tribe/fetchTribe';

const initialState: MapModuleState = {
  postMap: {},
  userMap: {},
  tribePostMap: {},
  tribeInfoMap: {},
  postStatusMap: {},
  userStatusMap: {},
  postTranslateMap: {},
  commentTranslateMap: {},
  needTranslatePostIds: [],
  needTranslateCommentIds: [],
  unFollowUsersIds: [],
  blockUsersIds: [],
  deletePostIds: [],
  status: [],
  muteUsersIds: [],
  unMuteId: null,
};

export const fetchPostDetailAsync =
  (id: string | number) => async (dispatch, getState) => {
    try {
      const detailRes = await Api.HomeApi.articleV2FindById({
        id: `${id}`,
      });
      if (Api.isSuccess(detailRes)) {
        dispatch(
          setPostDetail({
            id,
            post: detailRes.data,
          }),
        );
        const { postIds, commentIds } = checkTranslateIds([detailRes.data]);
        dispatch(addTranslateIds(postIds));
        dispatch(addCommentTranslateIds(commentIds));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const fetchTribeBaseInfoDataAsync =
  (tribe_id: number) => async (dispatch, getState) => {
    try {
      const { nftInfo, baseInfo } = await getTribeBaseInfoData(tribe_id);
      dispatch(
        setTribeInfo({
          nftInfo,
          baseInfo,
          tribe_id,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

export const fetchTribeInfoAsync =
  (tribe_id: number) => async (dispatch, getState) => {
    try {
      dispatch(fetchTribeBaseInfoDataAsync(tribe_id));
      const [info, detail] = await Promise.all([
        Api.TribeApi.tribeInfo({ tribe_id }),
        Api.TribeApi.tribeDetail({ tribe_id }),
      ]);
      // const data = await Api.TribeApi.tribeInfo({ tribe_id });

      if (Api.isSuccess(info)) {
        dispatch(
          setTribeInfo({
            tribe_id,
            info: info.data,
          }),
        );
      }
      if (Api.isSuccess(detail)) {
        dispatch(
          setTribeInfo({
            tribe_id,
            detail: detail.data,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

export const fetchTribePostDetailAsync =
  (id: number) => async (dispatch, getState) => {
    try {
      const detailRes = await Api.TribeApi.getTribePostInfo({
        id,
      });
      if (Api.isSuccess(detailRes)) {
        dispatch(
          setTribePostDetail({
            id,
            post: detailRes.data,
          }),
        );
        // const ids = checkTranslateIds([detailRes.data])
        // dispatch(addTranslateIds(ids))
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
  const {
    mapModule: { postTranslateMap },
  } = getState() as { mapModule: MapModuleState };
  const noFetchIds: number[] = [];
  Object.keys(postTranslateMap).forEach(key => {
    if (postTranslateMap[key].status === FetchStatus.NOT_FETCHED) {
      noFetchIds.push(Number(key));
    }
  });
  // 最大价值20条数据
  if (noFetchIds.length && noFetchIds.length < 20) {
    dispatch(fetchPostTranslateAsync(noFetchIds));
  }
};

export const fetchAllCommentTranslateAsync = () => (dispatch, getState) => {
  const {
    mapModule: { commentTranslateMap },
  } = getState() as { mapModule: MapModuleState };
  const noFetchIds: number[] = [];
  Object.keys(commentTranslateMap).forEach(key => {
    if (commentTranslateMap[key].status === FetchStatus.NOT_FETCHED) {
      noFetchIds.push(Number(key));
    }
  });
  // 最大价值20条数据
  if (noFetchIds.length && noFetchIds.length < 20) {
    dispatch(fetchPostTranslateAsync(noFetchIds));
  }
};

export const fetchTranslateAsync = async (ids: number[], type = 'post') => {
  if (ids.length) {
    let res = null;
    try {
      if (type === 'post') {
        res = await Api.HomeApi.getPostTranslateById({
          pids: ids,
          target: getLanguageCodeFromLS() === EN.locale ? 'en' : 'zh-TW', // TODO: 后面语言增加需要更改
          source: '',
        });
      } else {
        res = await Api.HomeApi.getCommentTranslateById({
          pids: ids,
          target: getLanguageCodeFromLS() === EN.locale ? 'en' : 'zh-TW', // TODO: 后面语言增加需要更改
          source: '',
        });
      }

      if (Api.isSuccess(res)) {
        return {
          ids,
          data: res.data,
          status: FetchStatus.SUCCESS,
        };
      }
      return {
        ids,
        data: {},
        status: FetchStatus.FAILED,
      };
    } catch (error) {
      return {
        ids,
        data: {},
        status: FetchStatus.FAILED,
      };
    }
  }
};
export const fetchPostTranslateAsync =
  (ids: number[]) => async (dispatch, getState) => {
    dispatch(
      setPostTranslate({
        ids,
        data: {},
        status: FetchStatus.LOADING,
        showTranslate: true,
      }),
    );
    const res = await fetchTranslateAsync(ids);
    dispatch(setPostTranslate(res));
  };

export const fetchCommentTranslateAsync =
  (ids: number[]) => async (dispatch, getState) => {
    dispatch(
      setCommentTranslate({
        ids,
        data: {},
        status: FetchStatus.LOADING,
        showTranslate: true,
      }),
    );
    const res = await fetchTranslateAsync(ids, 'comment');
    dispatch(setCommentTranslate(res));
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
    setTribePostDetail: (state, { payload }) => {
      const { id, post } = payload;
      state.tribePostMap = {
        ...state.tribePostMap,
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
    setTribeInfo: (state, { payload }) => {
      const { tribe_id, info, detail, nftInfo, baseInfo } = payload;
      state.tribeInfoMap = {
        ...state.tribeInfoMap,
        [tribe_id]: {
          ...state.tribeInfoMap[tribe_id],
          ...info,
          detail: {
            ...state.tribeInfoMap[tribe_id]?.detail,
            ...detail,
          },
          nftInfo: {
            ...state.tribeInfoMap[tribe_id]?.nftInfo,
            ...nftInfo,
          },
          baseInfo: {
            ...state.tribeInfoMap[tribe_id]?.baseInfo,
            ...baseInfo,
          },
          tribe_id,
        },
      };
    },
    setPostTranslate: (state, { payload }) => {
      const { ids, data, ...info } = payload;
      const datas = {};
      ids.forEach(id => {
        datas[id] = {
          ...state.postTranslateMap[id],
          content: data[id],
          ...info,
        };
      });
      state.postTranslateMap = {
        ...state.postTranslateMap,
        ...datas,
      };
    },
    changePostTranslateState: (state, { payload }) => {
      const { id, showTranslate } = payload;
      state.postTranslateMap = {
        ...state.postTranslateMap,
        [id]: {
          ...state.postTranslateMap[id],
          showTranslate, // 是否显示翻译
        },
      };
    },
    setCommentTranslate: (state, { payload }) => {
      const { ids, data, ...info } = payload;
      const datas = {};
      ids.forEach(id => {
        datas[id] = {
          ...state.commentTranslateMap[id],
          content: data[id],
          ...info,
        };
      });
      state.commentTranslateMap = {
        ...state.commentTranslateMap,
        ...datas,
      };
    },
    changeCommentTranslateState: (state, { payload }) => {
      const { id, showTranslate } = payload;
      state.commentTranslateMap = {
        ...state.commentTranslateMap,
        [id]: {
          ...state.commentTranslateMap[id],
          showTranslate, // 是否显示翻译
        },
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addUnFollowUserId, (state, { payload }) => {
        if (!state.unFollowUsersIds.includes(payload)) {
          state.unFollowUsersIds = uniq([...state.unFollowUsersIds, payload]);
        }
      })
      .addCase(addUnFollowUserIds, (state, { payload }) => {
        state.unFollowUsersIds = uniq([...state.unFollowUsersIds, ...payload]);
      })
      .addCase(removeUnFollowUserId, (state, { payload }) => {
        state.unFollowUsersIds = state.unFollowUsersIds.filter(
          item => item !== payload,
        );
      })
      .addCase(removeUnFollowUserIds, (state, { payload }) => {
        state.unFollowUsersIds = state.unFollowUsersIds.filter(
          item => !payload.includes(item),
        );
      })
      .addCase(addBlockUserId, (state, { payload }) => {
        if (!state.blockUsersIds.includes(payload)) {
          state.blockUsersIds = [...state.blockUsersIds, payload];
        }
      })
      .addCase(addBlockUserIds, (state, { payload }) => {
        state.blockUsersIds = uniq([...state.blockUsersIds, ...payload]);
      })
      .addCase(removeBlockUserId, (state, { payload }) => {
        state.blockUsersIds = state.blockUsersIds.filter(
          item => item !== payload,
        );
      })
      .addCase(removeBlockUserIds, (state, { payload }) => {
        state.blockUsersIds = state.blockUsersIds.filter(
          item => !payload.includes(item),
        );
      })
      .addCase(addDeletePostId, (state, { payload }) => {
        state.deletePostIds = uniq([...state.deletePostIds, payload]);
      })
      .addCase(addTranslateIds, (state, { payload }) => {
        state.needTranslatePostIds = uniq([
          ...state.needTranslatePostIds,
          ...payload,
        ]);
      })
      .addCase(removeTranslateIds, (state, { payload }) => {
        state.needTranslatePostIds = state.needTranslatePostIds.filter(
          item => !payload.includes(item),
        );
      })
      .addCase(addCommentTranslateIds, (state, { payload }) => {
        state.needTranslateCommentIds = uniq([
          ...state.needTranslateCommentIds,
          ...payload,
        ]);
      })
      .addCase(removeCommentTranslateIds, (state, { payload }) => {
        state.needTranslateCommentIds = state.needTranslateCommentIds.filter(
          item => !payload.includes(item),
        );
      })
      .addCase(addMuteUserId, (state, { payload }) => {
        if (!state.muteUsersIds.includes(payload)) {
          state.muteUsersIds = [...state.muteUsersIds, payload];
        }
      })
      .addCase(clearMuteUserId, state => {
        state.muteUsersIds = [];
      })
      .addCase(removeMuteUserId, (state, { payload }) => {
        state.unMuteId = payload;
        state.muteUsersIds = state.muteUsersIds.filter(
          item => item !== payload,
        );
      });
  },
});

// export const { setPostDetail, setUserInfo, setPostTranslate, changePostTranslateState, setCommentTranslate, changeCommentTranslateState, setTribePostDetail } = Post.actions;
export const {
  setPostDetail,
  setUserInfo,
  setTribeInfo,
  setPostTranslate,
  changePostTranslateState,
  setCommentTranslate,
  changeCommentTranslateState,
  setTribePostDetail,
} = Post.actions;

export default Post.reducer;
