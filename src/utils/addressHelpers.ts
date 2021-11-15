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