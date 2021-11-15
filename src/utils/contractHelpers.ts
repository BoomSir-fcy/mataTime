import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'
import dsgnftAbi from 'config/abi/dsgnft.json'
import nftSocialAbi from 'config/abi/nftSocial.json'


// Addresses
import {
  getAddress,
  getMulticallAddress,
  getNftSocialAddress
} from 'utils/addressHelpers'

// ABI
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import MultiCallAbi from 'config/abi/Multicall.json'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721Abi, address, signer)
}


export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}

export const getDsgNftContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(dsgnftAbi, address, signer)
}
export const getErc20EarnNftPoolContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftSocialAbi, getNftSocialAddress(), signer)
}