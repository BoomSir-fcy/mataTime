import { ChainId } from '../wallet/config'

export interface Address {
  [ChainId.BSC_MAINNET]: string
  [ChainId.BSC_TESTNET]?: string
}