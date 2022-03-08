import { useCallback, useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { TribeState } from './type';
import {
  fetchFeeTokenListAsync,
  fetchTribeInfoAsync,
  fetchTribeListAsync,
  fetchTicketNftListAsync,
  fetchIsApproveStakeNft,
} from '.';

export const useTribeState = () => {
  const tribe = useSelector((p: { tribe: TribeState }) => p.tribe);
  return tribe;
};

export const useFeeTokenList = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      dispatch(fetchFeeTokenListAsync());
    }
  }, [account]);
};

export const useTribeList = (page: number, page_size: number, tab: number) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      dispatch(fetchTribeListAsync({ page, page_size, tab }));
    }
  }, [account]);
};

export const useTribeInfo = (tribe_id: number) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      dispatch(fetchTribeInfoAsync({ tribe_id }));
    }
  }, [account]);
};

export const useTicketNftList = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  const handleFetch = useCallback(() => {
    if (account) {
      dispatch(fetchTicketNftListAsync({ account }));
    }
  }, [account, dispatch])

  useEffect(() => {
    handleFetch()
  }, [handleFetch]);
  
  return {
    handleFetch
  }
};

// 授权质押
export const useAccountStakeApprove = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      dispatch(fetchIsApproveStakeNft({ account }));
    }
  }, [account]);
};
