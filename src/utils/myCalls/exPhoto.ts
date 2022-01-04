import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'

const options = {
  // gasLimit: DEFAULT_GAS_LIMIT,
}


export const exchangeToPhtot = async (masterChefContract, fromTokenID, created, color) => {
  const tx = await masterChefContract.exchangeTo(fromTokenID, created, color, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const buyTicketNft = async (masterChefContract, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const tx = await masterChefContract.buyTicketNFT(amount)
  const receipt = await tx.wait()
  return receipt.status
}