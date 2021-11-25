import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, CAKE_PER_YEAR, DEFAULT_TOKEN_DECIMAL, PRICE_USD_PER_POWER } from 'config'
import { USDC } from 'dsgswap-sdk'
import { getToken } from './addressHelpers'
import { BIG_ONE, BIG_ZERO } from './bigNumber'
import { getBalanceAmount } from './formatBalance'

const usdc = getToken(USDC)

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get Trading APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getTradingApr = (
  stakingTokenPrice: BigNumber,
  rewardTokenPrice: BigNumber,
  tokenPerBlock: BigNumber,
  decimals?: number
): string => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR).div(DEFAULT_TOKEN_DECIMAL)
  const totalStakingTokenInPool = stakingTokenPrice.eq(0) ? BIG_ZERO : getBalanceAmount(stakingTokenPrice, usdc.decimals)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toFixed(2)
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (
  fourRealAmount: BigNumber,
  cakePriceUsd: BigNumber,
  rewardsPerBlock: BigNumber,
  poolLiquidityUsd: BigNumber,
  farmAddress: string,
): { cakeRewardsApr: number; lpRewardsApr: number } => {

  const yearlyCakeRewardAllocation = rewardsPerBlock.times(BLOCKS_PER_YEAR).div(DEFAULT_TOKEN_DECIMAL)
  const cakeRewardsApr = yearlyCakeRewardAllocation.times(cakePriceUsd).div(poolLiquidityUsd).times(100)
  let cakeRewardsAprAsNumber = null
  if (!cakeRewardsApr.isNaN() && cakeRewardsApr.isFinite()) {
    cakeRewardsAprAsNumber = cakeRewardsApr.toNumber()
  }
  let lpRewardsApr = 0
  if (fourRealAmount.isFinite() && fourRealAmount.isGreaterThan(0)) {
    // 交易手续费年化利率
    const yearlyDsgReward = fourRealAmount.div(DEFAULT_TOKEN_DECIMAL)
    const dsgRewardsApr = yearlyDsgReward.times(cakePriceUsd).div(poolLiquidityUsd).times(100)
    if (!dsgRewardsApr.isNaN() && dsgRewardsApr.isFinite()) {
      lpRewardsApr = dsgRewardsApr.toNumber()
    }
  }
  return { cakeRewardsApr: cakeRewardsAprAsNumber, lpRewardsApr }
}

/**
 * Get single pool APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getSinglePoolApr = (
  rewardsTokenPrice: BigNumber,
  rewardsPerBlock: BigNumber,
  poolLiquidityUsd: BigNumber,
): { cakeRewardsApr: number; } => {
  const yearlyCakeRewardAllocation = rewardsPerBlock.times(BLOCKS_PER_YEAR).div(DEFAULT_TOKEN_DECIMAL)
  const cakeRewardsApr = yearlyCakeRewardAllocation.times(rewardsTokenPrice).div(poolLiquidityUsd).times(100)
  let cakeRewardsAprAsNumber = null
  if (!cakeRewardsApr.isNaN() && cakeRewardsApr.isFinite()) {
    cakeRewardsAprAsNumber = cakeRewardsApr.toNumber()
  }
  return { cakeRewardsApr: cakeRewardsAprAsNumber }
}

export const getNftFarmApr = (
  cakePriceUsd: BigNumber,
  rewardsPerBlock: BigNumber,
  poolTotalPowers: BigNumber,
): number => {
  const yearlyCakeRewardAllocation = rewardsPerBlock.times(BLOCKS_PER_YEAR).div(DEFAULT_TOKEN_DECIMAL)
  const poolTotalPowersUsd = poolTotalPowers.times(PRICE_USD_PER_POWER)
  const cakeRewardsApr = yearlyCakeRewardAllocation.times(cakePriceUsd).div(poolTotalPowersUsd).times(100)
  let cakeRewardsAprAsNumber = null
  if (!cakeRewardsApr.isNaN() && cakeRewardsApr.isFinite()) {
    cakeRewardsAprAsNumber = cakeRewardsApr.toNumber()
  }
  return cakeRewardsAprAsNumber
}

export const getMemberBaseApr = (dsgPerBlock: BigNumber, stakedDsg: BigNumber): number => {
  const yearlyCakeRewardAllocation = dsgPerBlock.times(BLOCKS_PER_YEAR)
  const cakeRewardsApr = yearlyCakeRewardAllocation.div(stakedDsg).times(100)
  let cakeRewardsAprAsNumber = null
  if (cakeRewardsApr.isLessThanOrEqualTo(0)) return cakeRewardsAprAsNumber
  if (!cakeRewardsApr.isNaN() && cakeRewardsApr.isFinite()) {
    cakeRewardsAprAsNumber = cakeRewardsApr.toNumber()
  }
  return cakeRewardsAprAsNumber
}

export const getMemberDonaApr = (donateAmount3: BigNumber, donateDt: number, stakedDsg: BigNumber): number => {
  const donateYear = donateAmount3.div(donateDt).times(86400).times(365).times(100)
  const donateApr = donateYear.div(stakedDsg)
  let donateAprAsNumber = null
  if (donateApr.isLessThanOrEqualTo(0)) return donateAprAsNumber
  if (!donateApr.isNaN() && donateApr.isFinite()) {
    donateAprAsNumber = donateApr.toNumber()
  }
  return donateAprAsNumber
}

export const getMemberFeeApr = (feeAmount3: BigNumber, feeDt: number, stakedDsg: BigNumber): number => {
  const feeYear = feeAmount3.div(feeDt).times(86400).times(365).times(100)
  const feeAPY = feeYear.div(stakedDsg)
  let feeAPYAsNumber = null
  if (feeAPY.isLessThanOrEqualTo(0)) return feeAPYAsNumber
  if (!feeAPY.isNaN() && feeAPY.isFinite()) {
    feeAPYAsNumber = feeAPY.toNumber()
  }
  return feeAPYAsNumber
}

export const getMemberTotalApr = (baseAPY: number, donateAPY: number, feeAPY: number): number => {
  const totalAPY = new BigNumber(baseAPY || 0).plus(donateAPY || 0).plus(feeAPY || 0)
  let totalAPYAsNumber = null
  if (totalAPY.isLessThanOrEqualTo(0)) return totalAPYAsNumber
  if (!totalAPY.isNaN() && totalAPY.isFinite()) {
    totalAPYAsNumber = totalAPY.toNumber()
  }
  return totalAPYAsNumber
}

export default null
