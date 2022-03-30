import { createAction } from '@reduxjs/toolkit';
import { ChatRoomMsgList, TribeBaseInfo, TribeInfo } from './type';

export const postGetArticle = createAction('post/get/article');
export const postUpdateArticle = createAction<Api.Home.post[]>(
  'post/update/article',
);
export const postSetParamsTag = createAction<{
  user_tags1: string[];
  user_tags2: string[];
}>('post/set/params/tag');
export const postUpdateArticleParams = createAction<{
  user_tags1?: string[];
  user_tags2?: string[];
  attention: number;
  page: number;
}>('post/update/article/params');
export const postResetArticleParams = createAction<{
  attention: number;
}>('post/reset/article/params');

export const postSetUserTags = createAction<any[]>('post/postSetUserTags');

export const saveTribeBaseInfo = createAction<TribeBaseInfo>(
  'tribe/saveTribeBaseInfo',
);

export const setInitMemberNft = createAction<boolean>('tribe/setInitMemberNft');
export const updateTribeDetails = createAction<TribeInfo>(
  'tribe/updateTribeDetails',
);
// 加入部落弹框
export const setJoinTribeVisibleModal = createAction<boolean>(
  'tribe/setJoinTribeVisibleModal',
);

export const changrChatRoomList = createAction<ChatRoomMsgList[]>(
  'tribe/changrChatRoomList',
);
