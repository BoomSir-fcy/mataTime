import { Token, TokenForChainId, WETHER, SWAP_TOKEN, getValueWithChainId, contractAddress } from 'dsgswap-sdk'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  return getValueWithChainId(address)
}

export const getToken = (token: TokenForChainId): Token => {
  return getValueWithChainId(token)
}

export const getDsgAddress = () => {
  return getToken(SWAP_TOKEN).address
}
export const getMulticallAddress = () => {
  return getAddress(contractAddress.multiCall)
}
export const getWbnbAddress = () => {
  return getToken(WETHER).address
}
