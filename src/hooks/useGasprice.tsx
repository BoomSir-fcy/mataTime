import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { getBep20Contract, getDsgContract } from 'utils/contractHelpers';
import useRefresh from 'hooks/useRefresh';
import { simpleRpcProvider } from 'utils/providers';
import { getBalanceNumber } from 'utils/formatBalance';
import { BIG_ZERO } from 'utils/bigNumber';
import useLastUpdated from './useLastUpdated';
import { EXCEPT_TOTALSUPPPPLY_ADDRESS } from 'config';
import { getDsgAddress } from 'utils/addressHelpers';

type UseTokenBalanceState = {
  balance: BigNumber;
  fetchStatus: FetchStatus;
};
export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export const useGasprice = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [gasPirce, setGasPirce] = useState(BIG_ZERO);
  const { fastRefresh } = useRefresh();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        const walletBalance = await simpleRpcProvider.getGasPrice();
        setGasPirce(new BigNumber(walletBalance.toString()));
        setFetchStatus(FetchStatus.SUCCESS);
      } catch {
        setFetchStatus(FetchStatus.FAILED);
      }
    };
    fetchGasPrice();
  }, [fastRefresh, lastUpdated, setGasPirce, setFetchStatus]);

  return { gasPirce, fetchStatus, refresh: setLastUpdated };
};
