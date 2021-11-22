import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { save, load } from 'redux-localstorage-simple';
import { ToastContainerProps } from 'react-toastify';
import { appReducer, appAction, App } from './app';
import { toastContainer } from './app/actions';
import { loginReducer, loginAction, Login, fetchUserInfoAsync } from './login';
import coinsReduce from './coins/reducer';
import poolsReduce from './pools';
import type { CoinsState } from './coins/reducer';
import { PoolsState } from './pools/types';

export interface Store {
  appReducer: App;
  loginReducer: Login;
  coins: CoinsState;
  pools: PoolsState;
}

// const rootReducer = combineReducers({ appReducer, loginReducer });
// export const store = createStore(rootReducer, composeWithDevTools());
const PERSISTED_KEYS: string[] = ['appReducer', 'loginReducer'];
export const store = configureStore({
  reducer: {
    appReducer,
    loginReducer,
    coins: coinsReduce,
    pools: poolsReduce,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true
    }).concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({ states: PERSISTED_KEYS }),
  devTools: process.env.NODE_ENV !== 'production'
});

export const storeAction = {
  ...loginAction,
  ...appAction
};
export const fetchThunk = {
  fetchUserInfoAsync
};

export const Dispatch = {
  toast: {
    show: (params: appAction.toastInterface) => store.dispatch({ type: 'toast/show', payload: params }),
    container: (params: ToastContainerProps) => store.dispatch(toastContainer(params)),
    hide: () => store.dispatch({ type: 'toast/hide' })
  }
};

export function useStore<TSelected>(selector: (state: Store) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean) {
  return useSelector<Store, TSelected>(selector, equalityFn);
}

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
