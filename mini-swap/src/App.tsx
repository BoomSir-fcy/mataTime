import { SupportLanguage } from 'config/localization/languages'
import React, { useEffect, useState } from 'react'
import { ConnectorNames, ResetCSS } from 'pancake-uikit'
import useAuth from 'hooks/useAuth'
import useEagerConnect from 'hooks/useEagerConnect'
import { useWeb3React } from '@web3-react/core'
import { setChainId } from 'dsgswap-sdk'
import Swap from './views/Swap'
import MiniSwapLocal from './MiniSwap'


// const [isDark, setIsDark] = useState(false)
const App: React.FC = () => {

  // const chainId = useChainId()
  useEagerConnect()

  
  const [isDark, setIsDark] = useState(false)
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

  const onConnectWallet = () => {
    console.log(122121)
    login(ConnectorNames.Injected)
  }
  
  const { chainId } = useWeb3React()
  console.log(chainId)
  useEffect(() => {
    if (chainId) {
      setChainId(chainId)
    } else {
      setChainId(56)
    }
  }, [chainId])
  return (
    <div>
      <ResetCSS />
      <button onClick={changeDark} type="button" >change</button>
      <button onClick={changeLang} type="button" >changeLang</button>
      {isDark ? 'isDark': 'no-isDark'}
      <MiniSwapLocal lang={lang} onConnectWallet={onConnectWallet} isDark={isDark} />
    </div>
  )
}

export default React.memo(App)
