import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { getBep20Contract } from 'utils/contractHelpers';
import useRefresh from 'hooks/useRefresh';
import { simpleRpcProvider } from 'utils/providers'
import { getBalanceNumber } from 'utils/formatBalance';
import { BIG_ZERO } from 'utils/bigNumber';
import useLastUpdated from './useLastUpdated'

type UseTokenBalanceState = {
  balance: BigNumber;
  fetchStatus: FetchStatus;
};
export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}
// 获取代币余额
export const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { account } = useWeb3React();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress);
      try {
        const res = await contract.balanceOf(account);
        setBalanceState({
          balance: new BigNumber(res.toString()),
          fetchStatus: SUCCESS,
        });
      } catch (e) {
        console.error(e);
        setBalanceState(prev => ({
          ...prev,
          fetchStatus: FAILED,
        }));
      }
    };

    if (account) {
      fetchBalance();
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED]);

  return balanceState;
};

export const useTotalSupply = (tokenAddress: string) => {
  const { slowRefresh } = useRefresh();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getBep20Contract(tokenAddress);
      const supply = await cakeContract.totalSupply();
      setTotalSupply(new BigNumber(supply.toString()));
    }

    fetchTotalSupply();
  }, [slowRefresh]);

  return totalSupply;
};


export const useGetBnbBalance = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [balance, setBalance] = useState(BIG_ZERO)
  const { fastRefresh } = useRefresh();
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await simpleRpcProvider.getBalance(account)
        setBalance(new BigNumber(walletBalance.toString()))
        setFetchStatus(FetchStatus.SUCCESS)
      } catch {
        setFetchStatus(FetchStatus.FAILED)
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, fastRefresh, lastUpdated, setBalance, setFetchStatus])

  return { balance, fetchStatus, refresh: setLastUpdated }
}

