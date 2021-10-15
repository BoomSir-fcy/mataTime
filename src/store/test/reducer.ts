import { createReducer } from '@reduxjs/toolkit';
import { testUpdaeShow, testToastShow, testToastHide } from './actions';

const initialState = {
	show: false,
  value: 1,
  toast: {
    type: '',
    text: '',
  }
};

export type Test = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(testUpdaeShow, (state, action) => {
      state.show = action.payload.show;
    })
    .addCase(testToastShow, (state, action) => {
      state.show = true;
      state.toast = {...action.payload};
    })
    .addCase(testToastHide, (state) => {
      state.show = false;
    })
})