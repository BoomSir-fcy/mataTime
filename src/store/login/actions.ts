import { createAction } from '@reduxjs/toolkit';

interface profile {
  uuid: string
  token: string
}

export const changeSignUp = createAction<{isSignup: boolean}>('login/changeSignUp');
export const changeSignUpFail  = createAction<{signUpFail: boolean}>('login/changeSignUpFail');
export const changeSignUpStep  = createAction<{singUpStep: number}>('login/changeSignUpStep');
export const changeUpdateProfile = createAction<profile>('login/changeUpdateProfile');