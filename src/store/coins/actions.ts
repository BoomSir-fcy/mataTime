import { createAction } from '@reduxjs/toolkit';

export interface coinsProps {
  symbol: string;
  projectLink: string;
  address: {
    [number: string]: string;
  };
  decimals: number;
}

export const setTopicCoins = createAction<coinsProps>('app/topic/coins');
