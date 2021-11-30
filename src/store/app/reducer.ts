import { createReducer } from '@reduxjs/toolkit';
import {
  toggleTheme,
  setSystemCustom,
  setLocation,
  toastContainer,
  connectWallet,
  setChainId,
  setTopicCoins
} from './actions';
import { languange } from './type';

const initialState = {
  connectWallet: false,
  chainId: 0,
  show: false,
  loading: false,
  localtion: [],
  toast: {
    type: '',
    text: '',
    toastContainer: null
  },
  systemCustom: {
    isDark: true,
    notification: true,
    languange: {} as languange,
    autoTranslation: false
  },
  coins: {
    symbol: '',
    projectLink: '',
    address: {},
    decimals: 0
  }
};

export type App = typeof initialState;

export default createReducer(initialState, builder => {
  builder
    .addCase(toggleTheme, state => {
      state.systemCustom.isDark = !state.systemCustom.isDark;
    })
    .addCase(setSystemCustom, (state, action) => {
      state.systemCustom = action.payload;
    })
    .addCase(setLocation, (state, action) => {
      state.localtion = action.payload;
    })
    .addCase(toastContainer, (state, { payload }) => {
      state.toast.toastContainer = payload;
    })
    .addCase(connectWallet, (state, action) => {
      state.connectWallet = action.payload.connectWallet;
    })
    .addCase(setChainId, (state, action) => {
      state.chainId = action.payload.chainId;
    })
    .addCase(setTopicCoins, (state, action) => {
      state.coins = action.payload;
    });
});
