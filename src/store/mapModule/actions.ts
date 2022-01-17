import { createAction } from '@reduxjs/toolkit';

export const addUnFollowUserId = createAction<number>('mapModule/addUnFollowUserId');
export const addUnFollowUserIds = createAction<number[]>('mapModule/addUnFollowUserIds');
export const removeUnFollowUserId = createAction<number>('mapModule/removeUnFollowUserId');
export const removeUnFollowUserIds = createAction<number[]>('mapModule/removeUnFollowUserIds');

export const addBlockUserId = createAction<number>('mapModule/addBlockUserId');
export const addBlockUserIds = createAction<number[]>('mapModule/addBlockUserIds');
export const removeBlockUserId = createAction<number>('mapModule/removeBlockUserId');
export const removeBlockUserIds = createAction<number[]>('mapModule/removeBlockUserIds');

