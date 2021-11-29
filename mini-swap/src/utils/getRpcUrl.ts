import sample from 'lodash/sample'
import { ETHEREUM_CHAIN, chainIdProxy, ChainId } from 'dsgswap-sdk'

const getNodeUrl = (chainId?: ChainId) => {
  // return process.env.REACT_APP_NODE_3
  return sample(ETHEREUM_CHAIN[chainId || chainIdProxy.chainId].rpcUrls)
  // return 'https://polygon-mumbai.infura.io/v3/330472ed44dd4692a16dfcb4cc41f122'
}

export default getNodeUrl
