import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getActiveETHERWidthChainId, getValueWithChainId } from 'dsgswap-sdk';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { useStore } from 'store';
import MiniSwap from 'libs/mini-swap';
import { useWeb3React } from '@web3-react/core';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import { useTranslation } from 'contexts/Localization';
import { light, dark, Text, Box, LinkExternal, Flex } from 'uikit';
import useConnectWallet from 'hooks/useConnectWallet';
import { CoinMarketCap } from 'components/CoinMarketCap';
import { backgroundColor } from 'styled-system';
import {
  getAddress,
  getDsgAddress,
  getTimeAddress,
} from 'utils/addressHelpers';
import { Address } from 'config/constants/types';
import { useCoinsList } from 'store/coins/hooks';

const SwapBox = styled.div`
  /* margin-top:15px; */
  width: 300px;
  /* height: 436px; */
`;

const defaultStyle = {
  transition: `box-shadow 300ms ease-in-out`,
  borderRadius: '10px',
  // opacity: 0,
  // color: ''
};
const innerShadow = '0px 0px 25px 0px rgba(180, 200, 169, 0.3)';
const outShadow = '0px 0px 25px 0px rgba(180, 200, 169, 0)';

const transitionStyles = {
  entering: { boxShadow: innerShadow },
  entered: { boxShadow: innerShadow },
  exiting: { boxShadow: outShadow },
  exited: { boxShadow: outShadow },
};

const Swap: React.FC<{ onlySwap?: boolean }> = ({ onlySwap }) => {
  const { chainId } = useWeb3React();
  const { t, currentLanguage } = useTranslation();

  const [inPropSwap, setInPropSwap] = useState(false);
  const [inPropCoin, setInPropCoin] = useState(false);

  const [isDark] = useThemeManager();
  const { onConnectWallet } = useConnectWallet();

  const coins = useStore(p => p.coins.clickCoins);
  const coinsList = useCoinsList();

  const handleInputChange = useCallback(currency => {
    console.debug(currency);
  }, []);

  useEffect(() => {
    if (coins?.symbol) {
      const activeCoin = coinsList.find(
        item => item.coin_symbol === coins.symbol,
      );
      setInPropSwap(true);
      if (activeCoin) {
        setInPropCoin(true);
      }
      const timer = setTimeout(() => {
        setInPropSwap(false);
        setInPropCoin(false);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [coins]);

  const outputCurrencyId = useMemo(() => {
    const ETHER = getActiveETHERWidthChainId();
    if (!coins?.symbol) return getTimeAddress();
    if (coins?.symbol === ETHER.symbol) return coins?.symbol;
    return getAddress(coins.address as Address);
  }, [coins]);

  const inputCurrencyId = useMemo(() => {
    return getDsgAddress();
  }, [coins]);

  return (
    <SwapBox>
      {!onlySwap && (
        <Transition in={inPropCoin} timeout={500}>
          {state => (
            <CoinMarketCap
              mb='14px'
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            />
          )}
        </Transition>
      )}
      <Transition in={inPropSwap} timeout={500}>
        {state => (
          <Box
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <MiniSwap
              titlehelper={t(
                'When you search for some topics about tokens, the platform will automatically provide token quick swap function, providing one-stop crypto services. Right now Metatime supports mainstream digital tokens, and will continue to access more tokens, please look forward to staking function.t',
              )}
              powered={
                <Flex padding='0 20px 20px'>
                  <Text>Powered by &nbsp;</Text>
                  <LinkExternal
                    color='primary'
                    height='24px'
                    fontSize='16px'
                    href='https://dsgmetaverse.com/'
                  >
                    DSGmetaverse
                  </LinkExternal>
                </Flex>
              }
              // subTitleTips={<Text>推荐自@0x526w.....已自动为您匹配$To ken$</Text>}
              onInputCurrencyChange={handleInputChange}
              outputCurrencyId={outputCurrencyId}
              inputCurrencyId={inputCurrencyId}
              resetTheme={{
                dark: {
                  colors: {
                    dropdown: dark.colors.input,
                    failure: light.colors.failure,
                    text: dark.colors.white_black,
                    backgroundDisabled: dark.colors.tertiary,
                    primary: dark.colors.primary,
                    success: dark.colors.success,
                    textSubtle: dark.colors.textTips,
                    backgroundAlt: dark.colors.backgroundCard,
                    background: dark.colors.background,
                    dropdownDeep: dark.colors.backgroundCard,
                    invertedContrast: dark.colors.backgroundCard,
                  },
                  shadows: {
                    inset: 'none',
                    box: 'none',
                    success: '',
                  },
                  modal: {
                    background: dark.colors.backgroundCard,
                  },
                  card: {
                    boxShadow: '',
                    background: dark.colors.backgroundCard,
                  },
                  zIndices: {
                    modal: 9999,
                  },
                },
                light: {
                  colors: {
                    dropdown: light.colors.input,
                    failure: light.colors.failure,
                    text: light.colors.white_black,
                    backgroundDisabled: light.colors.tertiary,
                    primary: light.colors.textPrimary,
                    textSubtle: light.colors.white_black,
                    backgroundAlt: light.colors.backgroundAlt,
                    invertedContrast: light.colors.invertedContrast,
                  },
                  shadows: {
                    inset: 'none',
                    box: 'none',
                  },
                  card: {
                    boxShadow: '',
                    background: light.colors.backgroundCard,
                  },
                  zIndices: {
                    modal: 9999,
                  },
                },
              }}
              onConnectWallet={onConnectWallet}
              chainId={chainId}
              isDark={isDark}
              lang={currentLanguage.locale}
            />
          </Box>
        )}
      </Transition>
    </SwapBox>
  );
};

export default Swap;
