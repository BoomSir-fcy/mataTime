import {
  ChainId, JSBI, Percent, Token, WETHER, BUSD,
  MBT, USDT, USDC, VAI, WETH, WBTC, DSG, DAI,
  XVS,
} from 'dsgswap-sdk'
import { getAddress } from 'utils/addressHelpers'


// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.MATIC_TESTNET]: [
    WETHER[ChainId.MATIC_TESTNET],
    MBT[ChainId.MATIC_TESTNET],
    USDT[ChainId.MATIC_TESTNET],
    USDC[ChainId.MATIC_TESTNET],
    WETH[ChainId.MATIC_TESTNET],
    WBTC[ChainId.MATIC_TESTNET],
  ],
  [ChainId.MATIC_MAINNET]: [
    WETHER[ChainId.MATIC_MAINNET],
    MBT[ChainId.MATIC_MAINNET],
    USDT[ChainId.MATIC_MAINNET],
    WETH[ChainId.MATIC_MAINNET],
    WBTC[ChainId.MATIC_MAINNET],
    // ETH,
    // USDC[ChainId.MATIC_MAINNET],
    // DAI,
  ],
  [ChainId.MAINNET]: [
    WETHER[ChainId.MAINNET],
    DSG[ChainId.MAINNET],
    BUSD[ChainId.MAINNET],
    USDT[ChainId.MAINNET],
    USDC[ChainId.MAINNET],
  ],
  [ChainId.TESTNET]: [
    WETHER[ChainId.TESTNET],
    DSG[ChainId.TESTNET],
    BUSD[ChainId.TESTNET],
    USDT[ChainId.TESTNET],
    USDC[ChainId.TESTNET],
  ],
  
}

/**
 * Addittional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
  [ChainId.TESTNET]: {},
  [ChainId.MATIC_MAINNET]: {},
  [ChainId.MATIC_TESTNET]: {},
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WETHER[ChainId.MAINNET]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
  [ChainId.TESTNET]: {},
  [ChainId.MATIC_MAINNET]: {},
  [ChainId.MATIC_TESTNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.MATIC_MAINNET]: [
    MBT[ChainId.MATIC_MAINNET], WETH[ChainId.MATIC_MAINNET], USDC[ChainId.MATIC_MAINNET], USDT[ChainId.MATIC_MAINNET],
    DSG[ChainId.MATIC_MAINNET], DAI[ChainId.MATIC_MAINNET], WBTC[ChainId.MATIC_MAINNET]
  ],
  [ChainId.MATIC_TESTNET]: [
    MBT[ChainId.MATIC_TESTNET], WETH[ChainId.MATIC_TESTNET], USDC[ChainId.MATIC_TESTNET], USDT[ChainId.MATIC_TESTNET],
    DSG[ChainId.MATIC_TESTNET], DAI[ChainId.MATIC_TESTNET]
  ],
  [ChainId.MAINNET]: [BUSD[ChainId.MAINNET], DSG[ChainId.MAINNET], USDT[ChainId.MAINNET], VAI[ChainId.MAINNET], XVS[ChainId.MAINNET]],
  [ChainId.TESTNET]: [DSG[ChainId.TESTNET], BUSD[ChainId.TESTNET], USDT[ChainId.TESTNET], VAI[ChainId.TESTNET], XVS[ChainId.TESTNET]],

}
// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.MATIC_MAINNET]: [
    WETHER[ChainId.MATIC_MAINNET], USDT[ChainId.MATIC_MAINNET]
  ],
  [ChainId.MATIC_TESTNET]: [
    WETHER[ChainId.MATIC_TESTNET], USDT[ChainId.MATIC_TESTNET]
  ],
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET], BUSD[ChainId.MAINNET], USDT[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET], DSG[ChainId.TESTNET], BUSD[ChainId.TESTNET]],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [DSG[ChainId.MAINNET], WETHER[ChainId.MAINNET]],
    [BUSD[ChainId.MAINNET], USDT[ChainId.MAINNET]],
    [DSG[ChainId.MAINNET], BUSD[ChainId.MAINNET]],
  ],
  [ChainId.MATIC_TESTNET]: [
    [MBT[ChainId.MATIC_TESTNET], WETHER[ChainId.MATIC_TESTNET]],
    [MBT[ChainId.MATIC_TESTNET], USDC[ChainId.MATIC_TESTNET]],
    [WETHER[ChainId.MATIC_TESTNET], USDC[ChainId.MATIC_TESTNET]],
    [WETH[ChainId.MATIC_TESTNET], USDC[ChainId.MATIC_TESTNET]],
  ],
  [ChainId.MATIC_MAINNET]: [
    [MBT[ChainId.MATIC_MAINNET], WETH[ChainId.MATIC_MAINNET]],
    [MBT[ChainId.MATIC_MAINNET], USDC[ChainId.MATIC_MAINNET]],
    [WETHER[ChainId.MATIC_MAINNET], USDC[ChainId.MATIC_MAINNET]],
    [WETH[ChainId.MATIC_MAINNET], USDC[ChainId.MATIC_MAINNET]],

  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses(美国海外资产控制办公室地址)
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
]

// 单币池有质押后只能取出的池子
export const SINGLE_POOL_STAKE_ONLY_NEST = [
  '0x7Cd583FcFBA17bB0D1F4c66431A28C389C976512',
]

export const MBT_TO_FRAGMENT_RATE = {
  MBTPF: 140,
  MBTCF: 20,
}
