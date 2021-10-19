import { createReducer } from '@reduxjs/toolkit';
import { toggleTheme, toastContainer } from './actions';

const initialState = {
	isDark: false,
  show: false,
  toast: {
    type: '',
    text: '',
    toastContainer: null,
  }
};

export type App = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(toggleTheme, (state) => {
      state.isDark = !state.isDark;
    })
    .addCase(toastContainer, (state, { payload } ) => {
      state.toast.toastContainer = payload;
    })
})