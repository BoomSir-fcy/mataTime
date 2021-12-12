import React, { useMemo, ReactNode, useEffect, useState } from 'react'
import { Currency, setChainId, Token } from 'dsgswap-sdk'
import { useSwapCurrencies } from './state/swap/hooks'
import useActiveWeb3React from './hooks/useActiveWeb3React'
import { BLOCKED_ADDRESSES } from './config/constants'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import Swap, { SwapInterface } from './Swap'
import Providers, { ProvidersPorps } from './Providers'

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

interface ListenerCurrencyChangeProps {
  onInputCurrencyChange?: (currency: Currency | Token) => void
  onOutputCurrencyChange?: (currency: Currency | Token) => void
}
interface MiniSwapInterface extends ProvidersPorps, SwapInterface, ListenerCurrencyChangeProps {
  onConnectWallet?: () => void
  onLoaded?: () => void
}

function ListenerCurrencyChange({ onInputCurrencyChange, onOutputCurrencyChange }: ListenerCurrencyChangeProps) {
  const { inputCurrency, outputCurrency } = useSwapCurrencies()
  const [oldInputCurrency, setOldInputCurrency] = useState(inputCurrency)
  const [oldOutputCurrency, setOldOutputCurrency] = useState(outputCurrency)

  useEffect(() => {
    if (inputCurrency?.symbol !== oldInputCurrency?.symbol || inputCurrency?.name !== oldInputCurrency?.name) {
      setOldInputCurrency(inputCurrency)
      if (typeof onInputCurrencyChange === 'function') {
        onInputCurrencyChange(inputCurrency)
      }
    }
  }, [inputCurrency, oldInputCurrency, onInputCurrencyChange])

  useEffect(() => {
    if (outputCurrency?.symbol !== oldOutputCurrency?.symbol || outputCurrency?.name !== oldOutputCurrency?.name) {
      setOldOutputCurrency(outputCurrency)
      if (typeof onOutputCurrencyChange === 'function') {
        onOutputCurrencyChange(outputCurrency)
      }
    }
  }, [outputCurrency, oldOutputCurrency, onOutputCurrencyChange])
  return null
}

function Blocklist({ children }: { children: ReactNode }) {
  const { account } = useActiveWeb3React()
  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return <div>Blocked address</div>
  }
  return <>{children}</>
}

const MiniSwap: React.FC<MiniSwapInterface> = ({
  isDark,
  lang,
  resetTheme,
  onLoaded,
  onInputCurrencyChange,
  onOutputCurrencyChange,
  onConnectWallet,
  inputCurrencyId,
  outputCurrencyId,
  chainId,
  subTitleTips,
  titlehelper,
  powered,
}) => {

  useEffect(() => {
    console.debug(`chainId is change ${chainId}`)
    setChainId(chainId)
  }, [chainId])

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded && typeof onLoaded === 'function') {
      setLoaded(true)
      onLoaded()
    }
  }, [onLoaded, loaded])


  return (
    <Providers resetTheme={resetTheme} lang={lang} onConnectWallet={onConnectWallet} isDark={isDark} chainId={chainId}>
      <Updaters />
      <ListenerCurrencyChange onInputCurrencyChange={onInputCurrencyChange} onOutputCurrencyChange={onOutputCurrencyChange} />
      <Blocklist>
        <Swap subTitleTips={subTitleTips} titlehelper={titlehelper} powered={powered} outputCurrencyId={outputCurrencyId} inputCurrencyId={inputCurrencyId} />
      </Blocklist>
    </Providers>
  )
}

export default MiniSwap
