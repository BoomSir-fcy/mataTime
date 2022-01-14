import { DeepPartial } from 'redux'
import React, { useEffect } from 'react'
import { ModalProvider, LoadingProvider, light, dark, PancakeTheme } from 'pancake-uikit'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import merge from 'lodash/merge'
import { ThemeProvider } from 'styled-components'
import { LanguageProvider } from 'contexts/Localization'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ToastsProvider } from 'contexts/ToastsContext'
import { ConnectWalletProvider } from 'contexts/ConnectWalletContext'
import { ThemesValueProvider } from 'contexts/ThemesValueContext'
import store from 'state'
import { SupportLanguage } from 'config/localization/languages'

export type Theme = DeepPartial<PancakeTheme>

interface ThemeProps {
  dark: Theme
  light: Theme
}

const ThemeProviderWrapper:React.FC<{
  isDark?: boolean
  resetTheme?: ThemeProps
}> = ({ isDark, resetTheme, ...props }) => {
  
  const _dark = merge(dark, resetTheme?.dark)
  const _light = merge(light, resetTheme?.light)
  return <ThemesValueProvider dark={_dark} light={_light}>
    <ThemeProvider theme={isDark ? _dark : _light} {...props} />
  </ThemesValueProvider>
  // return <ThemeProvider theme={isDark ? merge(dark, resetTheme?.dark) : merge(light, resetTheme?.light)} {...props} />
}

export interface ProvidersPorps {
  isDark?: boolean
  chainId?: number
  resetTheme?: ThemeProps
  lang?: SupportLanguage
  onConnectWallet?: () => void
}

const Providers: React.FC<ProvidersPorps> = ({ isDark, chainId, lang, children, resetTheme, onConnectWallet, ...props }) => {

  return (
    <Provider store={store}>
      <ConnectWalletProvider {...props} onConnectWallet={onConnectWallet}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeProviderWrapper resetTheme={resetTheme} isDark={isDark}>
              <LanguageProvider lang={lang}>
                <RefreshContextProvider>
                  <LoadingProvider>
                    <ModalProvider>
                      {children}
                    </ModalProvider>
                  </LoadingProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeProviderWrapper>
          </HelmetProvider>
        </ToastsProvider>
      </ConnectWalletProvider>
    </Provider>
  )
}

export default Providers
