import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'

const options = {
  // gasLimit: DEFAULT_GAS_LIMIT,
}

export const startSalesNft = async (
  masterChefContract,
  id,
  maxPrice,
  minPrice,
  startTime,
  durationTime,
  nft,
  currency,
  decimal = 18,
) => {
  const maxValue = new BigNumber(maxPrice).times(BIG_TEN.pow(decimal)).toString()
  const minValue = new BigNumber(minPrice).times(BIG_TEN.pow(decimal)).toString()
  const tx = await masterChefContract.startSales(
    id,
    maxValue,
    minValue,
    startTime,
    durationTime,
    nft,
    currency,
    options,
  )
  const receipt = await tx.wait()
  return receipt.status
}

export const cancelSalesNft = async (masterChefContract, id) => {
  const tx = await masterChefContract.cancelSales(id, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const startBuyNft = async (masterChefContract, id, value) => {
  const tx = await masterChefContract.buy(id, { ...options, value })
  const receipt = await tx.wait()
  return receipt.status
}

export const upgradeNft = async (masterChefContract, nftId, materialNftId) => {
  const tx = await masterChefContract.upgradeNft(nftId, materialNftId, options)
  const receipt = await tx.wait()
  const upgradeEvent = receipt.events.find((item) => item.event === 'Upgraded')
  return upgradeEvent?.args || []
}

export const transferFromNft = async (masterChefContract, sender, recipient, tokenId) => {
  const tx = await masterChefContract.transferFrom(sender, recipient, tokenId, options)
  const receipt = await tx.wait()
  return receipt.status
}
