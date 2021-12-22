import { createAction } from '@reduxjs/toolkit';

export const postGetArticle = createAction('post/get/article');
export const postUpdateArticle = createAction<Api.Home.post[]>(
  'post/update/article'
);
export const postUpdateArticleParams = createAction<{
  attention: number;
  page: number;
}>('post/update/article/params');
