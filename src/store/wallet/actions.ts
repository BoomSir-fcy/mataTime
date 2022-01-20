import { createAction } from '@reduxjs/toolkit';

export const changeActiveToken = createAction<{ activeToken: string }>(
  'wallet/changeActiveToken',
);
export const changeChoiceToken = createAction<{ choiceToken: number }>(
  'wallet/changeChoiceToken',
);
