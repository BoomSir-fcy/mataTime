import React from 'react';
import { light, dark } from 'uikit';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { ThemeProvider } from 'styled-components';
import { LanguageProvider } from 'contexts/Localization';
import { store } from 'store';
import { getLibrary } from 'utils';

const ThemeProviderWrapper = props => {
  // const theme = { main: "mediumseagreen" };
  return <ThemeProvider theme={dark} {...props} />;
};

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeProviderWrapper>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProviderWrapper>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Providers;
