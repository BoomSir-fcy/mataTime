import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { BIG_TEN } from 'utils/bigNumber'
import { callWithEstimateGas } from './estimateGas'

const options = {
  gasLimit: 177118,
}
const harvestOptions = {
  gasLimit: 477118,
}
const harvestAllOptions = {
  gasLimit: 16_406_000,
}
const withdrawOptions = {
  gasLimit: 16_406_000,
}


export const harvestPool = async (masterChefContract) => {

  const tx = await masterChefContract.withdraw('0', harvestOptions)
  // const receipt = await tx.wait()
  // return receipt.status
  return tx
}
export const emergencyWithdrawPool = async (masterChefContract) => {

  const tx = await masterChefContract.emergencyWithdraw()
  // const receipt = await tx.wait()
  // return receipt.status
  return tx
}

export const withdrawPool = async (masterChefContract, amount, decimal) => {  
  const value = new BigNumber(amount).times(BIG_TEN.pow(decimal)).toString()
  const tx = await masterChefContract.withdraw(value, harvestOptions)
  const receipt = await tx.wait()
  return receipt.status
}

export const depositPool = async (masterChefContract, amount, decimal) => {
  const value = new BigNumber(amount).times(BIG_TEN.pow(decimal)).toString()
  const tx = await masterChefContract.deposit(value, harvestOptions)
  const receipt = await tx.wait()
  return receipt.status
}