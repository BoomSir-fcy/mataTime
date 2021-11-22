import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getBep20Contract,
  getErc721Contract,
  getMulticallContract,
  getDsgNftContract,
  getErc20EarnNftPoolContract,
  getTimeShopContract
  getLiquidityPoolContract
} from 'utils/contractHelpers'
import { getContract } from 'utils/contract'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import ERC20_ABI from '../config/abi/erc20.json'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address, library.getSigner()), [address, library])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getErc721Contract(address, library.getSigner()), [address, library])
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}


export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => getMulticallContract(), [chainId])
}

export const useDsgNft = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getDsgNftContract(address, library.getSigner()), [address, library])
}
export const useErc20EarnNftPool = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getErc20EarnNftPoolContract(library.getSigner()), [library])
}
export const useTimeShop = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getTimeShopContract(library.getSigner()), [library])
}

export const useLiquidityPool = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getLiquidityPoolContract(library.getSigner()), [library])
}
