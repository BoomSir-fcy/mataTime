import { ChainId } from './wallet/config'
export const BASE_URL = `${window.location.origin}/#`

export const BASE_BSC_SCAN_URLS = {
  [ChainId.BSC_MAINNET]: 'https://bscscan.com',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
}

export const storage = {
  Token: "token"
}