import { useCallback } from 'react'
import { ChainId } from 'config/wallet/config'
import { signMessage } from 'utils/web3React'
import { storage } from 'config'
import { Api } from 'apis';

import random from 'lodash/random';
import useActiveWeb3React from 'hooks/useActiveWeb3React'

enum LoginNetwork {
  BSC = 1,
  MATIC = 2,
}

const networks = {
  [ChainId.BSC_MAINNET]: LoginNetwork.BSC,
  [ChainId.BSC_TESTNET]: LoginNetwork.BSC,
  [ChainId.MATIC_MAINET]: LoginNetwork.MATIC,
}

// 用户登录
export function useSignIn() {

  // 验证地址是否注册
  const siginInVerify = useCallback(async(address: string) => {
    try {
      const res = await Api.SignInApi.signVerify(address);
      return res.code;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getNftUrl = async() => {
    try {
      const res = await Api.SignInApi.getNft();
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  const isSignUpCallback = useCallback(async() => {
    
  }, []);

  return {
    siginInVerify,
    getNftUrl,
    isSignUpCallback
  }
}

export function useLogin() {
  const { account, chainId, library } = useActiveWeb3React()

  const loginCallback = useCallback(
    async (operationType: Api.SignIn.OperationType) => {
      try {
        if (!networks[chainId]) {
          throw new Error(`not support ChainID: ${chainId}`)
        }
        const sign = {
          network: networks[chainId],
          sign_time: Math.floor(new Date().getTime() / 1000),
          operation_type: operationType,
          nonce: random(0xFFFF_FFFF, 0xFFFF_FFFF_FFFF),
        }
        const res = await signMessage(library, account, JSON.stringify(sign));
        const params = { ...sign, encode_data: res };
        const response = operationType === 1  ? 
            await Api.SignInApi.signIn(params) : await Api.SignInApi.signIn(params);
        const { token } = response.data;
        window.localStorage.setItem(storage.Token, token);
        return response.data;
      } catch (error) {
        console.error(error)
      }
    },
    [chainId, library, account],
  )
  return {
    loginCallback,
  }
}