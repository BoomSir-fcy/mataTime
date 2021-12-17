import { SupportLanguage } from 'config/localization/languages'
import React, { useEffect, useState } from 'react'
import { ConnectorNames, ResetCSS } from 'pancake-uikit'
import useAuth from 'hooks/useAuth'
import useEagerConnect from 'hooks/useEagerConnect'
import { useWeb3React } from '@web3-react/core'
import { setChainId } from 'dsgswap-sdk'
import MiniSwapLocal from './MiniSwap'


// const [isDark, setIsDark] = useState(false)
const App: React.FC = () => {

  // const chainId = useChainId()
  useEagerConnect()


  const [isDark, setIsDark] = useState(false)
  const [outputCurrencyId, seOutputCurrencyId] = useState('0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657')
  const [lang, setLang] = useState<SupportLanguage>('en-US')
  const { login } = useAuth()

  const changeDark = () => {
    setIsDark(!isDark)
  }

  const changeLang = () => {
    if (lang === 'en-US') {
      setLang('zh-CN')
    } else {
      setLang('en-US')
    }
  }
  const changeCurrency = () => {
    if (outputCurrencyId === '0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657') {
      seOutputCurrencyId('0x111111111117dC0aa78b770fA6A738034120C302')
    } else {
      seOutputCurrencyId('0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657')
    }
  }

  const onConnectWallet = () => {
    login(ConnectorNames.Injected)
  }

  const { chainId } = useWeb3React()
  useEffect(() => {
    if (chainId) {
      setChainId(chainId)
    } else {
      setChainId(56)
    }
  }, [chainId])
  // 0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657
  // 0x111111111117dC0aa78b770fA6A738034120C302
  return (
    <div>
      {/* <ResetCSS /> */}
      <button onClick={changeDark} type="button" >change</button>
      <button onClick={changeLang} type="button" >changeLang</button>
      <button onClick={changeCurrency} type="button" >changeCurrency</button>
      {isDark ? 'isDark' : 'no-isDark'}
      <MiniSwapLocal outputCurrencyId={outputCurrencyId} lang={lang} onConnectWallet={onConnectWallet} isDark={isDark} />
    </div>
  )
}

export default React.memo(App)
