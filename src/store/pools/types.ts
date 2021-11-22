export type address = string

export interface PoolUserData {
  allowance: string
  stakedBalance: string // 质押数量
  tokenBalance: string // 质押代币余额
  earnings: string // 待领取金额
  poolId: string // 待领取金额
}
export interface PoolsBase {
  loaded: boolean
  userData?: PoolUserData
}

export interface PoolDataBase {
  totalAmount: string // 当前总质押量
  poolAddress: address
  stakeToken: address
  poolId: string
}
export interface LiquidityPoolData extends PoolDataBase {
  token0: address
  token1: address
  symbol1: string
  symbol2: string
  decimals0: string
  decimals1: string
}

export interface SinglePoolData extends PoolDataBase {
  token: address
  symbol: string
  decimals: string
}

export interface LiquidityPool extends PoolsBase {
  data: LiquidityPoolData[]
}
export interface SinglePool extends PoolsBase {
  data: SinglePoolData[]
}

export interface PoolsState {
  liquidity: LiquidityPool
  single: SinglePool
}
