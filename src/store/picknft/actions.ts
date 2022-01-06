import { createAction } from '@reduxjs/toolkit';
import { StuffElement } from 'config/constants/stuffImages';
import { InviteCodes } from 'store/types';

export const updateSelectData = createAction<StuffElement>(
  'picknft/updateSelectData',
);
export const randomPick = createAction('picknft/randomPick');

export const setInviteCodes = createAction<InviteCodes>('picknft/setInviteCodes');
