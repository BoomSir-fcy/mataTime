import { createAction } from '@reduxjs/toolkit';

export const postGetArticle = createAction('post/get/article');
export const postUpdateArticle = createAction<Api.Home.post[]>(
  'post/update/article',
);
export const postUpdateArticleParams = createAction<{
  user_tags1?: string[];
  user_tags2?: string[];
  attention: number;
  page: number;
}>('post/update/article/params');
