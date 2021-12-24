import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUpdateArticleParams, postUpdateArticle } from './actions';
import { Api } from 'apis';

const initialState = {
  list: [],
  lastList: [],
  page: 1,
  attention: 2,
};

export type Post = typeof initialState;

export const fetchPostAsync = createAsyncThunk(
  'fetch/getArticle',
  async (params: Api.Home.queryListParams) => {
    const response: Api.Home.postData = await Api.HomeApi.getArticleList(
      params,
    );
    if (Api.isSuccess(response)) {
      return {
        list: response.data.List,
        page: params.page,
        per_page: params.per_page,
        attention: params.attention,
      };
    }
    return {};
  },
);

export const Post = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        const { list, page, per_page, attention } = action.payload;
        let articleList = list ?? [];
        state.list = page === 1 ? articleList : [...state.list, ...articleList];
        state.lastList =
          articleList.length >= per_page || page > 1 ? articleList : [];
        state.page = articleList.length >= per_page ? page + 1 : page;
        state.attention = Number(attention);
      })
      .addCase(postUpdateArticleParams, (state, action) => {
        const { page, attention } = action.payload;
        state.list = [];
        state.page = page;
        state.attention = Number(attention);
      })
      .addCase(postUpdateArticle, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default Post.reducer;
