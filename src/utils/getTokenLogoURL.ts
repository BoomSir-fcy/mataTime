const getTokenLogoURLs = (address: string): string[] => [
  `https://sv.dsgmetaverse.com/images/tokens/${address}.svg`,
  `https://sv.dsgmetaverse.com/images/tokens/${address}.png`,
  `https://tokens.pancakeswap.finance/images/${address}.png`,
  `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`,
]

export default getTokenLogoURLs

