import { parseUnits } from '@ethersproject/units'
import { Currency, CurrencyAmount, currencyEquals, WETHER, getActiveETHERWidthChainId, JSBI, Pair, Token, TokenAmount, Trade } from 'dsgswap-sdk'
import { ParsedQs } from 'qs'
import { getDecimalAmount } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import isEqual from 'lodash/isEqual'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ETHER_1INCH_ADDRESS } from 'config/constants/1inchSwap'
import useDebounce from 'hooks/useDebounce'
import useENS from 'hooks/ENS/useENS'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { PairState, usePair } from 'hooks/usePairs'
import { useCurrency } from 'hooks/Tokens'
import { useTradeExactIn, useTradeExactOut } from 'hooks/Trades'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { useTranslation } from 'contexts/Localization'
import { isAddress } from 'utils'
import { computeSlippageAdjustedAmounts } from 'utils/prices'
import { AppDispatch, AppState } from '../index'
import { useCurrencyBalances } from '../wallet/hooks'
import { Field, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput, updatePolyDataIndex, resetPolyData } from './actions'
import { SwapState, fetchPolySwapDataAsync, fetchPolyAllowaceAsync, fetchPolySpenderAsync } from './reducer'
import { useUserSlippageTolerance, useUserUsePoly, useSystemUsePoly } from '../user/hooks'
import { PolyDataIndexStatus, PolyDataIndex } from '../types'
// ETHER_1INCH_ADDRESS


const POLY_REFRESH_INTERVAL = 10 * 1000
const POLY_MAX_SLIPPAGE = 50
const currentTimestamp = () => new Date().getTime()

export function useSwapState(): AppState['swap'] {
  return useSelector<AppState, AppState['swap']>((state) => state.swap)
}

export function useSwapActionHandlers(): {
  onCurrencySelection: (field: Field, currency: Currency) => void
  onSwitchTokens: () => void
  onUserInput: (field: Field, typedValue: string) => void
  onChangeRecipient: (recipient: string | null) => void
} {
  const dispatch = useDispatch<AppDispatch>()
  const onCurrencySelection = useCallback(
    (field: Field, currency: Currency) => {
      const ETHER = getActiveETHERWidthChainId()
      dispatch(
        selectCurrency({
          field,
          currencyId: currency instanceof Token ? currency.address : currency === ETHER ? ETHER.symbol : '',
        }),
      )
    },
    [dispatch],
  )

  const onSwitchTokens = useCallback(() => {
    dispatch(switchCurrencies())
  }, [dispatch])

  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      dispatch(typeInput({ field, typedValue }))
    },
    [dispatch],
  )

  const onChangeRecipient = useCallback(
    (recipient: string | null) => {
      dispatch(setRecipient({ recipient }))
    },
    [dispatch],
  )

  return {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
    onChangeRecipient,
  }
}

// try to parse a user entered amount for a given token
export function tryParseAmount(value?: string, currency?: Currency): CurrencyAmount | undefined {
  if (!value || !currency) {
    return undefined
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== '0') {
      return currency instanceof Token
        ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
        : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed))
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
  // necessary for all paths to return a value
  return undefined
}

const BAD_RECIPIENT_ADDRESSES: string[] = [
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // v2 factory
  '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a', // v2 router 01
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // v2 router 02
  '0x89f1DeC8297eF2cBB47a4894089E5f6aa2888c44',
]

/**
 * Returns true if any of the pairs or tokens in a trade have the given checksummed address
 * @param trade to check for the given address
 * @param checksummedAddress address to check in the pairs and tokens
 */
function involvesAddress(trade: Trade, checksummedAddress: string): boolean {
  return (
    trade.route.path.some((token) => token.address === checksummedAddress) ||
    trade.route.pairs.some((pair) => pair.liquidityToken.address === checksummedAddress)
  )
}


export function useCheckUpdatePolyIndex(): [PolyDataIndexStatus, PolyDataIndex] {
  const { account, chainId } = useActiveWeb3React()
  const { polyDataIndex } = useSwapState()
  const [userUsePoly] = useUserUsePoly()
  const ETHER = getActiveETHERWidthChainId()
  const dispatch = useDispatch()
  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
    recipient,
  } = useSwapState()
  const [allowedSlippage] = useUserSlippageTolerance()

  const inputCurrency = useCurrency(inputCurrencyId) as Token
  const outputCurrency = useCurrency(outputCurrencyId) as Token
  const debouncedValue = useDebounce(typedValue, 300)
  
  if (!chainId || !outputCurrency || !outputCurrency || !Number(debouncedValue) || !userUsePoly) return [PolyDataIndexStatus.NOT_SWAP_DATA, null]
  if ((inputCurrency === ETHER || outputCurrency === ETHER) && currencyEquals(WETHER[chainId], outputCurrency)) {
    return [PolyDataIndexStatus.NOT_SWAP_DATA, null]
  }
  const isExactIn: boolean = independentField === Field.INPUT
  if (!isExactIn) return [PolyDataIndexStatus.NOT_SWAP_DATA, null]

  const slippage = allowedSlippage > POLY_MAX_SLIPPAGE ? POLY_MAX_SLIPPAGE :  allowedSlippage

  const data = {
    slippage,
    lastQueryTimestamp: polyDataIndex?.lastQueryTimestamp,
    fromTokenAddress: inputCurrency === ETHER ? ETHER_1INCH_ADDRESS[chainId] : inputCurrency?.address,
    toTokenAddress: outputCurrency === ETHER ? ETHER_1INCH_ADDRESS[chainId] : outputCurrency?.address,
    amount: debouncedValue,
    amountDecimal: getDecimalAmount(new BigNumber(debouncedValue), inputCurrency?.decimals).toString(),
    fromAddress: account,
  }
  const timestamp = currentTimestamp()
  if (!isEqual(data, polyDataIndex)) {
    dispatch(resetPolyData())
    dispatch(updatePolyDataIndex({ data: {...data, lastQueryTimestamp: timestamp } }))
    return [PolyDataIndexStatus.NEED_REFRESH, data]
  }
  if (timestamp - polyDataIndex?.lastQueryTimestamp > POLY_REFRESH_INTERVAL) {
    dispatch(updatePolyDataIndex({ data: {...data, lastQueryTimestamp: timestamp } }))
    return [PolyDataIndexStatus.NEED_REFRESH, data]
  }
  return [PolyDataIndexStatus.LOADED, data]
}


// from the current swap inputs, compute the best trade and return it.
export function useDerivedSwapInfo(): {
  currencies: { [field in Field]?: Currency }
  currencyBalances: { [field in Field]?: CurrencyAmount }
  parsedAmount: CurrencyAmount | undefined
  v2Trade: Trade | undefined
  // polyPairs: Pair | undefined
  inputError?: string
  pairState?: PairState
} {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
    recipient,
  } = useSwapState()

  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)
  const recipientLookup = useENS(recipient ?? undefined)
  const to: string | null = (recipient === null ? account : recipientLookup.address) ?? null

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ])

  const isExactIn: boolean = independentField === Field.INPUT
  const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined)
  
  
  const bestTradeExactIn = useTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined)
  const bestTradeExactOut = useTradeExactOut(inputCurrency ?? undefined, !isExactIn ? parsedAmount : undefined)

  const [pairStateIn] = usePair(inputCurrency ?? undefined, outputCurrency ?? undefined)
  const [pairStateOut] = usePair(inputCurrency ?? undefined, outputCurrency ?? undefined)

  // const bestPolyTradeExactIn = useTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined, true)
  // const bestPolyTradeExactOut = useTradeExactOut(
  //   inputCurrency ?? undefined,
  //   !isExactIn ? parsedAmount : undefined,
  //   true,
  // )

  const v2Trade = isExactIn ? bestTradeExactIn : bestTradeExactOut
  // const v2TradePoly = isExactIn ? bestPolyTradeExactIn : bestPolyTradeExactOut
  const pairState = isExactIn ? pairStateIn : pairStateOut

  // let polyPairs = null
  // if (v2TradePoly?.route?.pairs?.length === 1) {
  //   polyPairs = v2TradePoly.route.pairs[0]
  // }
  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  }

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  let inputError: string | undefined
  if (!account) {
    inputError = t('Connect Wallet')
  }

  if (!parsedAmount) {
    inputError = inputError ?? t('Enter an amount')
  }

  if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
    inputError = inputError ?? t('Select a token')
  }

  const formattedTo = isAddress(to)
  if (!to || !formattedTo) {
    inputError = inputError ?? t('Enter a recipient')
  } else if (
    BAD_RECIPIENT_ADDRESSES.indexOf(formattedTo) !== -1 ||
    (bestTradeExactIn && involvesAddress(bestTradeExactIn, formattedTo)) ||
    (bestTradeExactOut && involvesAddress(bestTradeExactOut, formattedTo))
  ) {
    inputError = inputError ?? t('Invalid recipient')
  }

  const [allowedSlippage] = useUserSlippageTolerance()
  const [systemUsePoly] = useSystemUsePoly()

  const slippageAdjustedAmounts = v2Trade && allowedSlippage && computeSlippageAdjustedAmounts(v2Trade, allowedSlippage)

  // compare input balance to max input based on version
  const [balanceIn, amountIn] = [
    currencyBalances[Field.INPUT],
    slippageAdjustedAmounts ? slippageAdjustedAmounts[Field.INPUT] : null,
  ]

  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    inputError = t('Insufficient %symbol% balance', { symbol: amountIn.currency.symbol })
  }

  const [checkUpdatePolyIndex, polyIndex] = useCheckUpdatePolyIndex()
  if (checkUpdatePolyIndex === PolyDataIndexStatus.NEED_REFRESH && !inputError) {
    const polyQueryData = {
      ...polyIndex,
      amount: polyIndex?.amountDecimal,
      slippage: new BigNumber(polyIndex?.slippage).div(100).toNumber(),
    }

    

    dispatch(fetchPolySwapDataAsync({ chainId, polyQueryData }))
    dispatch(fetchPolySpenderAsync(chainId))
    // dispatch(fetchPolySwapDataAsync({ chainId, polyQueryData }))
  } else if (checkUpdatePolyIndex === PolyDataIndexStatus.NOT_SWAP_DATA) {
    dispatch(resetPolyData())
  } else if (checkUpdatePolyIndex === PolyDataIndexStatus.LOADED) {
    const inputCurrencyAmount = new TokenAmount(inputCurrency as Token, polyIndex.amountDecimal)
    if (balanceIn && inputCurrencyAmount && balanceIn.lessThan(inputCurrencyAmount)) {
      inputError = t('Insufficient %symbol% balance', { symbol: inputCurrency.symbol })
    }
  }
  
  return {
    pairState,
    currencies,
    currencyBalances,
    parsedAmount,
    v2Trade: v2Trade ?? undefined,
    inputError,
    // polyPairs: polyPairs ?? undefined,
  }
}

function parseCurrencyFromURLParameter(urlParam: any): string {
  const ETHER = getActiveETHERWidthChainId()
  if (typeof urlParam === 'string') {
    const valid = isAddress(urlParam)
    if (valid) return valid
    if (urlParam.toUpperCase() === ETHER.symbol?.toLowerCase()) return ETHER.symbol?.toLowerCase()
    if (valid === false) return ETHER.symbol?.toLowerCase()
  }
  return ETHER.symbol?.toLowerCase() ?? ''
}

function parseTokenAmountURLParameter(urlParam: any): string {
  // eslint-disable-next-line no-restricted-globals
  return typeof urlParam === 'string' && !isNaN(parseFloat(urlParam)) ? urlParam : ''
}

function parseIndependentFieldURLParameter(urlParam: any): Field {
  return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output' ? Field.OUTPUT : Field.INPUT
}

const ENS_NAME_REGEX = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
function validatedRecipient(recipient: any): string | null {
  if (typeof recipient !== 'string') return null
  const address = isAddress(recipient)
  if (address) return address
  if (ENS_NAME_REGEX.test(recipient)) return recipient
  if (ADDRESS_REGEX.test(recipient)) return recipient
  return null
}

export function queryParametersToSwapState(parsedQs: ParsedQs): SwapState {
  let inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency)
  let outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency)
  if (inputCurrency === outputCurrency) {
    if (typeof parsedQs.outputCurrency === 'string') {
      inputCurrency = ''
    } else {
      outputCurrency = ''
    }
  }

  const recipient = validatedRecipient(parsedQs.recipient)

  return {
    [Field.INPUT]: {
      currencyId: inputCurrency,
    },
    [Field.OUTPUT]: {
      currencyId: outputCurrency,
    },
    typedValue: parseTokenAmountURLParameter(parsedQs.exactAmount),
    independentField: parseIndependentFieldURLParameter(parsedQs.exactField),
    recipient,
  }
}

// updates the swap state to use the defaults for a given network
export function useDefaultsFromURLSearch(outputCurrency?: string, inputCurrency?: string):
  | { inputCurrencyId: string | undefined; outputCurrencyId: string | undefined }
  | undefined {
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const [result, setResult] = useState<
    { inputCurrencyId: string | undefined; outputCurrencyId: string | undefined } | undefined
  >()

  useEffect(() => {
    if (!chainId) return
    const parsed = queryParametersToSwapState({ outputCurrency, inputCurrency })
    dispatch(
      replaceSwapState({
        typedValue: parsed.typedValue,
        field: parsed.independentField,
        inputCurrencyId: parsed[Field.INPUT].currencyId,
        outputCurrencyId: parsed[Field.OUTPUT].currencyId,
        recipient: null,
      }),
    )

    setResult({ inputCurrencyId: parsed[Field.INPUT].currencyId, outputCurrencyId: parsed[Field.OUTPUT].currencyId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chainId, outputCurrency, inputCurrency])

  return result
}


export function useSwapCurrencies() {
  const {
    [Field.INPUT]: inputStateCurrency,
    [Field.OUTPUT]: outputStateCurrency,
  } = useSwapState() || {}

  const inputCurrency = useCurrency(inputStateCurrency?.currencyId)
  const outputCurrency = useCurrency(outputStateCurrency?.currencyId)

  return useMemo(() => {
    return {
      inputCurrency,
      outputCurrency,
    }
  }, [outputCurrency, inputCurrency])
}
