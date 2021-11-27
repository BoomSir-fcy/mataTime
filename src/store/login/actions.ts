import { createAction } from '@reduxjs/toolkit';
interface profile extends Api.User.userInfoParams {
  token: string;
}

export const changeSignUp =
  createAction<{ isSignup: boolean }>('login/changeSignUp');
export const changeGetStake = createAction<{ isGetStake: boolean }>(
  'login/changeGetStake'
);
export const changeSignUpFail = createAction<{ signUpFail: boolean }>(
  'login/changeSignUpFail'
);
export const changeSignUpStep = createAction<{ singUpStep: number }>(
  'login/changeSignUpStep'
);
export const changeUpdateProfile = createAction<profile>(
  'login/changeUpdateProfile'
);
export const setUserNft =
  createAction<Api.SignIn.nftParams>('login/setUserNft');
export const setUserNftStake = createAction<{ isStakeNft: boolean }>(
  'login/setUserNftList'
);
export const setNftAddr = createAction<any[]>('login/setNftAddr');
export const resetLoginState = createAction('login/resetLoginState');

export const changeSignin =
  createAction<{ isSignin: boolean }>('login/changeSignin');

export const changeReset = createAction('login/changeReset');

export const setSigninLoading = createAction<boolean>('signin/setLoading');
