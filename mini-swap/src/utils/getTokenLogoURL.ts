import { BASE_TOKEN_URL } from 'config'

const getTokenLogoURL = (address: string) =>
  `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`

export default getTokenLogoURL

export const getSymbolLogoUrl = (address: string) => `${BASE_TOKEN_URL}${address}.png`
