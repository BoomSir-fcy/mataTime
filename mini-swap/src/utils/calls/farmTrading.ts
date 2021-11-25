import { DEFAULT_GAS_LIMIT } from 'config'
import { callWithEstimateGas } from './estimateGas'

const options = {
  // gasLimit: DEFAULT_GAS_LIMIT,
}

const harvestOptions = {
  gasLimit: 834060,
}

export const harvestFarmTrading = async (masterChefContract, pid) => {
  // const tx = await callWithEstimateGas(masterChefContract, 'deposit', [pid, '0'])
  const tx = await masterChefContract.deposit(pid, '0', harvestOptions)
  const receipt = await tx.wait()
  return receipt.status
}

export const getFarmTradingList = async (masterChefContract, pid) => {
  const tx = await masterChefContract.deposit(pid, '0', harvestOptions)
  // const tx = await callWithEstimateGas(masterChefContract, 'deposit', [pid, '0'])
  const receipt = await tx.wait()
  return receipt.status
}
