import { createStore, combineReducers } from "redux";
import { useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import test, { Test } from './test';

const rootReducer = combineReducers({ test });
export const store = createStore(rootReducer, composeWithDevTools());

export interface Store {
	test: Test
}
  
export function useStore<TSelected>(selector: (state: Store) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean) {
	return useSelector<Store, TSelected>(selector, equalityFn);
}