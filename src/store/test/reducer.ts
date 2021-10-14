import { createReducer } from '@reduxjs/toolkit';
import { testUpdaeShow } from './actions';

const initialState = {
	show: false,
  value: 1
};

export type Test = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder.addCase(testUpdaeShow, (state, action) => {
    state.show = action.payload.show;
  })
})