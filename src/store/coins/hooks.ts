import BigNumber from 'bignumber.js';
import useRefresh from 'hooks/useRefresh';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../index';
import { fetchCoinInfoAsync, fetchCoinsListAsync } from './reducer';

const REFRESH_INTERVAL = 5 * 60 * 1000;

export const useFetchCoinsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { slowRefresh } = useRefresh();

  useEffect(() => {
    dispatch(fetchCoinsListAsync());
  }, [slowRefresh, dispatch]);
};

export const useFetchCoinInfo = coinId => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (coinId) {
      dispatch(fetchCoinInfoAsync(coinId));
    }
  }, [coinId, dispatch]);
};

export function useCoinsState(): AppState['coins'] {
  return useSelector<AppState, AppState['coins']>(state => state.coins);
}

export function useCoinsMap(): {
  [coinId: string]: Api.Coins.CoinInfo;
} {
  const { data } = useCoinsState();
  return data;
}

export function useCoinsList(): Api.Coins.CoinInfo[] {
  const { data } = useCoinsState();
  return Object.values(data);
}
