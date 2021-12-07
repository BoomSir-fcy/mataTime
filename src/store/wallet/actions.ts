import { createAction } from '@reduxjs/toolkit';

export const changeActiveToken = createAction<{ activeToken: string }>(
  'wallet/changeActiveToken'
);
