import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from 'apis';

const initialState = {
  list: []
};

export const fetchPostAsync = createAsyncThunk(
  'fetch/getArticle',
  async (params: Api.Home.queryListParams) => {
    const response = await Api.HomeApi.getArticleList(params);
    if (Api.isSuccess(response)) {
      return response.data.List;
    }
    return [];
  }
);

export const Post = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPostAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  }
});

export default Post.reducer;
