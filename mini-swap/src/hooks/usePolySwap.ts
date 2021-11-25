import { useMemo } from 'react'
import { CurrencyAmount, Currency, JSBI, Price, Trade, TokenAmount, Token, ChainId } from 'dsgswap-sdk'
import { PolyData } from 'state/types'
import { useWeb3React } from '@web3-react/core'


export function usePolySwap(polyData: PolyData, trade: Trade, showWrap: boolean): {
  polyData: PolyData
} {

  const { chainId } = useWeb3React()
  const polyCurrencyData = useMemo(() => {
    let price = null
    let currencyAmount = null
    let toTokenAmount = null
    let fromCurrencyToken = null
    let fromCurrencyTokenAmount = null
    if (polyData) {
      price = new Price(
        polyData.fromToken,
        polyData.toToken,
        polyData.fromTokenAmount,
        polyData.toTokenAmount
      )
      const currency = new Token(chainId, polyData.fromToken.address, polyData.fromToken.decimals, polyData.fromToken.symbol)
      currencyAmount = new TokenAmount(currency, JSBI.BigInt(polyData.fromTokenAmount))
      //  CurrencyAmount.ether(JSBI.BigInt(polyData.fromTokenAmount))
      const toToken = new Token(chainId, polyData.toToken.address, polyData.toToken.decimals, polyData.toToken.symbol)
      toTokenAmount = new TokenAmount(toToken, JSBI.BigInt(polyData.toTokenAmount))
      // toTokenAmount = CurrencyAmount.ether(JSBI.BigInt(polyData.toTokenAmount))
      fromCurrencyToken = new Token(
        ChainId.MAINNET,
        polyData.fromToken.address,
        polyData.fromToken.decimals,
        polyData.fromToken.symbol,
        polyData.fromToken.name,
      )
      fromCurrencyTokenAmount = new TokenAmount(fromCurrencyToken, JSBI.BigInt(polyData.fromTokenAmount))
    }
    return {
      price,
      currencyAmount,
      fromCurrencyTokenAmount,
      fromCurrencyToken,
      toTokenAmount
    }
  }, [polyData, chainId])

  const isPolyMethed = useMemo(() => {
    if (showWrap) return false
    if (!polyData) return false
    if (!trade) return true
    return !!trade?.executionPrice?.lessThan(polyCurrencyData?.price)
  }, [polyData, polyCurrencyData, trade, showWrap])

  const polyDataRes = {
    ...polyData,
    isPolyMethed,
    price: polyCurrencyData.price,
    currencyAmount: polyCurrencyData.currencyAmount,
    fromCurrencyTokenAmount: polyCurrencyData.fromCurrencyTokenAmount,
    fromCurrencyToken: polyCurrencyData.fromCurrencyToken,
    toCurrencyAmount: polyCurrencyData.toTokenAmount,
  }
  return {
    polyData: polyDataRes,
  }
}