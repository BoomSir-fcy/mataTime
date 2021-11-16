import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { changeSignUp, changeSignUpFail, changeSignUpStep, changeUpdateProfile, setUserNft, setUserNftStake } from './actions';
import { storage } from 'config';
import { Api } from 'apis';
import { FetchNftsList } from 'view/Login/hook';

const initialState = {
  isSignup: false,
  signUpFail: false,
  isStakeNft: false,
  singUpStep: 1,
  userInfo: {} as Api.User.userInfoParams,
  nft: {
    nftID: 0,
    nftUrl: ''
  },
  nftList: []
};

export type Login = typeof initialState;

// Async thunks
export const fetchUserInfoAsync = createAsyncThunk('fetch/getUserInfo', async () => {
  const response = await Api.UserApi.getUserInfo();
  window.localStorage.setItem(storage.UserInfo, JSON.stringify(response.data));
  return response;
});
// Async thunks
export const fetchUserNftInfoAsync = createAsyncThunk<any, string>('fetch/getNftInfo', async account => {
  const info = await FetchNftsList(account);
  return info;
});

export const login = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(changeSignUp, (state, action) => {
        state.isSignup = action.payload.isSignup;
      })
      .addCase(setUserNftStake, (state, action) => {
        state.isStakeNft = action.payload.isStakeNft;
      })
      .addCase(changeSignUpFail, (state, action) => {
        state.signUpFail = action.payload.signUpFail;
      })
      .addCase(changeSignUpStep, (state, action) => {
        state.singUpStep = action.payload.singUpStep;
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload.data;
      })
      .addCase(changeUpdateProfile, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(setUserNft, (state, action) => {
        state.nft = action.payload;
      })
      .addCase(fetchUserNftInfoAsync.fulfilled, (state, action) => {
        state.nftList = action.payload;
      });
  }
});

export default login.reducer;
