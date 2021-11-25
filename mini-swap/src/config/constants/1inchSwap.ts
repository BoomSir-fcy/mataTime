export const supportChainIds = [
  1,
  56,
  137,
  10,
  42161,
]

export const isSupportChainId = (chainId: string|number) => {
  return supportChainIds.includes(Number(chainId))
}

export const ETHER_1INCH_ADDRESS = {
  1: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  56: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  137: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  // 10,
  // 42161,
}