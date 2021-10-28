import { createReducer } from '@reduxjs/toolkit';
import { changeSignUp, changeSignUpFail, changeSignUpStep, changeUpdateProfile } from './actions';

const initialState = {
	isSignup: false,
  signUpFail: false,
  singUpStep: 1,
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
    .addCase(changeSignUpFail, (state, action) => {
      state.signUpFail = action.payload.signUpFail;
    })
    .addCase(changeSignUpStep, (state, action) => {
      state.singUpStep = action.payload.singUpStep;
    })
    .addCase(changeUpdateProfile, (state, action) => {
      state.userInfo = action.payload;
    })
    
})