import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { save, load } from 'redux-localstorage-simple';
import { appReducer, appAction, App } from './app';
import { loginReducer, loginAction, Login, fetchUserInfoAsync } from './login';
import coinsReduce from './coins/reducer';
import * as coinsAction from './coins/actions';
import walletReduce from './wallet/reducer';
import poolsReduce from './pools';
import taskReduce from './task/reducer';
import type { CoinsState } from './coins/reducer';
import type { WalletState } from './wallet/type';
import { PoolsState } from './pools/types';
import * as walletAction from './wallet/actions';
import { Post, postReducer, postAction, fetchPostAsync } from './post';
import { SearchState, searchReducer, searchAction, fetchSearchPeopleAsync, fetchSearchAsync } from './search';

import { TaskState } from './task/type';
export interface Store {
  appReducer: App;
  loginReducer: Login;
  coins: CoinsState;
  pools: PoolsState;
  wallet: WalletState;
  task: TaskState;
  post: Post;
  search: SearchState;
}

// const rootReducer = combineReducers({ appReducer, loginReducer });
// export const store = createStore(rootReducer, composeWithDevTools());
const PERSISTED_KEYS: string[] = ['appReducer'];
export const store = configureStore({
  reducer: {
    appReducer,
    loginReducer,
    coins: coinsReduce,
    pools: poolsReduce,
    wallet: walletReduce,
    task: taskReduce,
    post: postReducer,
    search: searchReducer,
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
  ...appAction,
  ...coinsAction,
  ...walletAction,
  ...postAction,
  ...searchAction
};
export const fetchThunk = {
  fetchUserInfoAsync,
  fetchPostAsync,
  fetchSearchPeopleAsync,
  fetchSearchAsync,
};

export const Dispatch = {
  toast: {}
};

export function useStore<TSelected>(
  selector: (state: Store) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) {
  return useSelector<Store, TSelected>(selector, equalityFn);
}

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
