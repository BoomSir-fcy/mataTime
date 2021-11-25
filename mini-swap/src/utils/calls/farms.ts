import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { callWithEstimateGas } from './estimateGas'

const options = {
  // gasLimit: DEFAULT_GAS_LIMIT,
}
const harvestOptions = {
  gasLimit: 834060,
}
const harvestAllOptions = {
  gasLimit: 16_406_000,
}

export const stakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const tx = await masterChefContract.deposit(pid, value, options)
  const receipt = await tx.wait()
  return receipt.status
}
export const stakeErc20Farm = async (masterChefContract, pid) => {
  const tx = await masterChefContract.stake(pid, options)
  const receipt = await tx.wait()
  return receipt.status
}
export const stakeNftsFarm = async (masterChefContract, nftIds) => {
  const tx = await masterChefContract.batchStake(nftIds, options)
  const receipt = await tx.wait()
  return receipt.status
}
export const stakeNftFarm = async (masterChefContract, nftsId) => {
  const tx = await masterChefContract.stake(nftsId, options)
  const receipt = await tx.wait()
  return receipt.status
}
export const stakeNftSlotFarm = async (masterChefContract, index, nftsId) => {
  const tx = await masterChefContract.slotStake(index, nftsId, options)
  const receipt = await tx.wait()
  return receipt.status
}
export const replaceNftSlotFarm = async (masterChefContract, index, nftsId) => {
  const tx = await masterChefContract.slotReplace(index, nftsId, options)
  const receipt = await tx.wait()
  return receipt.status
}
export const additionalNftFarm = async (masterChefContract, pid, nftId) => {
  const tx = await masterChefContract.additionalNft(pid, nftId, options)
  const receipt = await tx.wait()
  return receipt.status
}
// TODO: 检查这个方法有没有在使用
export const depositFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const tx = await masterChefContract.deposit(2, value, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const tx = await masterChefContract.withdraw(pid, value, options)
  const receipt = await tx.wait()
  return receipt.status
}
export const unstakeErc20Farm = async (masterChefContract, pid, sid) => {
  const tx = await masterChefContract.forceWithdraw(pid, sid, options)
  const receipt = await tx.wait()
  return receipt.status
}
export const unstakeNftFarm = async (masterChefContract, tokenId) => {
  const tx = await masterChefContract.withdraw(tokenId, options)
  const receipt = await tx.wait()
  return receipt.status
}
export const unstakeAllNftFarm = async (masterChefContract) => {
  const tx = await masterChefContract.withdrawAll(options)
  const receipt = await tx.wait()
  return receipt.status
}
export const unstakeSlotNftFarm = async (masterChefContract, slot: string) => {
  const tx = await masterChefContract.withdrawSlot(slot, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (masterChefContract, pid) => {
  // if (pid === 0) {
  //   const tx = await await masterChefContract.leaveStaking('0', options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }

  const tx = await masterChefContract.withdraw(pid, '0', options)
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarmTx = async (masterChefContract, pid) => {

  // const tx = await callWithEstimateGas(masterChefContract, 'withdraw', [pid, '0'])
  const tx = await masterChefContract.withdraw(pid, '0', harvestOptions)
  // const receipt = await tx.wait()
  return tx
}

export const harvestAll = async (masterChefContract) => {
  const tx = await masterChefContract.harvestAll(harvestAllOptions)
  const receipt = await tx.wait()
  return receipt.status
}
export const harvestAirDrop = async (masterChefContract) => {
  const tx = await masterChefContract.withdraw(harvestAllOptions)
  return tx
}
export const harvestAllTx = async (masterChefContract) => {
  // const tx = await callWithEstimateGas(masterChefContract, 'harvestAll')
  const tx = await masterChefContract.harvestAll(harvestAllOptions)
  // const receipt = await tx.wait()
  return tx
  // return receipt.status
}

export const harvestAllFarm = async (masterChefContract) => {
  // const tx = await callWithEstimateGas(masterChefContract, 'harvestFarm')
  const tx = await masterChefContract.harvestFarm(harvestOptions)
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestErc20 = async (masterChefContract, pid, sid) => {
  // const tx = await callWithEstimateGas(masterChefContract, 'harvest', [pid, sid])
  const tx = await masterChefContract.harvest(pid, sid, harvestOptions)
  const receipt = await tx.wait()
  return receipt.status
}
export const harvestNft = async (masterChefContract) => {

  // const tx = await callWithEstimateGas(masterChefContract, 'harvest')
  const tx = await masterChefContract.harvest(harvestOptions)
  const receipt = await tx.wait()
  return receipt.status
}
