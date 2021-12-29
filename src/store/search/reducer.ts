import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUpdateArticleParams, postUpdateArticle } from './actions';
import { Api } from 'apis';
import uniqBy from 'lodash/uniqBy';
import { RedirectToSwap } from 'libs/mini-swap/Swap/redirects';

interface SearchUserInfo {
  display_format: number // 显示的格式
  introduction: string // 介绍
  location: number // 所在地
  nft_image: string // nft图像
  nick_name: string // 昵称
  status: number // 
  uid: number
}

interface SearchTopicInfo {
  topic_name: string
}

export interface SearchState {
  resultListOfPeoples: SearchUserInfo[],
  resultListOfTopic: SearchTopicInfo[],
  loading: boolean,
  errorMsg: string,
  historyList: string[],
  placeHolderSearch: string,
}

const initialState = {
  resultListOfPeoples: [],
  resultListOfTopic: [],
  loading: false,
  errorMsg: '',
  historyList: [],
  placeHolderSearch: '',
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
    console.log(response, 'response')
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

export const fetchSearchAsync = createAsyncThunk(
  'fetch/fetchSearchAsync',
  async (search: string, { dispatch }) => {
    const result = {
      resultListOfPeoples: [],
      resultListOfTopic: [],
    }
    if (!search) {
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
    dispatch(setLoading(true))
    const fetchTopic = Api.HomeApi.queryHotTopicList({
      topic_name: searchVal,
      per_page: 20,
      page: 1
    })
    const fetchPeople = Api.UserApi.searchUser(searchVal)
    const [responseTopic, responsePeople] = await Promise.all([disableTopic ? null : fetchTopic, disablePeople ? null : fetchPeople])
    dispatch(setLoading(false))
    console.log(responseTopic, responsePeople)
    if (Api.isSuccess(responseTopic)) {
      console.log('isSuccess', responseTopic)
      result.resultListOfTopic = responseTopic.data?.List || []
    }
    if (Api.isSuccess(responsePeople)) {
      result.resultListOfPeoples = responsePeople.data || []
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
    setErrorMsg: (state, { payload }) => {
      state.errorMsg = payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchPeopleAsync.fulfilled, (state, action) => {
        const { list } = action.payload;
        console.log(list, '=list')
        state.resultListOfPeoples = list || []
      })
      .addCase(fetchSearchPeopleAsync.rejected, (state, action) => {
        // const { error } = action
        state.resultListOfPeoples = []
        state.errorMsg = 'error'
      })
      .addCase(fetchSearchAsync.fulfilled, (state, action) => {
        const { resultListOfPeoples, resultListOfTopic } = action.payload;
        console.log(resultListOfTopic, 11221)
        state.resultListOfPeoples = resultListOfPeoples
        state.resultListOfTopic = resultListOfTopic
      })
      .addCase(fetchSearchAsync.rejected, (state, action) => {
        state.resultListOfPeoples = []
        state.resultListOfTopic = []
        state.errorMsg = 'error'
      })
  },
});

export const {
  setLoading,
  setErrorMsg,
} = Search.actions


export default Search.reducer;
