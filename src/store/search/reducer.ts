import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from 'apis';
import uniqBy from 'lodash/uniqBy';
import { RedirectToSwap } from 'libs/mini-swap/Swap/redirects';
import { SearchUserInfo, SearchTopicInfo, SearchState } from './types'
import {
  setSearchDisplayPeople, setSearchDisplayTopic, updatePeopleState, addSearchHistoryData,
  changeSearchUserFilter,
  removeSearchHistoryData, clearSearchHistoryData
} from './actions'
import { SEARCH_MAX_HISTORY_LEN } from 'config';
import { orderBy } from 'lodash';
import { useAppDispatch } from 'libs/mini-swap/state';

const LOCAL_STORAGE_SEARCH_HISTORY_KEY = 'search_history_list'

const historyListStore = localStorage.getItem(LOCAL_STORAGE_SEARCH_HISTORY_KEY)

const initialState: SearchState = {
  resultListOfPeoples: [],
  resultListOfTopic: [],
  loading: false,
  dispalyLoading: false,
  errorMsg: '',
  historyList: historyListStore ? JSON.parse(historyListStore) : [],
  placeHolderSearch: '',
  displayResultListOfPeoples: [],
  displayResultListOfTopic: [],
  filterUser: 1,
};

export const fetchSearchPeopleAsync = createAsyncThunk(
  'fetch/fetchSearchPeople',
  async (name: string, { dispatch }) => {
    if (!name) {
      return {
        list: []
      }
    }
    dispatch(setErrorMsg(''))
    dispatch(setLoading(true))
    const response = await Api.UserApi.searchUser(name)
    dispatch(setLoading(false))
    if (Api.isSuccess(response)) {
      return {
        list: response.data,
      };
    }
    return {
      list: []
    };
  },
);

export const fetchSearchAsync = createAsyncThunk<any, {
  search: string
  fetchDisplay?: boolean
}>(
  'fetch/fetchSearchAsync',
  async ({ search, fetchDisplay }, { dispatch, getState }) => {
    const result = {
      fetchDisplay,
      resultListOfPeoples: [],
      resultListOfTopic: [],
    }
    if (!`${search}`.trim()) {
      return result
    }
    if (search === '#' || search === '@') {
      return result
    }
    let disablePeople = false;
    let disableTopic = false;
    let searchVal = search
    if (search?.[0] === '#') {
      disablePeople = true
      searchVal = searchVal.slice(1)
    }
    if (search?.[0] === '@') {
      disableTopic = true
      searchVal = searchVal.slice(1)
    }

    dispatch(setErrorMsg(''))
    if (fetchDisplay) {
      dispatch(setDispalyLoading(true))
    }
    dispatch(setLoading(true))
    const fetchTopic = Api.HomeApi.queryHotTopicList({
      topic_name: searchVal,
      per_page: 20,
      page: 1
    })
    const fetchPeople = Api.UserApi.searchUser(searchVal)
    const [responseTopic, responsePeople] = await Promise.all([disableTopic ? null : fetchTopic, disablePeople ? null : fetchPeople])
    dispatch(setLoading(false))
    dispatch(setDispalyLoading(false))
    if (Api.isSuccess(responseTopic)) {
      result.resultListOfTopic = responseTopic.data?.List || []
    }
    const uid = (getState() as any)?.loginReducer?.userInfo?.uid
    if (Api.isSuccess(responsePeople)) {
      // 只显示50条用户 太多了有点卡
      const peopleList = (responsePeople.data || []).slice(0, 50).filter(item => item.uid !== uid)
      result.resultListOfPeoples = orderBy(peopleList, item => item.is_attention ? 0 : 1)
    }
    return result
  },
);

export const Search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setDispalyLoading: (state, { payload }) => {
      state.dispalyLoading = payload
    },
    setErrorMsg: (state, { payload }) => {
      state.errorMsg = payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchPeopleAsync.fulfilled, (state, action) => {
        const { list } = action.payload;
        state.resultListOfPeoples = list || []
      })
      .addCase(fetchSearchPeopleAsync.rejected, (state, action) => {
        // const { error } = action
        state.resultListOfPeoples = []
        state.errorMsg = 'error'
      })
      .addCase(fetchSearchAsync.fulfilled, (state, action) => {
        const { resultListOfPeoples, resultListOfTopic, fetchDisplay } = action.payload;
        state.resultListOfPeoples = resultListOfPeoples
        state.resultListOfTopic = resultListOfTopic
        if (fetchDisplay) {
          state.displayResultListOfPeoples = resultListOfPeoples
          state.displayResultListOfTopic = resultListOfTopic
        }
      })
      .addCase(fetchSearchAsync.rejected, (state, action) => {
        state.resultListOfPeoples = []
        state.resultListOfTopic = []
        state.errorMsg = 'error'
      })
      .addCase(setSearchDisplayPeople, (state, action) => {
        const { list } = action.payload
        state.displayResultListOfPeoples = list
      })
      .addCase(setSearchDisplayTopic, (state, action) => {
        const { list } = action.payload
        state.displayResultListOfTopic = list
      })
      .addCase(updatePeopleState, (state, action) => {
        const { uid, ...userInfo } = action.payload
        state.displayResultListOfPeoples = state.displayResultListOfPeoples.map(item => {
          if (item.uid === uid) {
            return {
              ...item,
              ...userInfo,
            }
          }
          return item
        })
        state.resultListOfPeoples = state.resultListOfPeoples.map(item => {
          if (item.uid === uid) {
            return {
              ...item,
              ...userInfo,
            }
          }
          return item
        })
      })
      .addCase(addSearchHistoryData, (state, action) => {
        const filterList = state.historyList.filter(item => {
          const sameId = item.searchId !== action.payload.searchId
          const sameText = item.text === undefined ? true : item.text !== action.payload.text
          const sameUid = item.uid === undefined ? true : item.uid !== action.payload.uid
          const sameTopic = item.topic_id === undefined ? true : item.topic_id !== action.payload.topic_id
          return sameId && sameText && sameUid && sameTopic
        })
        state.historyList = [action.payload].concat(filterList).slice(0, SEARCH_MAX_HISTORY_LEN)
        localStorage.setItem(LOCAL_STORAGE_SEARCH_HISTORY_KEY, JSON.stringify(state.historyList))
      })
      .addCase(removeSearchHistoryData, (state, action) => {
        state.historyList = state.historyList.filter(item => item.searchId !== action.payload)
        localStorage.setItem(LOCAL_STORAGE_SEARCH_HISTORY_KEY, JSON.stringify(state.historyList))
      })
      .addCase(clearSearchHistoryData, (state, action) => {
        state.historyList = []
        localStorage.setItem(LOCAL_STORAGE_SEARCH_HISTORY_KEY, JSON.stringify(state.historyList))
      })
      .addCase(changeSearchUserFilter, (state, action) => {
        state.filterUser = action.payload
      })

    //       export const addSearchHistoryData = createAction<SearchHistoryList>('search/history/add')
    // export const removeSearchHistoryData = createAction<SearchHistoryList>('search/history/remove')
    // export const clearSearchHistoryData = createAction('search/history/clear')
  },
});

export const {
  setLoading,
  setErrorMsg,
  setDispalyLoading,
} = Search.actions


export default Search.reducer;
