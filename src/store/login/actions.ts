import { createAction } from '@reduxjs/toolkit';
import { Address } from 'cluster';

interface profile extends Api.User.userInfoParams {
  token: string;
}

export const changeSignUp = createAction<{ isSignup: boolean }>('login/changeSignUp');
export const changeSignUpFail = createAction<{ signUpFail: boolean }>('login/changeSignUpFail');
export const changeSignUpStep = createAction<{ singUpStep: number }>('login/changeSignUpStep');
export const changeUpdateProfile = createAction<profile>('login/changeUpdateProfile');
export const setUserNft = createAction<Api.SignIn.nftParams>('login/setUserNft');
export const setUserNftStake = createAction<{ isStakeNft: boolean }>('login/setUserNftList');
export const setNftAddr = createAction<any[]>('login/setNftAddr');
export const resetLoginState = createAction('login/resetLoginState');
