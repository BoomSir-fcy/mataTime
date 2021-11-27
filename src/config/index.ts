import BigNumber from 'bignumber.js';
import { BIG_TEN } from 'utils/bigNumber';
import { ChainId } from './wallet/config';
export const BASE_URL = `${window.location.origin}/`;

export const BASE_BSC_SCAN_URLS = {
  [ChainId.BSC_MAINNET]: 'https://bscscan.com',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com'
};

export const storage = {
  Token: 'token',
  UserInfo: 'userInfo',
  systemCustom: 'systemCustom'
};

export const DEFAULT_GAS_LIMIT = 2000000
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)

export const BSC_BLOCK_TIME = 3
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
