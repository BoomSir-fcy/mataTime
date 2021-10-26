import { createReducer } from '@reduxjs/toolkit';
import { changeSignUp } from './actions';

const initialState = {
	isSignup: false,
  userInfo: {
    uuid: ''
  }
};

export type Login = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(changeSignUp, (state, action) => {
      state.isSignup = action.payload.isSignup;
    })
})