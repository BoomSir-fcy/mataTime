import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  fetchNftApprovalAsync,
  fetchStuffAllLimitsAsync,
  fetchTicketAllowanceAsync,
  fetchTicketPriceAsync,
  fetchCodeUsedAsync,
} from '.';
import { State, PickNftState } from '../types';

export const useFetchCodeUsed = code => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account && code) {
      dispatch(fetchCodeUsedAsync(code));
    }
  }, [dispatch, account]);
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
