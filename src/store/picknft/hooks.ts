import { useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  fetchNftApprovalAsync,
  fetchStuffAllLimitsAsync,
  fetchTicketAllowanceAsync,
  fetchTicketPriceAsync,
  fetchCodeInfoAsync,
  fetchInviteInfoAsync,
} from '.';
import { State, PickNftState } from '../types';
import { fetchInviteInfo } from './fetchInviteInfo';


export const usePickNftState = () => {
  const pickNft = useSelector((p: {
    pickNft: PickNftState
  }) => p.pickNft)
  return pickNft
}

export const useFetchInviteInfo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInviteInfoAsync())
  }, [dispatch])
}

export const useFetchCodeInfo = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { codes } = usePickNftState()

  useEffect(() => {

    if (account && codes.lock_hash) {
      dispatch(fetchCodeInfoAsync(codes.lock_hash));
    }
  }, [dispatch, account, codes.lock_hash]);
};

export const useFetchNftApproval = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      dispatch(fetchNftApprovalAsync(account));
    }
  }, [dispatch, account]);
};

export const useFetchTicketNftApproval = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      dispatch(fetchTicketAllowanceAsync(account));
    }
  }, [dispatch, account]);
};
export const useFetchTicketInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTicketPriceAsync());
  }, [dispatch]);
};

export const useFetchStuffAllInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStuffAllLimitsAsync());
  }, [dispatch]);
};
