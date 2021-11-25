import { Currency, getActiveETHERWidthChainId, Token } from 'dsgswap-sdk'
import { BinanceIcon } from 'pancake-uikit'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import getTokenLogoURL, { getSymbolLogoUrl } from '../../utils/getTokenLogoURL'
import Logo from './Logo'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
  symbol,
}: {
  currency?: Currency
  symbol?: string
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const ETHER = getActiveETHERWidthChainId()

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return [
      getSymbolLogoUrl(ETHER.symbol)
    ]
    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getSymbolLogoUrl(currency.address), getTokenLogoURL(currency.address)]
      }
      return [getSymbolLogoUrl(currency.address), getTokenLogoURL(currency.address)]
    }
    if (symbol) return [getSymbolLogoUrl(symbol)]
    return []
  }, [currency, uriLocations, ETHER, symbol])

  // if (currency === ETHER) {
  //   return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
  // }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
