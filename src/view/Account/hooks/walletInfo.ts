import { useCallback, useEffect, useState } from 'react';
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
import {
  getCashierDeskAddress,
  getMatterAddress,
  getTimeAddress,
} from 'utils/addressHelpers';
import erc20Abi from 'config/abi/erc20.json';
import { ethers } from 'ethers';

enum Network {
  BSC = 1,
  // 测试
  BSCTEST = 1,
  MATIC = 2,
}

const networks = {
  [ChainId.BSC_MAINNET]: Network.BSC,
  [ChainId.BSC_TESTNET]: Network.BSCTEST,
  [ChainId.MATIC_MAINET]: Network.MATIC,
};
export const useFetchHistoryList = (coin_type: number) => {
  const { account } = useWeb3React();
  const [list, setList] = useState([]);
  const [page, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [end, setEnd] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getList = async () => {
      setLoading(true); // 设为请求状态
      try {
        const res = await Api.AccountApi.history({ coin_type, page, pageSize });
        if (Api.isSuccess(res)) {
          const temp = res.data.event_list;
          const nowList = page === 1 ? temp : [...list, ...temp];
          if (page * pageSize >= res.data.totalCount) {
            setEnd(true);
          }
          setList(nowList);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 请求完毕置为false
      }
    };
    if (account) {
      getList();
    }
  }, [page, coin_type, pageSize, account, list, setLoading, setEnd, setList]);

  return { list, page, end, setPageNum, loading };
};
// 充值、提现、授权
export function useDpWd() {
  const { account, chainId, library } = useActiveWeb3React();
  const CashierDeskContract = useCashierDesk();

  const TimeAddress = getTimeAddress();
  const TimeContract = useERC20(TimeAddress);
  const MatterAddress = getMatterAddress();
  const MatterContract = useERC20(MatterAddress);
  const CashierDeskAddr = getCashierDeskAddress();

  // 充值
  const Recharge = useCallback(
    async (address, amount, ChainToken = false) => {
      await RechargeToken(CashierDeskContract, address, amount, ChainToken);
    },
    [CashierDeskContract],
  );
  // 授权
  const onApprove = useCallback(
    async (token: string) => {
      try {
        let tx;
        if (token === 'TIME') {
          tx = await TimeContract.approve(
            CashierDeskAddr,
            ethers.constants.MaxUint256,
          );
        } else {
          tx = await MatterContract.approve(
            CashierDeskAddr,
            ethers.constants.MaxUint256,
          );
        }
        const receipt = await tx.wait();
        return receipt.status;
      } catch (e) {
        throw e;
      }
    },
    [TimeContract, MatterContract, CashierDeskAddr],
  );
  // 提现
  const drawCallback = useCallback(
    async (
      draw_amount: string,
      draw_token_address: string,
      draw_token_type: number,
    ) => {
      try {
        if (!networks[chainId]) {
          throw new Error(`not support ChainID: ${chainId}`);
        }
        //FeeType 手续费币种类型 1: bnb 2:提币的币种类型
        const sign = {
          network_type: networks[chainId],
          sign_time: Math.floor(new Date().getTime() / 1000),
          withdraw_amount: draw_amount,
          withdraw_token_address: draw_token_address
            ? draw_token_address
            : '0x0000000000000000000000000000000000000001',
          withdraw_token_type: draw_token_type,
          fee_type: 1,
          nonce: random(0xffff_ffff, 0xffff_ffff_ffff),
        };
        const res = await signMessage(library, account, JSON.stringify(sign));
        const params = { ...sign, encode_data: res };
        const response = await Api.AccountApi.withdraw(params);
        if (Api.isSuccess(response)) {
          return response;
        } else {
          throw new Error('fail');
        }
      } catch (error) {
        throw error;
      }
    },
    [chainId, library, account],
  );

  return {
    drawCallback,
    Recharge,
    onApprove,
  };
}
export const getToken = type => {
  switch (type) {
    case 1:
      return 'TIME';
    case 2:
      return 'MATTER';
    case 3:
      return 'BNB';
    case 'BNB':
      return 3;
    case 'MATTER':
      return 2;
    case 'TIME':
      return 1;
    default:
      return 'TIME';
  }
};
