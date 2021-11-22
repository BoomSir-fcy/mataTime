import { ChainId } from 'config/wallet/config'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[ChainId.BSC_MAINNET]
}

export const getTestAddress = () => {
  return getAddress(addresses.test)
}

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}

export const getNftSocialAddress = () => {
  return getAddress(addresses.nftSocial)
}

export const getTimeShopAddress = () => {
  return getAddress(addresses.TimeShop)
}

export const getDsgAddress = () => {
  return getAddress(addresses.Dsg)
}
export const getTimeAddress = () => {
  return getAddress(addresses.TimeToken)
}
export const getLiquidityPool = () => {
  return getAddress(addresses.liquidityPool)
}

export const getSinglePool = () => {
  return getAddress(addresses.singlePool)
}