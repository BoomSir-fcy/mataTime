import { createAction } from '@reduxjs/toolkit';

export const addUnFollowUserId = createAction<number>(
  'mapModule/addUnFollowUserId',
);
export const addUnFollowUserIds = createAction<number[]>(
  'mapModule/addUnFollowUserIds',
);
export const removeUnFollowUserId = createAction<number>(
  'mapModule/removeUnFollowUserId',
);
export const removeUnFollowUserIds = createAction<number[]>(
  'mapModule/removeUnFollowUserIds',
);
export const clearMuteUserId = createAction<number>(
  'mapModule/clearMuteUserId',
);
export const addMuteUserId = createAction<number>('mapModule/addMuteUserId');
export const addBlockUserId = createAction<number>('mapModule/addBlockUserId');
export const addBlockUserIds = createAction<number[]>(
  'mapModule/addBlockUserIds',
);
export const removeMuteUserId = createAction<number>(
  'mapModule/removeMuteUserId',
);
export const removeBlockUserId = createAction<number>(
  'mapModule/removeBlockUserId',
);
export const removeBlockUserIds = createAction<number[]>(
  'mapModule/removeBlockUserIds',
);

export const addDeletePostId = createAction<number>(
  'mapModule/addDeletePostId',
);

export const addTranslateIds = createAction<number[]>(
  'mapModule/addTranslateIds',
);
export const removeTranslateIds = createAction<number[]>(
  'mapModule/removeTranslateIds',
);

export const addCommentTranslateIds = createAction<number[]>(
  'mapModule/addCommentTranslateIds',
);
export const removeCommentTranslateIds = createAction<number[]>(
  'mapModule/removeCommentTranslateIds',
);
