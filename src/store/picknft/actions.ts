import { createAction } from '@reduxjs/toolkit';
import { StuffElement } from 'config/constants/stuffImages';

export const updateSelectData = createAction<StuffElement>(
  'picknft/updateSelectData',
);
export const randomPick = createAction('picknft/randomPick');
