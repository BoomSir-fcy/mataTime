import { createStore, combineReducers } from "redux";
import { useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { testReducer, Test, TestAction } from './test';

export interface Store {
	testReducer: Test
}

const rootReducer = combineReducers({ testReducer });
export const store = createStore(rootReducer, composeWithDevTools());
export const storeAction = {
	...TestAction
}

export const Dispatch = {
  toast: {
    show: (params: TestAction.toastInterface) => store.dispatch({ type: "toast/show", payload: params }),
    hide: () => store.dispatch({ type: "toast/hide" })
  },
}

export function useStore<TSelected>(selector: (state: Store) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean) {
	return useSelector<Store, TSelected>(selector, equalityFn);
}