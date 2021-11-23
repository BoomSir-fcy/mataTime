import { createAction } from '@reduxjs/toolkit';
interface profile extends Api.User.userInfoParams {
  token: string;
}

export const changeSignUp =
  createAction<{ isSignup: boolean }>('login/changeSignUp');

export const changeSignin =
  createAction<{ isSignin: boolean }>('login/changeSignin');
export const changeSignUpFail = createAction<{ signUpFail: boolean }>(
  'login/changeSignUpFail'
);
export const changeSignUpStep = createAction<{ singUpStep: number }>(
  'login/changeSignUpStep'
);
export const changeUpdateProfile = createAction<profile>(
  'login/changeUpdateProfile'
);
export const changeReset = createAction('login/changeReset');
export const setUserNft =
  createAction<Api.SignIn.nftParams>('signin/setUserNft');
export const setUserNftStake = createAction<{ isStakeNft: boolean }>(
  'signin/setUserNftList'
);
export const setNftAddr = createAction<any[]>('signin/setNftAddr');
export const setSigninLoading = createAction<boolean>('signin/setLoading');
