import { createReducer } from '@reduxjs/toolkit';
import {
  toggleTheme,
  setSystemCustom,
  setLocation,
  connectWallet,
  setChainId,
  setSupportToken
  // setTopicCoins
} from './actions';
import { languange } from './type';

const initialState = {
  connectWallet: false,
  chainId: 0,
  show: false,
  loading: false,
  localtion: [],
  systemCustom: {
    isDark: true,
    notification: true,
    languange: {} as languange,
    autoTranslation: false
  },
  supportTokenViews: []
  // coins: {
  //   symbol: '',
  //   projectLink: '',
  //   address: {},
  //   decimals: 0,
  //   clickTime: 0, // 点击时间 = ( 时间戳 / 1000 / 3 ) 除3做节流处理 三秒内点同一个只会生效一次
  // }
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
    .addCase(connectWallet, (state, action) => {
      state.connectWallet = action.payload.connectWallet;
    })
    .addCase(setChainId, (state, action) => {
      state.chainId = action.payload.chainId;
    })
    .addCase(setSupportToken, (state, action) => {
      state.supportTokenViews = action.payload;
    });
  // .addCase(setTopicCoins, (state, action) => {
  //   // nowTime 做防抖处理
  //   const nowTime = Math.floor(new Date().getTime() / 1000 / 3)
  //   const { symbol, clickTime } = state.coins
  //   if (symbol !== action.payload?.symbol || clickTime !== nowTime) {
  //     state.coins = {
  //       ...action.payload,
  //       clickTime: nowTime,
  //     };
  //   }
  // });
});
