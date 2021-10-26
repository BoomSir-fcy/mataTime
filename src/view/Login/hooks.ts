import { useCallback, useMemo } from 'react'
import random from 'lodash/random';
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from 'config/wallet/config'
import { signMessage } from 'utils/web3React'
import { storage } from 'config'

import http from 'apis/http'

enum LoginNetwork {
  BSC = 1,
  MATIC = 2,
}
enum OperationType {
  LOGIN = 1,
  REGISTER = 2,
}

const networks = {
  [ChainId.BSC_MAINNET]: LoginNetwork.BSC,
  [ChainId.BSC_TESTNET]: LoginNetwork.BSC,
  [ChainId.MATIC_MAINET]: LoginNetwork.MATIC,
}

interface LoginSignMessage {
  network: LoginNetwork,
  sign_time: number, // 签名时间
  operation_type: OperationType,
  nonce: number, // 随机数
}
// 用户登录
export function useSignIn() {
  const { account, chainId, library } = useActiveWeb3React();

  const signInCallback = useCallback(async() => {
    try {
      const res = await http.get('/v1/sign/signin');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, [account]);

  const isSignUpCallback = useCallback(async() => {
    try {
      // const response = await http.get("/");
    } catch (error) {
      
    }
  }, []);

  return {
    signInCallback,
    isSignUpCallback
  }
}

export function useLogin() {
  const { account, chainId, library } = useActiveWeb3React()

  const loginCallback = useCallback(
    async (operationType: OperationType) => {
      try {
        if (!networks[chainId]) {
          throw new Error(`not support ChainID: ${chainId}`)
        }
        const sign: LoginSignMessage = {
          network: networks[chainId],
          sign_time: Math.floor(new Date().getTime() / 1000),
          operation_type: operationType,
          nonce: random(0xFFFF_FFFF, 0xFFFF_FFFF_FFFF),
        }
        const res = await signMessage(library, account, JSON.stringify(sign));
        const response = await http.post('/v1/sign/signup', { ...sign, encode_data: res });
        window.localStorage.setItem(storage.Token, response.token);
        // return http.post('/v1/sign/signup', {
        //   ...sign,
        //   encode_data: res,
        // })
        return response;
      } catch (error) {
        console.error(error)
      }
    },
    [chainId, library],
  )
  return {
    loginCallback,
  }
}