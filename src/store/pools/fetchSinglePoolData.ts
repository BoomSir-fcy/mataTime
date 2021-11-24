import multicall from 'utils/multicall'
import { getOracleAddress, getSinglePool } from 'utils/addressHelpers'
import uniq from 'lodash/uniq'
import MutiRewardPoolABI from 'config/abi/MutiRewardPool.json'
import oracleABI from 'config/abi/oracle.json'
import erc20ABI from 'config/abi/erc20.json'
import { SinglePoolData, PoolUserData, UserTokenData } from './types'

export const fetchSinglePoolData = async (): Promise<SinglePoolData[]> => {
  const address = getSinglePool()

  const calls = [
    {
      address,
      name: 'getAllPoolViews'
    },
    {
      address,
      name: 'getBaseInfo'
    },
  ]
  try {
    const [allPoolViews, baseInfo] = await multicall(MutiRewardPoolABI, calls)
    console.log(allPoolViews, baseInfo)
    const pools = allPoolViews[0].map(item => {
      const pool: SinglePoolData = {
        poolAddress: address,
        pid: item.pid.toString(),
        duration: item.duration.toString(),
        allocPoint: item.allocPoint.toString(),
        lastRewardBlock: item.lastRewardBlock.toString(),
        token0RewardsPerBlock: item.token0RewardsPerBlock.toString(),
        token1RewardsPerBlock: item.token1RewardsPerBlock.toString(),
        token0AdditionalRewardPerBlock: item.token0AdditionalRewardPerBlock.toString(),
        token1AdditionalRewardPerBlock: item.token1AdditionalRewardPerBlock.toString(),
        depositToken: baseInfo.depositToken_,
        depositSymbol: item.lpSymbol,
        depositName: item.lpName,
        depositDecimals: Number(item.lpDecimals),
        rewardToken0: baseInfo.rewardToken0_,
        rewardToken0Symbol: item.rewardToken0Symbol,
        rewardToken0Name: item.rewardToken0Name,
        rewardToken0Decimals: Number(item.rewardToken0Decimals),
        rewardToken1: baseInfo.rewardToken1_,
        rewardToken1Symbol: item.rewardToken1Symbol,
        rewardToken1Name: item.rewardToken1Name,
        rewardToken1Decimals: Number(item.rewardToken1Decimals),
        token0AdditionalRewardEndBlock: baseInfo.token0AdditionalRewardEndBlock_.toString(),
        token1AdditionalRewardEndBlock: baseInfo.token1AdditionalRewardEndBlock_.toString(),
        startBlock: baseInfo.startBlock_.toString(),
        bonusEndBlock: baseInfo.bonusEndBlock_.toString(), // 结束区块
        totalAmount: item.totalDeposit.toString(),
      }
      return pool
    })
    console.log(pools)
    return pools
  } catch (error) {
    console.error(error)
    return []
  }
}


export const fetchPoolTokensPrice = async (poolsData: SinglePoolData[]) => {
  const depositTokens = poolsData.map((farm) => farm.depositToken)
  const rewardToken0s = poolsData.map((farm) => farm.rewardToken0)
  const rewardToken1s = poolsData.map((farm) => farm.rewardToken1)
  const tokensUniq = uniq(depositTokens.concat(rewardToken0s).concat(rewardToken1s))
  try {
    const oracleAddress = getOracleAddress()
    const calls0 = tokensUniq.map((address) => {
      return { address: oracleAddress, name: 'getCurrentPrice', params: [address] }
    })

    const currentPrice0 = await multicall(oracleABI, calls0)
    return poolsData.map(pool => {
      const depositTokenPrice = currentPrice0[tokensUniq.indexOf(pool.depositToken)]?.price.toString()
      const rewardToken0Price = currentPrice0[tokensUniq.indexOf(pool.rewardToken0)]?.price.toString()
      const rewardToken1Price = currentPrice0[tokensUniq.indexOf(pool.rewardToken1)]?.price.toString()
      return {
        ...pool,
        depositTokenPrice,
        rewardToken0Price,
        rewardToken1Price,
      }
    })
  } catch (error) {
    console.error(error)
    return poolsData
  }
}


export const fetchSinglePoolUserData = async (account: string): Promise<PoolUserData[]> => {
  const address = getSinglePool()

  const calls = [
    {
      address,
      name: 'getStakingViews',
      params: [account]
    },
  ]
  try {
    const [stakingViews] = await multicall(MutiRewardPoolABI, calls)
    return stakingViews[0].map(item => {
      const poolUserData: PoolUserData = {
        pid: item.pid.toString(),  // 池子id
        stakingId: item.stakingId.toString(),
        stakeAmount: item.amount.toString(),     // 质押的代币数量
        token0UnclaimedRewards: item.token0UnclaimedRewards.toString(), // 奖励代币0的未收获数量
        token1UnclaimedRewards: item.token1UnclaimedRewards.toString(), // 奖励代币1的未收获数量
        time: item.time.toString(), // 质押的开始时间
        unlockTime: item.unlockTime.toString(), // 解锁时间
      }
      return poolUserData
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchUserTokenVal = async (account: string, poolsData: SinglePoolData[]): Promise<UserTokenData[]> => {
  const depositTokens = poolsData.map((farm) => farm.depositToken)
  const tokensUniq = uniq(depositTokens)
  try {
    const calls0 = tokensUniq.map((address) => {
      return { address, name: 'allowance', params: [account, poolsData[0].poolAddress] }
    })
    const calls1 = tokensUniq.map((address) => {
      return { address, name: 'balanceOf', params: [account] }
    })

    const allowances = await multicall(erc20ABI, calls0)
    const balances = await multicall(erc20ABI, calls1)
    return poolsData.map(pool => {
      const allowance = allowances[tokensUniq.indexOf(pool.depositToken)].toString()
      const tokenBalance = balances[tokensUniq.indexOf(pool.depositToken)].toString()
      return {
        pid: pool.pid,
        allowance,
        tokenBalance,
      }
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

