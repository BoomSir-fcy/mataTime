import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUpdateArticleParams, postUpdateArticle } from './actions';
import { Api } from 'apis';
import uniqBy from 'lodash/uniqBy';
import { stat } from 'fs';

const initialState = {
  list: [],
  lastList: [],
  page: 1,
  attention: 2,
  user_tags1: [],
  user_tags2: [],
  addListNum: -1,
  loading: false,
};

export type Post = typeof initialState;

export const fetchPostAsync = createAsyncThunk(
  'fetch/getArticle',
  async (params: Api.Home.queryListParams, { dispatch }) => {
    // dispatch()
    dispatch(setLoading(true));
    const response: Api.Home.postData = await Api.HomeApi.getArticleList(
      params,
    );
    dispatch(setLoading(false));
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
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        const { list, page, per_page, attention } = action.payload;
        let articleList = list ?? [];
        const { length } = state.list;
        if (page === 1) {
          state.list = articleList;
        } else {
          const list = state.list.concat(articleList);
          state.list = uniqBy(list, 'id');
        }
        state.lastList =
          articleList.length >= per_page || page > 1 ? articleList : [];
        state.page = articleList.length >= per_page ? page + 1 : page;
        state.attention = Number(attention);
        state.addListNum = state.list.length - length;
      })
      .addCase(postUpdateArticleParams, (state, action) => {
        const { page, attention, user_tags1, user_tags2 } = action.payload;
        state.list = [];
        state.page = page;
        state.user_tags1 = user_tags1;
        state.user_tags2 = user_tags2;
        state.attention = Number(attention);
      })
      .addCase(postUpdateArticle, (state, action) => {
        state.list = action.payload;
      });
  },
});

export const { setLoading } = Post.actions;

export default Post.reducer;
