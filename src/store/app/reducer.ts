import { createReducer } from '@reduxjs/toolkit';
import { toggleTheme } from './actions';

const initialState = {
	isDark: false,
  show: false,
  toast: {
    type: '',
    text: '',
  }
};

export type App = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
  .addCase(toggleTheme, (state) => {
    state.isDark = !state.isDark;
  })
})