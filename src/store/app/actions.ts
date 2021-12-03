import { createAction } from '@reduxjs/toolkit';
import { ToastContainerProps } from 'react-toastify';
import { systemCustom, coinsProps } from './type';

export interface toastInterface {
  type: string;
  text: string;
}

export const toggleTheme = createAction('app/toggleTheme');
export const setSystemCustom = createAction<systemCustom>(
  'app/set/systemCustom'
);
export const setLocation = createAction<[]>('app/set/location');
export const toastShow = createAction<toastInterface>('toast/show');
export const toastContainer = createAction<ToastContainerProps>(
  'toast/toastContainer'
);
export const toastHide = createAction('toast/hide');
export const connectWallet =
  createAction<{ connectWallet: boolean }>('app/connectWallet');
export const setChainId = createAction<{ chainId: number }>('app/setChainId');
// export const setTopicCoins = createAction<coinsProps>('app/topic/coins');
