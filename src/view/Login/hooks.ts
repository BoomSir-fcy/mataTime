import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ChainId } from 'config/wallet/config';
import { signMessage } from 'utils/web3React';
import { storeAction } from 'store';
import { storage } from 'config';
import { Api } from 'apis';

import random from 'lodash/random';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

enum LoginNetwork {
  BSC = 1,
  MATIC = 2
}

const networks = {
  [ChainId.BSC_MAINNET]: LoginNetwork.BSC,
  [ChainId.BSC_TESTNET]: LoginNetwork.MATIC,
  [ChainId.MATIC_MAINET]: LoginNetwork.MATIC
};

// 用户登录
export function useSignIn() {
  const dispatch = useDispatch();
  const { chainId } = useActiveWeb3React();
  // 验证地址是否注册
  const siginInVerify = useCallback(async (address: string) => {
    try {
      const res = await Api.SignInApi.signVerify(address);
      if (Api.isSuccess(res)) {
        return res.code;
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }, []);

  const getNftUrl = async (address?: string) => {
    try {
      const res: Api.SignIn.nftCallback = await Api.SignInApi.getNft(networks[chainId], address);
      if (Api.isSuccess(res)) {
        dispatch(storeAction.setUserNft({ ...res.data }));
      }
      return res.code;
    } catch (error) {
      return 0;
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
    siginInVerify,
    getNftUrl,
    getUserName,
    addNickName
  };
}

export function useLogin() {
  const { account, chainId, library } = useActiveWeb3React();

  const loginCallback = useCallback(
    async (operationType: Api.SignIn.OperationType) => {
      try {
        if (!networks[chainId]) {
          throw new Error(`not support ChainID: ${chainId}`);
        }
        const sign = {
          network: networks[chainId],
          sign_time: Math.floor(new Date().getTime() / 1000),
          operation_type: operationType,
          nonce: random(0xffff_ffff, 0xffff_ffff_ffff)
        };
        const res = await signMessage(library, account, JSON.stringify(sign));
        const params = { ...sign, encode_data: res };
        const response = operationType === 1 ? await Api.SignInApi.signUp(params) : await Api.SignInApi.signIn(params);
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
    loginCallback
  };
}
