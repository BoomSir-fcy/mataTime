import { createAction } from '@reduxjs/toolkit';

export interface toastInterface {
	type: string
	text: string
}

export const testUpdaeShow = createAction<{show: boolean}>('test/update/show');
export const testToastShow = createAction<toastInterface>('toast/show');
export const testToastHide = createAction('toast/hide');