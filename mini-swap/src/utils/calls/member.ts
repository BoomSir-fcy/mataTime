import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'

const options = {
  // gasLimit: DEFAULT_GAS_LIMIT,
}

export const mintVDSG = async (masterChefContract, amount, dsgTeam) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const tx = await masterChefContract.mint(value, dsgTeam, options)
  const receipt = await tx.wait()
  return receipt.status
}

/**
 * @dev 赎回vDSG
 * @param vDsgAmount 要赎回的vDSG数量
 * @param all 是否全部赎回
 */
export const unstakeVDsg = async (masterChefContract, amount, all) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const tx = await masterChefContract.redeem(value, all, options)
  const receipt = await tx.wait()
  return receipt.status
}

/**
 * @dev 赎回vDSG
 * @param vDsgAmount 要赎回的vDSG数量
 * @param all 是否全部赎回
 */
export const getWithdrawResult = async (masterChefContract, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const tx = await masterChefContract.getWithdrawResult(value, options)
  const receipt = await tx.wait()
  return receipt.status
}
