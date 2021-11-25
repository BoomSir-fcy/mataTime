import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { CurrencyAmount, JSBI, Rounding, Token, Trade, SWAP_TOKEN } from 'dsgswap-sdk'
import { Button, Text, TradeIcon, Box, useModal, Flex } from 'pancake-uikit'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import SwapWarningTokens from 'config/constants/swapWarningTokens'
import Dots from 'components/Loader/Dots'
import { PairState } from 'hooks/usePairs'
import { getAddress } from 'utils/addressHelpers'
import AddressInputPanel from './components/AddressInputPanel'
import { GreyCard } from '../../components/Card'
import Column, { AutoColumn } from '../../components/Layout/Column'
import ConfirmSwapModal from './components/ConfirmSwapModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { AutoRow, RowBetween } from '../../components/Layout/Row'
import AdvancedSwapDetailsDropdown from './components/AdvancedSwapDetailsDropdown'
import confirmPriceImpactWithoutFee from './components/confirmPriceImpactWithoutFee'
import { ArrowWrapper, SwapCallbackError, Wrapper } from './components/styleds'
import TradePrice from './components/TradePrice'
import ImportTokenWarningModal from './components/ImportTokenWarningModal'
import ProgressSteps from './components/ProgressSteps'
import { AppHeader, AppBody } from '../../components/App'
import ConnectWalletButton from '../../components/ConnectWalletButton'

import { INITIAL_ALLOWED_SLIPPAGE } from '../../config/constants'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useCurrency, useAllTokens } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade, useApproveCallbackPolyTrade } from '../../hooks/useApproveCallback'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import { usePolySwap } from '../../hooks/usePolySwap'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'
import { useExpertModeManager, useUserSlippageTolerance, useUserSingleHopOnly } from '../../state/user/hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import CircleLoader from '../../components/Loader/CircleLoader'
import Page from '../Page'
import SwapWarningModal from './components/SwapWarningModal'
import { usePloyCallData } from './hooks/usePloyCallData'

export default function Swap() {
  // const loadedUrlParams = useDefaultsFromURLSearch()

  const { t } = useTranslation()

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(undefined),
    useCurrency(undefined),
  ]
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens)
    })

  const { account, chainId } = useActiveWeb3React()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient, polyData: polyDataSimple, polySpender } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, pairState, inputError: swapInputError } = useDerivedSwapInfo()
  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)

  // when input is dsg, to disable output
  const disabledOutput = useMemo(() => {
    if (currencies[Field.INPUT] && (SWAP_TOKEN[chainId] as Token)?.equals(currencies[Field.INPUT] as Token)) {
      return true
    }
    return false
  }, [chainId, currencies])
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade
  const { polyData } = usePolySwap(polyDataSimple, trade, showWrap)
  const [polySwapPending, setPolySwapPending] = useState(false)
  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : (polyData?.isPolyMethed ? polyData?.toCurrencyAmount : trade?.outputAmount),
      }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT



  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  // modal and loading
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      // : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
      : parsedAmounts[dependentField]?.toSignificant(6,
          undefined,
          independentField === Field.INPUT ? Rounding.ROUND_DOWN : Rounding.ROUND_UP
        ) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approvalAsLiquild, approveCallbackAsLiquild] = useApproveCallbackFromTrade(trade, allowedSlippage)
  const [approvalAsPoly, approveCallbackAsPloy] = useApproveCallbackPolyTrade(polyData?.fromCurrencyTokenAmount, polySpender)

  const [approval, approveCallback] = useMemo(() => {
    return polyData?.isPolyMethed ? [approvalAsPoly, approveCallbackAsPloy]: [approvalAsLiquild, approveCallbackAsLiquild]
  }, [polyData?.isPolyMethed, approvalAsLiquild, approveCallbackAsLiquild, approvalAsPoly, approveCallbackAsPloy])
  
  // const [approval, approveCallback] = useApproveCallbackFromTradeOrPoly(polyData?.isPolyMethed, trade, polyData?.currencyAmount, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)
  const { polySwapCallback } = usePloyCallData()

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm])

  const handlePolySwap = useCallback(async () => {
    if (!polyData && !polyData.isPolyMethed) {
      return
    }
    if (!polySwapCallback) {
      return
    }
    try {
      setPolySwapPending(true)
      // setSwapState({ attemptingTxn: true, tradeToConfirm: null, swapErrorMessage: undefined, txHash: undefined })
      await polySwapCallback()
        .then((hash) => {
          setSwapState({ attemptingTxn: false, tradeToConfirm: null, swapErrorMessage: undefined, txHash: hash })
        })
        .catch((error) => {
          console.error(error)
          setSwapState({
            attemptingTxn: false,
            tradeToConfirm: null,
            swapErrorMessage: error.message,
            txHash: undefined,
          })
        }).finally(() => {
          setPolySwapPending(false)
        })
    } catch (error) {
      console.error(error)
    }
  }, [polySwapCallback, polyData, setPolySwapPending])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee, allowedSlippage)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlowTrade =
    (!swapInputError) &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)
  const showApproveFlowPoly =
    (polyData?.isPolyMethed) &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED))

  const showApproveFlow = showApproveFlowTrade || showApproveFlowPoly

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn })
  }, [attemptingTxn, swapErrorMessage, trade, txHash])

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null)
  const [onPresentSwapWarningModal] = useModal(<SwapWarningModal swapCurrency={swapWarningCurrency} />)

  const shouldShowSwapWarning = (swapCurrency) => {
    const isWarningToken = Object.entries(SwapWarningTokens).find((warningTokenConfig) => {
      const warningTokenData = warningTokenConfig[1]
      const warningTokenAddress = getAddress(warningTokenData.address)
      return swapCurrency.address === warningTokenAddress
    })
    return Boolean(isWarningToken)
  }

  useEffect(() => {
    if (swapWarningCurrency) {
      onPresentSwapWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      const showSwapWarning = shouldShowSwapWarning(inputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },
    [onCurrencySelection],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toFixed(6))
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      const showSwapWarning = shouldShowSwapWarning(outputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(outputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },

    [onCurrencySelection],
  )

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  // const [onPresentImportTokenWarningModal] = useModal(
  //   <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => history.push('/swap/')} />,
  // )

  // useEffect(() => {
  //   if (importTokensNotInDefault.length > 0) {
  //     onPresentImportTokenWarningModal()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [importTokensNotInDefault.length])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'confirmSwapModal',
  )

  const forPoly = useMemo(() => {
    return noRoute || swapIsUnsupported
  }, [noRoute, swapIsUnsupported])

  const getButtonSupported = () => {
    if (swapIsUnsupported)
      return (
        <Flex justifyContent="center">
          <Button disabled scale="ld" mb="4px">
            {t('Unsupported Asset')}
          </Button>
        </Flex>
      )
    if (!account)
      return (
        <Flex justifyContent="center">
          <ConnectWalletButton scale="ld" />
        </Flex>
      )
    if (showWrap)
      return (
        <Flex justifyContent="center">
          <Button disabled={Boolean(wrapInputError)} onClick={onWrap}>
            {wrapInputError ?? (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
          </Button>
        </Flex>
      )
    if (noRoute && pairState === PairState.LOADING && !polyData.isPolyMethed) {
      return (
        <GreyCard style={{ textAlign: 'center' }}>
          <Text color="textSubtle" mb="4px">
            <Dots>{t('Loading')}</Dots>
          </Text>
        </GreyCard>
      )
    }
    if (noRoute && userHasSpecifiedInputOutput && !polyData.isPolyMethed)
      return (
        <GreyCard style={{ textAlign: 'center' }}>
          <Text color="textSubtle" mb="4px">
            {t('Insufficient liquidity for this trade.')}
          </Text>
          {singleHopOnly && (
            <Text color="textSubtle" mb="4px">
              {t('Try enabling multi-hop trades.')}
            </Text>
          )}
        </GreyCard>
      )
    if (showApproveFlow)
      return (
        <>
          <RowBetween>
            <Button
              variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
              onClick={approveCallback}
              disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
              width="48%"
            >
              {approval === ApprovalState.PENDING ? (
                <AutoRow gap="6px" justify="center">
                  {t('Enabling')} <CircleLoader stroke="white" />
                </AutoRow>
              ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                t('Enabled')
              ) : (
                t('Enable %asset%', { asset: currencies[Field.INPUT]?.symbol ?? '' })
              )}
            </Button>
            {
              polyData.isPolyMethed
              ?
              <Button width="48%" disabled={!isValid || polySwapPending} onClick={async () =>{
                await handlePolySwap()
                setTimeout(() => {
                  onPresentConfirmModal()
                }, 0)
              }}>{
                polySwapPending
                ?
                <Dots>{t('Swap')}</Dots>
                :
                swapInputError || t('Swap')
              }</Button>
              :
              <Button
                variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
                onClick={() => {
                  if (isExpertMode) {
                    handleSwap()
                  } else {
                    setSwapState({
                      tradeToConfirm: trade,
                      attemptingTxn: false,
                      swapErrorMessage: undefined,
                      txHash: undefined,
                    })
                    setTimeout(() => {
                      onPresentConfirmModal()
                    }, 0)
                  }
                }}
                width="48%"
                id="swap-button"
                disabled={!isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)}
              >
                {priceImpactSeverity > 3 && !isExpertMode
                  ? t('Price Impact High')
                  : priceImpactSeverity > 2
                  ? t('Swap Anyway')
                  : t('Swap')}
              </Button>
            }
          </RowBetween>
          <Column style={{ marginTop: '1rem' }}>
            <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
          </Column>
        </>
      )
    return (
      <Flex justifyContent="center">
        {
          polyData.isPolyMethed
          ?
          <Button disabled={!isValid || polySwapPending} onClick={async () =>{
            await handlePolySwap()
            setTimeout(() => {
              onPresentConfirmModal()
            }, 0)
          }}>{
            polySwapPending
            ?
            <Dots>{t('Swap')}</Dots>
            :
            swapInputError || t('Swap')
          }</Button>
          :
          <Button
            variant={polyData.isPolyMethed ? 'primary' : (isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary')}
            onClick={() => {
              if (isExpertMode) {
                handleSwap()
              } else {
                setSwapState({
                  tradeToConfirm: trade,
                  attemptingTxn: false,
                  swapErrorMessage: undefined,
                  txHash: undefined,
                })
                setTimeout(() => {
                  onPresentConfirmModal()
                }, 0)
              }
            }}
            id="swap-button"
            scale="ld"
            disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
          >
            {
              (swapInputError ||
                (priceImpactSeverity > 3 && !isExpertMode
                  ? t('Swap Anyway')
                  : priceImpactSeverity > 2
                  ? t('Swap Anyway')
                  : t('Swap')))}
          </Button>

        }
      </Flex>
    )
  }

  return (
    <Page>
      <AppBody>
        <AppHeader title={t('Exchange')} subtitle={t('Trade tokens in an instant')} />
        <Wrapper id="swap-page">
          <AutoColumn gap="md">
            <CurrencyInputPanel
              label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
              value={formattedAmounts[Field.INPUT]}
              showMaxButton={!atMaxAmountInput}
              currency={currencies[Field.INPUT]}
              onUserInput={handleTypeInput}
              onMax={handleMaxInput}
              onCurrencySelect={handleInputSelect}
              otherCurrency={currencies[Field.OUTPUT]}
              id="swap-currency-input"
              showCommonBases
            />
            <AutoColumn justify="space-between">
              <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                <ArrowWrapper clickable>
                  <TradeIcon
                    width="32px"
                    onClick={() => {
                      setApprovalSubmitted(false) // reset 2 step UI for approvals
                      onSwitchTokens()
                    }}
                    color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? 'primary' : 'text'}
                  />
                </ArrowWrapper>
                {recipient === null && !showWrap && isExpertMode ? (
                  <Button variant="text" id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                    {t('+ Add a send (optional)')}
                  </Button>
                ) : null}
              </AutoRow>
            </AutoColumn>
            <CurrencyInputPanel
              value={formattedAmounts[Field.OUTPUT]}
              onUserInput={handleTypeOutput}
              label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
              showMaxButton={false}
              currency={currencies[Field.OUTPUT]}
              onCurrencySelect={handleOutputSelect}
              otherCurrency={currencies[Field.INPUT]}
              id="swap-currency-output"
              disabled={disabledOutput}
              showCommonBases
            />

            {isExpertMode && recipient !== null && !showWrap ? (
              <>
                <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable={false}>
                    <TradeIcon width="32px" />
                  </ArrowWrapper>
                  <Button variant="text" id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                    {t('- Remove send')}
                  </Button>
                </AutoRow>
                <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
              </>
            ) : null}

            {showWrap ? null : (
              <AutoColumn gap="8px" style={{ padding: '0 16px' }}>
                {(Boolean(trade) || polyData.isPolyMethed) && (
                  <RowBetween align="center">
                    <Text fontSize="16px">{t('Price')}</Text>
                    <TradePrice
                      price={polyData?.isPolyMethed ? polyData?.price : trade?.executionPrice}
                      showInverted={showInverted}
                      setShowInverted={setShowInverted}
                    />
                  </RowBetween>
                )}
                {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                  <RowBetween align="center">
                    <Text fontSize="16px">{t('Slippage Tolerance')}</Text>
                    <Text fontSize="16px" color="textSubtle">
                      {allowedSlippage / 100}%
                    </Text>
                  </RowBetween>
                )}
              </AutoColumn>
            )}
          </AutoColumn>

          <Box mt="1rem">
            {getButtonSupported()}
            {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
          </Box>
        </Wrapper>
      </AppBody>
      {!swapIsUnsupported ? (
        <AdvancedSwapDetailsDropdown isPolyMethed={polyData?.isPolyMethed} polyData={polyData} trade={trade} />
      ) : (
        <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]} />
      )}
    </Page>
  )
}
