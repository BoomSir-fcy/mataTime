import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ChainId } from 'config/wallet/config';
import { signMessage } from 'utils/web3React';
import { storeAction } from 'store';
import { storage } from 'config';
import { Api } from 'apis';

import random from 'lodash/random';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { FetchNftStakeType } from './hook';
import { getNftInfo } from 'apis/DsgRequest';
import { useWeb3React } from '@web3-react/core';

enum LoginNetwork {
  BSC = 1,
  // 测试
  MATIC = 1
}

const networks = {
  [ChainId.BSC_MAINNET]: LoginNetwork.BSC,
  [ChainId.BSC_TESTNET]: LoginNetwork.MATIC,
  [ChainId.MATIC_MAINET]: LoginNetwork.MATIC
};

// 用户登录
export function useSignIn() {
  const dispatch = useDispatch();
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

  const getNftUrl = async (address: string) => {
    try {
      const nftStake = await FetchNftStakeType(address);
      try {
        const result = await getNftInfo(
          nftStake[0].NFT_address,
          nftStake[0].token_id
        );
        const data = {
          nftID: result.properties.token_id,
          nftUrl: result.image
        };
        dispatch(storeAction.setUserNft(data));
        return 1;
      } catch (error) {
        return 0;
      }
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
        const response = await Api.SignInApi.signIn(params);
        if (Api.isSuccess(response)) {
          const { token } = response.data;
          window.localStorage.setItem(storage.Token, token);
        }
        return response;
      } catch (error: any) {
        console.log(error);
        return {
          code: error?.code || 0
        };
      }
    },
    [chainId, library, account]
  );

  return {
    loginCallback
  };
}
