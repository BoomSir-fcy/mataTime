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
  setSigninLoading,
  setUserToken,
  setUserUnreadMsgNum,
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
  nftLoading: false,
  singUpStep: 0,
  userInfo: {} as Api.User.userInfoParams,
  nft: {} as any,
  nftStatus: false,
  nftList: [],
  nftAddr: [],
  token: window.localStorage.getItem(storage.Token) || '',
  unReadMsg: {
    message_at_me: 0,
    message_comment: 0,
    message_like: 0,
    message_secret: 0,
    message_system: 0,
    message_forward: 0,
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
      JSON.stringify(response.data),
    );
    return response;
  },
);
// Async thunks
export const fetchUserNftInfoAsync = createAsyncThunk<any, string>(
  'fetch/getNftInfo',
  async (account, { dispatch }) => {
    dispatch(setNftLoading(true));
    const info = await FetchNftsList(account);
    return info;
  },
);

export const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setNftLoading(state, action) {
      state.nftLoading = action.payload;
    },
  },
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
        state.nftLoading = false;
        state.nftList = action.payload;
      })
      .addCase(fetchUserNftInfoAsync.rejected, (state, action) => {
        state.nftLoading = false;
      })
      .addCase(setUserToken, (state, { payload }) => {
        if (payload) {
          state.token = payload;
        } else {
          state.token = '';
        }
      })
      .addCase(
        setUserUnreadMsgNum,
        (state, action: { payload: Partial<Api.News.UnreadMsgNum> }) => {
          if (action.payload) {
            const unreadMsg = {
              ...state.unReadMsg,
              ...action.payload,
            };
            const mineTotalMsgNum =
              unreadMsg.message_at_me +
              unreadMsg.message_like +
              unreadMsg.message_comment +
              unreadMsg.message_forward +
              unreadMsg.message_system;
            state.unReadMsg = {
              ...unreadMsg,
              mineTotalMsgNum,
            };
          }
        },
      )
      .addCase(resetLoginState, state => {
        Object.keys(state).forEach(key => {
          state[key] = cloneDeep(initialState[key]);
          state.token = ''; // 单独设置 initialState.token的初始值可能不为空
          localStorage.removeItem(storage.Token); // 移除token
        });
      });
  },
});

export const { setNftLoading } = login.actions;

export default login.reducer;
