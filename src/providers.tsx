import React from 'react';
import { light, dark } from 'uikit';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { ThemeProvider } from 'styled-components';
import { LanguageProvider } from 'contexts/Localization';
import { ConnectWalletProvider } from 'contexts/ConnectWalletContext';
import { store } from 'store';
import { getLibrary } from 'utils';
import { useThemeManager } from 'store/app/hooks';

const ThemeProviderWrapper = props => {
  const [isDark] = useThemeManager();
  return <ThemeProvider theme={isDark ? dark : light} {...props} />;
};

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeProviderWrapper>
          <LanguageProvider>
            <ConnectWalletProvider>
              {children}
            </ConnectWalletProvider>
          </LanguageProvider>
        </ThemeProviderWrapper>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Providers;
