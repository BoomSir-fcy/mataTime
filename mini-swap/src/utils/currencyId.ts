import { Currency, getActiveETHERWidthChainId, Token } from 'dsgswap-sdk'

export function currencyId(currency: Currency): string {
  const ETHER = getActiveETHERWidthChainId()
  if (currency === ETHER) return ETHER.symbol
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
