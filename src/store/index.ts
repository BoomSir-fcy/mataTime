import { createStore, combineReducers } from "redux";
import { useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { appReducer, appAction, App } from './app';
import { loginReducer, loginAction, Login } from './login';

export interface Store {
	appReducer: App,
	loginReducer: Login
}

const rootReducer = combineReducers({ appReducer, loginReducer });
export const store = createStore(rootReducer, composeWithDevTools());
export const storeAction = {
	...loginAction
}

export const Dispatch = {
  toast: {
    show: (params: appAction.toastInterface) => store.dispatch({ type: "toast/show", payload: params }),
    hide: () => store.dispatch({ type: "toast/hide" })
  },
}

export function useStore<TSelected>(selector: (state: Store) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean) {
	return useSelector<Store, TSelected>(selector, equalityFn);
}