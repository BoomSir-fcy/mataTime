import React, { useCallback } from 'react';
import styled from 'styled-components';
import MiniSwap from 'libs/mini-swap';
import { useWeb3React } from '@web3-react/core';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import { light, dark } from 'uikit';
import useConnectWallet from 'hooks/useConnectWallet';
import { CoinMarketCap } from 'components/CoinMarketCap';

const SwapBox = styled.div`
  /* margin-top:15px; */
  width: 300px;
  /* height: 436px; */
`;
export const Swap: React.FC = () => {
  const { chainId } = useWeb3React();

  const [languange] = useLanguange();
  const [isDark] = useThemeManager();
  const { onConnectWallet } = useConnectWallet();

  const handleInputChange = useCallback(currency => {
    console.log(currency);
  }, []);

  return (
    <SwapBox>
      <CoinMarketCap mt="25px" mb="15px" />
      <MiniSwap
        onInputCurrencyChange={handleInputChange}
        resetTheme={{
          dark: {
            colors: {
              primary: dark.colors.backgroundPrimary,
              textSubtle: dark.colors.textPrimary,
              backgroundAlt: dark.colors.dropdownDeep,
              invertedContrast: dark.colors.backgroundCard,
            },
            card: {
              boxShadow: dark.shadows.box
            }
          },
          light: {
            colors: {
              primary: light.colors.backgroundPrimary,
              textSubtle: light.colors.textPrimary,
              backgroundAlt: light.colors.backgroundAlt,
              invertedContrast: light.colors.invertedContrast,
            },
            card: {
              boxShadow: light.shadows.box
            }
          }
        }}
        onConnectWallet={onConnectWallet}
        chainId={chainId}
        isDark={isDark}
        lang={languange?.value?.locale}
      />
    </SwapBox>
  );
};
