import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import {
  changeSignUp,
  changeSignin,
  changeGetStake,
  changeSignUpFail,
  changeSignUpStep,
  changeUpdateProfile,
  changeReset,
  setUserNft,
  setUserNftStake,
  setNftAddr,
  resetLoginState,
  setSigninLoading
} from './actions';
import { storage } from 'config';
import { Api } from 'apis';
import { FetchNftsList } from 'view/Login/hook';

interface UnreadMsg extends Api.News.UnreadMsgNum {
  mineTotalMsgNum: number;
}

const initialState = {
  isSignup: false,
  isSignin: false,
  isGetStake: false,
  isStakeNft: false,
  signUpFail: false,
  signinLoading: false,
  singUpStep: 0,
  userInfo: {} as Api.User.userInfoParams,
  nft: {} as any,
  nftStatus: false,
  nftList: [],
  nftAddr: [],
  unReadMsg: {
    message_at_me: 0,
    message_comment: 0,
    message_like: 0,
    message_secret: 0,
    message_system: 0,
    mineTotalMsgNum: 0,
  },
};

export type Login = typeof initialState;

// Async thunks
export const fetchUserInfoAsync = createAsyncThunk(
  'fetch/getUserInfo',
  async () => {
    let response = await Api.UserApi.getUserInfo();
    // 查询Nft头像地址
    // const NftImg = await getUrl(response.data.nft_image)
    // response.data.NftImage = response.data.nft_image = NftImg.image
    window.localStorage.setItem(
      storage.UserInfo,
      JSON.stringify(response.data)
    );
    return response;
  }
);
// Async thunks
export const fetchUserNftInfoAsync = createAsyncThunk<any, string>(
  'fetch/getNftInfo',
  async account => {
    const info = await FetchNftsList(account);
    return info;
  }
);

// Async thunks
export const fetchUserUnreadMsgNum = createAsyncThunk<Api.News.UnreadMsgNum>(
  'login/fetchUserUnreadMsgNum',
  async () => {
    const res = await Api.NewsApi.getUnreadMsgNum();
    if (Api.isSuccess(res)) {
      return res.data
    }
    return null
  }
);

export const login = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(changeSignUp, (state, action) => {
        state.isSignup = action.payload.isSignup;
      })
      .addCase(changeSignin, (state, action) => {
        state.isSignin = action.payload.isSignin;
      })
      .addCase(changeGetStake, (state, action) => {
        state.isGetStake = action.payload.isGetStake;
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
      .addCase(changeReset, (state, action) => {
        state.isSignup = false;
        state.isGetStake = false;
        state.isSignin = false;
        state.isStakeNft = false;
        state.signUpFail = false;
        state.signinLoading = false;
        state.nftStatus = false;
        state.nft = {};
        state.nftList = [];
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
      .addCase(setNftAddr, (state, action) => {
        state.nftAddr = action.payload;
      })
      .addCase(setSigninLoading, (state, action) => {
        state.signinLoading = action.payload;
      })
      .addCase(fetchUserNftInfoAsync.fulfilled, (state, action) => {
        state.nftStatus = true;
        state.nftList = action.payload;
      })
      .addCase(fetchUserUnreadMsgNum.fulfilled, (state, action) => {
        if (action.payload) {
          const mineTotalMsgNum = action.payload.message_at_me + action.payload.message_like + action.payload.message_comment
          state.unReadMsg = {
            ...state.unReadMsg,
            ...action.payload,
            mineTotalMsgNum,
          }
        }
      })
      .addCase(resetLoginState, state => {
        Object.keys(state).forEach(key => {
          state[key] = cloneDeep(initialState[key]);
        });
      });
  }
});

export default login.reducer;
