
import { ToastContainerProps } from 'react-toastify';
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { PoolsState } from './pools/types';
import { Login } from './login';
import { WalletState } from './wallet/type'
import { TaskState } from './task/type';

export interface State {
  pools: PoolsState;
  loginReducer: Login;
  wallet: WalletState;
  task: TaskState;
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
