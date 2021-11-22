import { BIG_TEN } from 'src/utils/bigNumber';
import { ChainId } from './wallet/config';

export const BASE_URL = `${window.location.origin}/#`;

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
