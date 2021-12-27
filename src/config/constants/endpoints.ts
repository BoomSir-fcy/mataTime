import { ChainId } from "dsgswap-sdk"

export const { REACT_APP_GRAPH_API } = process.env

const graphApiSwap = {
  [ChainId.MAINNET]: `${REACT_APP_GRAPH_API}/swap`,
  [ChainId.TESTNET]: `https://api.thegraph.com/subgraphs/name/vbm290/swapts`,
  [ChainId.MATIC_TESTNET]: `https://api.thegraph.com/subgraphs/name/checknodeupdate/t2-swap-mdev`,
}

export const GRAPH_API_SWAPTS = graphApiSwap[process.env.REACT_APP_CHAIN_ID] || graphApiSwap[ChainId.MAINNET]
