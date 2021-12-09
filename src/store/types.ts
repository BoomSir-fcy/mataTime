
import { ToastContainerProps } from 'react-toastify';
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { PoolsState } from './pools/types';
import { Login } from './login';
import { WalletState } from './wallet/type'

export interface State {
  pools: PoolsState;
  loginReducer: Login;
  wallet: WalletState;
}

export interface AppStore {
  isDark: boolean,
  show: boolean,
  toast: {
    type: string,
    text: string,
    toastContainer?: ToastContainerProps
  }
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>
