import { createAction } from '@reduxjs/toolkit';

export interface toastInterface {
	type: string
	text: string
}

export const toggleTheme = createAction('app/toggleTheme');
export const toastShow = createAction<toastInterface>('toast/show');
export const toastHide = createAction('toast/hide');