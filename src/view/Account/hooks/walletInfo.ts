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
import { useCashierDesk, useERC20 } from 'hooks/useContract';
import { RechargeToken } from 'utils/calls';
import { getBalanceNumber } from 'utils/formatBalance';
import multicall from 'utils/multicall';
import { getCashierDeskAddress, getTimeAddress } from 'utils/addressHelpers';
import erc20Abi from 'config/abi/erc20.json'
import { ethers } from 'ethers'


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
  const CashierDesk = getCashierDeskAddress()

  // 获取平台余额
  const getBalance = async () => {
    try {
      const res = await Api.AccountApi.balance();
      return res;
    } catch (error) {
      return error;
    }
  };
  // 获取充提历史
  const getHistoryList = async (page?: number, pageSize?: number) => {
    try {
      const res = await Api.AccountApi.history({ page, pageSize });
      return res;
    } catch (error) {
      return error;
    }
  };
  // 获取授权数量
  const FetchApproveNum = async (address: string, account: string) => {
    const calls = [
      {
        address: address,
        name: 'allowance',
        params: [account, CashierDesk]
      },
    ]
    try {
      const approvedNum = await multicall(erc20Abi, calls)
      return getBalanceNumber(approvedNum)
    } catch (error) {
      throw error
    }
  }
  return {
    getBalance,
    FetchApproveNum,
    getHistoryList
  };
}
// 充值、提现、授权
export function useDpWd() {
  const { account, chainId, library } = useActiveWeb3React();
  const CashierDeskContract = useCashierDesk();

  const tokenAddress = getTimeAddress()
  const TimeContract = useERC20(tokenAddress)
  const CashierDeskAddr = getCashierDeskAddress()

  // 充值
  const Recharge = useCallback(
    async (address, amount) => {
      await RechargeToken(CashierDeskContract, address, amount);
    },
    [CashierDeskContract]
  );
  // 授权
  const onApprove = useCallback(async () => {
    try {
      const tx = await TimeContract.approve(CashierDeskAddr, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [TimeContract, CashierDeskAddr])
  // 提现
  const drawCallback = useCallback(
    async (draw_amount: string, draw_token_address: string, draw_token_type: number) => {
      try {
        if (!networks[chainId]) {
          throw new Error(`not support ChainID: ${chainId}`);
        }
        const sign = {
          network_type: networks[chainId],
          sign_time: Math.floor(new Date().getTime() / 1000),
          draw_amount: draw_amount,
          draw_token_address: draw_token_address,
          draw_token_type: draw_token_type,
          nonce: random(0xffff_ffff, 0xffff_ffff_ffff),
        };
        const res = await signMessage(library, account, JSON.stringify(sign));
        const params = { ...sign, encode_data: res };
        const response = await Api.AccountApi.withdraw(params);
        if (Api.isSuccess(response)) {

        }
        return response;
      } catch (error) {
        return false;
      }
    },
    [chainId, library, account]
  );

  return {
    drawCallback, Recharge, onApprove
  };
}
