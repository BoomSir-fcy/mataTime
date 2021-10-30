import { createAction } from '@reduxjs/toolkit';
import { ToastContainerProps } from 'react-toastify';

export interface toastInterface {
	type: string
	text: string
}

export const toggleTheme = createAction('app/toggleTheme');
export const toastShow = createAction<toastInterface>('toast/show');
export const toastContainer = createAction<ToastContainerProps>('toast/toastContainer');
export const toastHide = createAction('toast/hide');
export const connectWallet = createAction<{connectWallet: boolean}>('app/connectWallet');
export const setChainId = createAction<{chainId: number}>('app/setChainId');