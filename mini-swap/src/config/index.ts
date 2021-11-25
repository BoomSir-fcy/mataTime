import { ChainId, BASE_BSC_SCAN_URLS } from 'dsgswap-sdk'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 2.5

export const ONE_DAY_TIME = 86_400_000 // 一天的时间毫秒数

// export const BASE_BSC_SCAN_URLS = {
//   [ChainId.MAINNET]: 'https://polygonscan.com',
//   [ChainId.MATIC_TESTNET]: 'https://mumbai.polygonscan.com',
//   [ChainId.TESTNET]: 'https://mumbai.polygonscan.com',
// }

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 9 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
export const CAKE_PER_BLOCK = new BigNumber(40)
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const BLOCKS_PER_DAY = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24)
export const CAKE_PER_YEAR = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BASE_URL = `${window.location.origin}/#`
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_URL}/pool`
export const BASE_LIQUIDITY_FARM_URL = `${BASE_URL}/farms`
export const BASE_TRADE_SWAP_URL_OUT = `${BASE_URL}/swap?outputCurrency=`
export const BASE_TRADE_SWAP_URL_IN = `${BASE_URL}/swap?inputCurrency=`
export const BASE_VDSG_INVITE_URL = `${BASE_URL}/vmbt?v=`
export const BASE_NFT_MYSTERY_URL = `${BASE_URL}/mall`
export const BASE_NFT_BAG_URL = `${BASE_URL}/nft/`
export const BASE_TOKEN_URL = 'https://dsgmetaverse.com/images/tokens/'
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET]
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 2000000
export const DEFAULT_GAS_PRICE = 5
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
export const TRADING_FEE_RATE = new BigNumber(3).div(1000)
export const PRICE_USD_PER_POWER = new BigNumber(1) // 每算力价值多少USD
