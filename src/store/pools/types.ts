declare type address = string


export interface PoolUserDataBase {
  pid: string,  //池子id
  stakeAmount: string,     // 质押的代币数量
  token0UnclaimedRewards: string, //奖励代币0的未收获数量
  token1UnclaimedRewards: string, //奖励代币1的未收获数量
}

export interface PoolUserData extends PoolUserDataBase {
  stakingId: string,
  time: string, //质押的开始时间
  unlockTime: string, //解锁时间
}

export interface UserTokenData {
  allowance: string
  pid: string,  //池子id
  tokenBalance: string // 质押代币余额
}
export interface UserData extends PoolUserData, UserTokenData { }

export interface SinglePoolBaseInfo {
  token0AdditionalRewardEndBlock: string
  token1AdditionalRewardEndBlock: string
  startBlock: string
  bonusEndBlock: string
}
export interface PoolsBase {
  loaded: boolean
  userDataMap: {
    [pid: string]: UserData
  }
}

export interface PoolDataBase {
  totalAmount: string // 当前总质押量
  allocPoint: string // 权重
  pid: string
  poolAddress: address
}
export interface LiquidityPoolData extends PoolDataBase {
  token0: address
  token1: address
  symbol1: string
  symbol2: string
  decimals0: string
  decimals1: string
}

export interface PoolAprs {
  token0baseApr: number // 基础奖励年化收益
  token0additionalApr: number // 附加奖励年化收益
  token0donateApr: number  // 捐赠奖励年化收益
  token0totalApr: number // 总年化收益
  token1baseApr: number
  token1additionalApr: number
  token1donateApr: number
  token1totalApr: number
  totalApr: number // 池子总年化收益
}

export interface SinglePoolData extends PoolDataBase, SinglePoolBaseInfo {
  duration: string  // 最小需要质押的时间，秒
  lastRewardBlock: string  // 最后奖励区块
  token0RewardsPerBlock: string // token0每区块奖励数
  token1RewardsPerBlock: string // token1每区块奖励数
  token0AdditionalRewardPerBlock: string // token0每区块附加奖励数
  token1AdditionalRewardPerBlock: string // token1每区块附加奖励数
  rewardToken0: address
  rewardToken0Symbol: string
  rewardToken0Name: string
  rewardToken0Decimals: number
  rewardToken1: address
  rewardToken1Symbol: string
  rewardToken1Name: string
  rewardToken1Decimals: number
  depositToken: address; // 质押代币地址
  depositSymbol: string, //质押代币标识
  depositName: string, //质押代币名称
  depositDecimals: number, //质押代币小数位
  depositTokenPrice?: string, // 代币价格 (计算精度后的值, eg: 1.237 === $1.237)
  rewardToken0Price?: string, // 代币价格 (计算精度后的值, eg: 1.237 === $1.237)
  rewardToken1Price?: string, // 代币价格 (计算精度后的值, eg: 1.237 === $1.237)
  totalLiquidity?: string, // 质押代币价值(计算精度后的值, eg: 1.237 === $1.237)
}

export interface LiquidityPool extends PoolsBase {
  data: LiquidityPoolData[]
}
export interface SinglePool extends PoolsBase {
  data: SinglePoolData[]
  userStakesMap: {
    [pid: string]: PoolUserData[]
  }
  poolAprMap: {
    [pid: string]: PoolAprs
  }
}

export interface PoolsState {
  liquidity: LiquidityPool
  single: SinglePool
}
