import { useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { TribeState } from './type';
import {
  fetchFeeTokenListAsync,
  fetchTribeInfoAsync,
  fetchTribeListAsync,
  fetchTicketNftListAsync,
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

export const useTribeList = (page: number, psge_size: number, tab: number) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      dispatch(fetchTribeListAsync({ page, psge_size, tab }));
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

  useEffect(() => {
    if (account) {
      dispatch(fetchTicketNftListAsync({ account }));
    }
  }, [account]);
};
