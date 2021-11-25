import { ChainId, contractAddress } from 'dsgswap-sdk'
import MULTICALL_ABI from '../../abi/Multicall.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  ...contractAddress.multiCall,
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
