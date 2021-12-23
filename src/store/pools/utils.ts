import BigNumber from "bignumber.js"
import { BLOCKS_PER_YEAR } from "config"
import { getTimeAddress } from "utils/addressHelpers"
import { BIG_TEN } from "utils/bigNumber"
import { PoolUserData, PoolUserDataBase, PoolAprs, SinglePoolData } from "./types"

export const getUserStakesMap = (userPoolData: PoolUserData[]) => {
  const userStakesMap: { [pid: string]: PoolUserData[] } = {}
  userPoolData.forEach(item => {
    if (!userStakesMap[item.pid]) {
      userStakesMap[item.pid] = [{ ...item }]
    } else {
      userStakesMap[item.pid] = userStakesMap[item.pid].concat({ ...item })
    }
  })
  return userStakesMap
}

export const getUserPoolsMap = (userPoolData: PoolUserData[]) => {
  const farmatUserPoolsMap: { [pid: string]: PoolUserDataBase } = {}
  userPoolData.forEach(item => {
    if (!farmatUserPoolsMap[item.pid]) {
      farmatUserPoolsMap[item.pid] = {
        stakeAmount: item.stakeAmount,
        token0UnclaimedRewards: item.token0UnclaimedRewards,
        token1UnclaimedRewards: item.token1UnclaimedRewards,
        pid: item.pid,
      }
    } else {
      const stakeAmount = new BigNumber(farmatUserPoolsMap[item.pid].stakeAmount).plus(item.stakeAmount).toString()
      const token0UnclaimedRewards = new BigNumber(farmatUserPoolsMap[item.pid].token0UnclaimedRewards).plus(item.token0UnclaimedRewards).toString()
      const token1UnclaimedRewards = new BigNumber(farmatUserPoolsMap[item.pid].token1UnclaimedRewards).plus(item.token1UnclaimedRewards).toString()
      farmatUserPoolsMap[item.pid] = {
        stakeAmount,
        token0UnclaimedRewards,
        token1UnclaimedRewards,
        pid: item.pid,
      }
    }
  })
  return Object.values(farmatUserPoolsMap)
}

// 基础 = 区块产出 * 每年区块数 / 精度 * 价格 / 池子总质押价值(totalLiquidity) * 100
const getBaseApr = (
  rewardsPerBlock,
  decimals,
  price,
  totalLiquidity,
) => {
  return new BigNumber(rewardsPerBlock).times(BLOCKS_PER_YEAR).div(BIG_TEN.pow(decimals)).times(price).div(totalLiquidity).times(100).toNumber()
}

// (TimeToken)没有捐赠
const getDenateApr = (
  token: string,
  totalDonateAmount,
  decimals,
  price,
  totalLiquidity
) => {
  return token.toLowerCase() === getTimeAddress()?.toLowerCase()
    ?
    0
    :
    new BigNumber(totalDonateAmount).div(BIG_TEN.pow(decimals)).times(price).div(totalLiquidity).times(100).toNumber()
}

// (TimeToken)没有捐赠
const getTotalApr = (
  baseApr,
  addtionalApr,
  donateApr,
) => {
  return baseApr + addtionalApr + donateApr
}

export const getPoolsApr = (pool: SinglePoolData, totalDonateAmount: string): PoolAprs => {
  /**
   * 
   * @dev 获取池子年化收益率
   * @params pools 池子列表
   * @params donateAprs 池子列表对应的捐赠apr列表
   * @tips (TIME)没有捐赠
   * @return { PoolAprs } poolAprs 年化收益
   * 
   * 总收益 = TimeToken(基础 + 附加) + token1(基础 + 附加 + 捐赠)
   * 基础 = 区块产出 * 每年区块数 / 精度 * 价格 / 池子总质押价值(totalLiquidity) * 100
   * 附加 = 附加区块产出 * 每年区块数 / 精度 * 价格 / 池子总质押价值(totalLiquidity) * 100
   */
  const token0baseApr = getBaseApr(pool.token0RewardsPerBlock, pool.rewardToken0Decimals, pool.rewardToken0Price, pool.totalLiquidity)
  const token1baseApr = getBaseApr(pool.token1RewardsPerBlock, pool.rewardToken1Decimals, pool.rewardToken1Price, pool.totalLiquidity)
  const token0additionalApr = getBaseApr(pool.token0AdditionalRewardPerBlock, pool.rewardToken0Decimals, pool.rewardToken0Price, pool.totalLiquidity)
  const token1additionalApr = getBaseApr(pool.token1AdditionalRewardPerBlock, pool.rewardToken1Decimals, pool.rewardToken1Price, pool.totalLiquidity)

  const token0donateApr = getDenateApr(pool.rewardToken0, totalDonateAmount, pool.rewardToken0Decimals, pool.rewardToken0Price, pool.totalLiquidity)
  const token0totalApr = getTotalApr(token0baseApr, token0additionalApr, token0donateApr)

  const token1donateApr = getDenateApr(pool.rewardToken1, totalDonateAmount, pool.rewardToken1Decimals, pool.rewardToken1Price, pool.totalLiquidity)
  const token1totalApr = getTotalApr(token1baseApr, token1additionalApr, token1donateApr)

  return {
    token0baseApr,
    token0additionalApr, // 附加奖励年化收益
    token0donateApr,  // 捐赠奖励年化收益
    token0totalApr, // 基础奖励年化收益
    token1baseApr,
    token1additionalApr,
    token1donateApr,
    token1totalApr,
    totalApr: token0totalApr + token1totalApr, // 池子总年化收益
  }
}
