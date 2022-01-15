import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from 'apis';
import uniqBy from 'lodash/uniqBy';
import { RedirectToSwap } from 'libs/mini-swap/Swap/redirects';
import { SearchUserInfo, SearchTopicInfo, SearchState } from './types';
import {
  setSearchDisplayPeople,
  setSearchDisplayTopic,
  updatePeopleState,
  addSearchHistoryData,
  changeSearchUserFilter,
  removeSearchHistoryData,
  clearSearchHistoryData,
} from './actions';
import { MAX_SPEND_TIME_PAGE_TATOL, SEARCH_MAX_HISTORY_LEN } from 'config';
import { orderBy } from 'lodash';
import { useAppDispatch } from 'libs/mini-swap/state';

const LOCAL_STORAGE_SEARCH_HISTORY_KEY = 'search_history_list';

const historyListStore = localStorage.getItem(LOCAL_STORAGE_SEARCH_HISTORY_KEY);

const initialState: SearchState = {
  resultListOfPeoples: [],
  resultListOfTopic: [],
  resultListOfPost: [],
  resultListOfPostLen: 0,
  loading: false,
  dispalyLoading: false,
  postLoading: false,
  postIsEnd: false,
  seart_index: 0,
  searchPostaddListNum: -1,
  errorMsg: '',
  searchVal: '',
  historyList: historyListStore ? JSON.parse(historyListStore) : [],
  placeHolderSearch: '',
  displayResultListOfPeoples: [],
  displayResultListOfTopic: [],
  displayResultListOfPost: [],
  filterUser: 1,
  searchPostMap: {},
};

export const fetchSearchPeopleAsync = createAsyncThunk(
  'fetch/fetchSearchPeople',
  async (name: string, { dispatch }) => {
    if (!name) {
      return {
        list: [],
      };
    }
    dispatch(setErrorMsg(''));
    dispatch(setLoading(true));
    const response = await Api.UserApi.searchUser(name);
    dispatch(setLoading(false));
    if (Api.isSuccess(response)) {
      return {
        list: response.data,
      };
    }
    return {
      list: [],
    };
  },
);

export const fetchSearchAsync = createAsyncThunk<
  any,
  {
    search: string;
    fetchDisplay?: boolean;
  }
>(
  'fetch/fetchSearchAsync',
  async ({ search, fetchDisplay }, { dispatch, getState }) => {
    const result = {
      fetchDisplay,
      resultListOfPeoples: [],
      resultListOfTopic: [],
      resultListOfPost: [],
      resultListOfPostLen: 0,
    };
    if (!search || !`${search}`.trim()) {
      return result;
    }
    if (search === '#' || search === '@') {
      return result;
    }
    let disablePeople = false;
    let disableTopic = false;
    let disableTotal = false;
    let searchVal = search;
    if (search?.[0] === '#') {
      disablePeople = true;
      disableTotal = true;
      searchVal = searchVal.slice(1);
    } else if (search?.[0] === '@') {
      disableTopic = true;
      disableTotal = true;
      searchVal = searchVal.slice(1);
    } else {
      disableTopic = true;
      disablePeople = true;
    }
    // let disablePost = true;
    // if (searchPost) {
    //   disablePost = false;
    // }

    dispatch(setErrorMsg(''));
    dispatch(setSearchVal(search));
    if (fetchDisplay) {
      dispatch(setDispalyLoading(true));
    }
    dispatch(setLoading(true));
    const fetchTopic = Api.HomeApi.queryHotTopicList({
      topic_name: searchVal,
      per_page: 20,
      page: 1,
    });
    const fetchPeople = Api.UserApi.searchUser(searchVal);
    const fetchTotal = Api.SearchApi.getSearchTotal(searchVal);
    // const fetchPost = Api.SearchApi.getSearchPost(search)

    const [responseTopic, responsePeople, responseTotal] = await Promise.all([
      disableTopic ? null : fetchTopic,
      disablePeople ? null : fetchPeople,
      disableTotal ? null : fetchTotal,
      // disablePost ? null : fetchPost,
    ]);
    dispatch(setLoading(false));
    dispatch(setDispalyLoading(false));
    if (Api.isSuccess(responseTopic)) {
      result.resultListOfTopic = responseTopic.data?.List || [];
    }
    if (Api.isSuccess(responsePeople)) {
      // 只显示50条用户 太多了有点卡
      const peopleList = (responsePeople.data || []).slice(0, 50);
      result.resultListOfPeoples = orderBy(peopleList, item =>
        item.is_attention ? 0 : 1,
      );
    }
    if (Api.isSuccess(responseTotal)) {
      result.resultListOfTopic = responseTotal.data?.Topic?.List || [];
      // 只显示50条用户 太多了有点卡
      const peopleList = (responseTotal.data?.Users || []).slice(0, 50);
      result.resultListOfPeoples = orderBy(peopleList, item =>
        item.is_attention ? 0 : 1,
      );
      result.resultListOfPostLen = responseTotal.data?.post_number || 0;
    }
    // if (Api.isSuccess(responsePost)){
    //   console.log(responsePost)
    //   result.resultListOfPost = responsePost.data || []
    // }
    return result;
  },
);

export const fetchSearchPostAsync =
  (refresh?: boolean) => async (dispatch, getState) => {
    dispatch(setPostLoading(true));
    const result = {
      refresh,
      fetchDisplay: true,
      resultListOfPost: [],
      seart_index: 0,
    };

    const { search } = getState() as { search: SearchState };
    if (!search.searchVal) return;
    try {
      // console.log({
      //   key: search.searchVal,
      //   start: refresh ? 0 : search.seart_index || 0,
      //   limit: MAX_SPEND_TIME_PAGE_TATOL,
      // });
      const fetchPost = await Api.SearchApi.getSearchPost({
        key: search.searchVal,
        start: refresh ? 0 : search.seart_index || 0,
        limit: MAX_SPEND_TIME_PAGE_TATOL,
      });
      if (Api.isSuccess(fetchPost)) {
        // console.log(fetchPost);
        if (!Boolean(fetchPost.data?.data)) {
          dispatch(setPostEnd(true));
        } else {
          dispatch(setPostEnd(false));
        }
        result.resultListOfPost = fetchPost.data?.data || [];
        result.seart_index = fetchPost.data?.start;
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(setPostLoading(false));
    dispatch(setSearchPost(result));
  };

export const fetchSearchPostDetailAsync =
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

// export const fetchSearchPostAsync = async ((refresh?: boolean), { dispatch, getState }) => {
//   dispatch(setPostLoading(true))

//   const result = {
//     fetchDisplay: true,
//     resultListOfPost: [],
//     seart_index: 0,
//   }

//   const { search } = getState() as { search: SearchState }
//   try {
//     const fetchPost = await Api.SearchApi.getSearchPost({
//       key: search.searchVal,
//       start: refresh ? 0 : search.seart_index,
//       limit: MAX_SPEND_TIME_PAGE_TATOL,
//     })
//     if (Api.isSuccess(fetchPost)){
//       console.log(fetchPost)
//       result.resultListOfPost = fetchPost.data?.data || []
//       result.seart_index = fetchPost.data?.seart_index
//     }
//   } catch (error) {
//     console.error(error)
//   }
//   dispatch(setPostLoading(false))
//   dispatch(setSearchPost(result))

// }

export const Search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setDispalyLoading: (state, { payload }) => {
      state.dispalyLoading = payload;
    },
    setPostLoading: (state, { payload }) => {
      state.postLoading = payload;
    },
    setPostEnd: (state, { payload }) => {
      state.postIsEnd = payload;
    },
    setSearchVal: (state, { payload }) => {
      state.searchVal = payload;
    },
    setErrorMsg: (state, { payload }) => {
      state.errorMsg = payload;
    },
    setPostDetail: (state, { payload }) => {
      const { id, post } = payload;
      state.searchPostMap = {
        ...state.searchPostMap,
        [id]: {
          ...post,
        },
      };
    },
    setSearchPost: (state, action) => {
      const { resultListOfPost, fetchDisplay, seart_index, refresh } =
        action.payload;
      // state.resultListOfPost = resultListOfPost
      // console.log(seart_index, 'seart_index')
      state.seart_index = seart_index;
      // if (fetchDisplay) {
      //   state.displayResultListOfPost = resultListOfPost
      // }
      resultListOfPost.forEach(item => {
        state.searchPostMap = {
          ...state.searchPostMap,
          [item.id]: {
            ...item,
          },
        };
      });
      if (refresh) {
        state.resultListOfPost = resultListOfPost;
        state.searchPostaddListNum = -1;
      } else {
        const list = state.resultListOfPost.concat(resultListOfPost);
        const length = resultListOfPost.length;
        state.resultListOfPost = uniqBy(list, 'id');
        state.searchPostaddListNum = state.resultListOfPost.length - length;
      }

      // console.log(state.resultListOfPost, 'state.resultListOfPost');
      // state.lastList =
      //   articleList.length >= per_page || page > 1 ? articleList : [];
      // state.page = articleList.length >= per_page ? page + 1 : page;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchPeopleAsync.fulfilled, (state, action) => {
        const { list } = action.payload;
        state.resultListOfPeoples = list || [];
      })
      .addCase(fetchSearchPeopleAsync.rejected, (state, action) => {
        // const { error } = action
        state.resultListOfPeoples = [];
        state.errorMsg = 'error';
      })
      .addCase(fetchSearchAsync.fulfilled, (state, action) => {
        const {
          resultListOfPeoples,
          resultListOfTopic,
          resultListOfPostLen,
          fetchDisplay,
        } = action.payload;
        state.resultListOfPeoples = resultListOfPeoples;
        state.resultListOfTopic = resultListOfTopic;
        // state.resultListOfPost = resultListOfPost
        state.resultListOfPostLen = resultListOfPostLen;
        if (fetchDisplay) {
          state.displayResultListOfPeoples = resultListOfPeoples;
          state.displayResultListOfTopic = resultListOfTopic;
          // state.displayResultListOfPost = resultListOfPost
        }
      })
      .addCase(fetchSearchAsync.rejected, (state, action) => {
        state.resultListOfPeoples = [];
        state.resultListOfTopic = [];
        state.errorMsg = 'error';
      })
      .addCase(setSearchDisplayPeople, (state, action) => {
        const { list } = action.payload;
        state.displayResultListOfPeoples = list;
      })
      .addCase(setSearchDisplayTopic, (state, action) => {
        const { list } = action.payload;
        state.displayResultListOfTopic = list;
      })
      .addCase(updatePeopleState, (state, action) => {
        const { uid, ...userInfo } = action.payload;
        state.displayResultListOfPeoples = state.displayResultListOfPeoples.map(
          item => {
            if (item.uid === uid) {
              return {
                ...item,
                ...userInfo,
              };
            }
            return item;
          },
        );
        state.resultListOfPeoples = state.resultListOfPeoples.map(item => {
          if (item.uid === uid) {
            return {
              ...item,
              ...userInfo,
            };
          }
          return item;
        });
      })
      .addCase(addSearchHistoryData, (state, action) => {
        const filterList = state.historyList.filter(item => {
          const sameId = item.searchId !== action.payload.searchId;
          const sameText =
            item.text === undefined ? true : item.text !== action.payload.text;
          const sameUid =
            item.uid === undefined ? true : item.uid !== action.payload.uid;
          const sameTopic =
            item.topic_id === undefined
              ? true
              : item.topic_id !== action.payload.topic_id;
          return sameId && sameText && sameUid && sameTopic;
        });
        state.historyList = [action.payload]
          .concat(filterList)
          .slice(0, SEARCH_MAX_HISTORY_LEN);
        localStorage.setItem(
          LOCAL_STORAGE_SEARCH_HISTORY_KEY,
          JSON.stringify(state.historyList),
        );
      })
      .addCase(removeSearchHistoryData, (state, action) => {
        state.historyList = state.historyList.filter(
          item => item.searchId !== action.payload,
        );
        localStorage.setItem(
          LOCAL_STORAGE_SEARCH_HISTORY_KEY,
          JSON.stringify(state.historyList),
        );
      })
      .addCase(clearSearchHistoryData, (state, action) => {
        state.historyList = [];
        localStorage.setItem(
          LOCAL_STORAGE_SEARCH_HISTORY_KEY,
          JSON.stringify(state.historyList),
        );
      })
      .addCase(changeSearchUserFilter, (state, action) => {
        state.filterUser = action.payload;
      });

    //       export const addSearchHistoryData = createAction<SearchHistoryList>('search/history/add')
    // export const removeSearchHistoryData = createAction<SearchHistoryList>('search/history/remove')
    // export const clearSearchHistoryData = createAction('search/history/clear')
  },
});

export const {
  setLoading,
  setErrorMsg,
  setDispalyLoading,
  setPostLoading,
  setPostEnd,
  setSearchVal,
  setSearchPost,
  setPostDetail,
} = Search.actions;

export default Search.reducer;
