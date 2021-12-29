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

const initialState = {
  resultList: [],
  resultListOfPeoples: [],
  resultListOfTopic: [],
  loading: false,
  errorMsg: '',
  historyList: [],
  placeHolderSearch: '',
};

export interface SearchState {
  resultList: [],
  resultListOfPeoples: SearchUserInfo[],
  resultListOfTopic: [],
  loading: boolean,
  errorMsg: string,
  historyList: string[],
  placeHolderSearch: string,
}

export const fetchSearchPeopleAsync = createAsyncThunk(
  'fetch/fetchSearchPeople',
  async (params: string, { dispatch }) => {
    console.log(params, 2121212121212121)
    if (!params) {
      return {
        list: []
      }
    }
    dispatch(setErrorMsg(''))
    dispatch(setLoading(true))
    const response = await Api.UserApi.searchUser(params)
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
  },
});

export const {
  setLoading,
  setErrorMsg,
} = Search.actions


export default Search.reducer;
