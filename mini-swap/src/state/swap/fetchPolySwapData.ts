// get1inchSwapData
import Erc20Abi from 'config/abi/erc20.json'
import { get1inchQuoteData, get1inchApproveCallData, get1inchApproveSpender, get1inchSwapData } from 'config/axios'
import { isSupportChainId } from 'config/constants/1inchSwap'
import { PolyDataIndex } from 'state/types'
import multicall from 'utils/multicall'
// supportChainId



const fetchPolySwapData = (chanId, data: PolyDataIndex) => {
  if (!isSupportChainId(chanId)) return null
  try {
    return get1inchSwapData(chanId, data)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const fetchPolyQuoteData = (chanId, data: PolyDataIndex) => {
  if (!isSupportChainId(chanId)) return null
  try {
    return get1inchQuoteData(chanId, data)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const fetchSpenderAddress = async (chanId) => {
  if (!isSupportChainId(chanId)) return null
  try {
    const { address } = await get1inchApproveSpender(chanId)
    return address
  } catch (error) {
    console.error(error)
    return ''
  }
}
export const fetchAllowancceAmount = async (spender: string, account: string, tokenAddress: string) => {
  try {
    const calls = [
      {
        address: spender,
        name: 'allowance',
        params: [account, tokenAddress],
      }
    ]
    const [allowance] = await multicall(Erc20Abi, calls)
    return allowance[0].toJSON().hex
  } catch (error) {
    console.error(error)
    return '0'
  }
}

export const fetchApproveCallData = (chanId, tokenAddress: string) => {
  if (!isSupportChainId(chanId)) return null
  try {
    return get1inchApproveCallData(chanId, { tokenAddress, infinity: true })
  } catch (error) {
    console.error(error)
    return null
  }
}

export default fetchPolySwapData
