import { createReducer } from '@reduxjs/toolkit';
import { toggleTheme, setSystemCustom, toastContainer, connectWallet, setChainId } from './actions';
import { languange } from './type';

const initialState = {
  connectWallet: false,
  chainId: 0,
  show: false,
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
    .addCase(toastContainer, (state, { payload }) => {
      state.toast.toastContainer = payload;
    })
    .addCase(connectWallet, (state, action) => {
      state.connectWallet = action.payload.connectWallet;
    })
    .addCase(setChainId, (state, action) => {
      state.chainId = action.payload.chainId;
    });
});
