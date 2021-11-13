import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { changeSignUp, changeSignUpFail, changeSignUpStep, changeUpdateProfile, setUserNft } from './actions';
import { storage } from 'config';
import { Api } from 'apis';

const initialState = {
  isSignup: false,
  signUpFail: false,
  singUpStep: 1,
  userInfo: {
    UID: 0
  },
  nft: {
    nftID: 0,
    nftUrl: ''
  }
};

export type Login = typeof initialState;

// Async thunks
export const fetchUserInfoAsync = createAsyncThunk('fetch/getUserInfo', async () => {
  const response = await Api.UserApi.getUserInfo();
  window.localStorage.setItem(storage.UserInfo, JSON.stringify(response.data));
  return response;
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
      });
  }
});

export default login.reducer;
