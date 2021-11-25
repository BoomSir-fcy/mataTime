import { getActiveETHERWidthChainId, WETHER, ChainId, Token, getValueWithChainId } from  'dsgswap-sdk';

const formatWETH = (address: string) => {
  const token: Token = getValueWithChainId(WETHER)
  if (token.address.toUpperCase() === address?.toUpperCase()) return getActiveETHERWidthChainId().symbol
  return null
}

export default formatWETH
