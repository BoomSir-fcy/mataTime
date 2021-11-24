import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ChainId } from 'config/wallet/config';
import { signMessage } from 'utils/web3React';
import { storeAction } from 'store';
import { storage } from 'config';
import { Api } from 'apis';
import random from 'lodash/random';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useWeb3React } from '@web3-react/core';

enum Network {
  BSC = 1,
  // 测试
  BSCTEST = 1,
  MATIC = 2
}

const networks = {
  [ChainId.BSC_MAINNET]: Network.BSC,
  [ChainId.BSC_TESTNET]: Network.BSCTEST,
  [ChainId.MATIC_MAINET]: Network.MATIC
};

// 用户
export function useInfo() {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  // 获取余额
  const getBalance = async () => {
    try {
      const res = await Api.AccountApi.balance();
      return res;
    } catch (error) {
      return error;
    }
  };

  const getUserName = async () => {
    try {
      const res = await Api.UserApi.getUserInfo();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // 添加用户昵称
  const addNickName = async (nickname: string) => {
    try {
      const res = await Api.UserApi.addNickName(nickname);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getBalance,
    getUserName,
    addNickName
  };
}
// 充值、提现
export function useDpWd() {
  const { account, chainId, library } = useActiveWeb3React();
  // 提现
  const drawCallback = useCallback(
    async (draw_amount: string, draw_token_address: string) => {
      try {
        if (!networks[chainId]) {
          throw new Error(`not support ChainID: ${chainId}`);
        }
        const sign = {
          network_type: networks[chainId],
          sign_time: Math.floor(new Date().getTime() / 1000),
          draw_amount: draw_amount,
          draw_token_address: draw_token_address,
          nonce: random(0xffff_ffff, 0xffff_ffff_ffff),
        };
        const res = await signMessage(library, account, JSON.stringify(sign));
        const params = { ...sign, encode_data: res };
        // 1注册 2登录
        const response = await Api.AccountApi.withdraw(params);
        if (Api.isSuccess(response)) {
          const { token } = response.data;
          window.localStorage.setItem(storage.Token, token);
        }
        return response;
      } catch (error) {
        return false;
      }
    },
    [chainId, library, account]
  );
  return {
    drawCallback
  };
}
