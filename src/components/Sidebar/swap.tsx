import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Transition } from "react-transition-group";
import { useStore } from 'store';
import MiniSwap from 'libs/mini-swap';
import { useWeb3React } from '@web3-react/core';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import { useTranslation } from 'contexts/Localization';
import { light, dark, Text, Box, LinkExternal, Flex } from 'uikit';
import useConnectWallet from 'hooks/useConnectWallet';
import { CoinMarketCap } from 'components/CoinMarketCap';
import { backgroundColor } from 'styled-system';

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
}
const innerShadow = '0px 0px 25px 0px rgba(115, 147, 255, 0.5)'
const outShadow = '0px 0px 25px 0px rgba(180, 200, 169, 0)'

const transitionStyles = {
  entering: { boxShadow: innerShadow },
  entered: { boxShadow: innerShadow },
  exiting: { boxShadow: outShadow },
  exited: { boxShadow: outShadow },
};

const Swap: React.FC = () => {
  const { chainId } = useWeb3React();
  const { t, currentLanguage } = useTranslation();

  console.log(currentLanguage, 'currentLanguage')

  const [inProp, setInProp] = useState(false);

  const [isDark] = useThemeManager();
  const { onConnectWallet } = useConnectWallet();

  const coins = useStore(p => p.coins.clickCoins);

  const handleInputChange = useCallback(currency => {
    console.log(currency);
  }, []);

  useEffect(() => {
    if (coins?.symbol) {
      setInProp(true)
      const timer = setTimeout(() => {
        setInProp(false)
      }, 500)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [coins])

  return (
    <SwapBox>
      <Transition in={inProp} timeout={500}>
        {
          state => (
            <CoinMarketCap mb="14px"
            // style={{
            //   ...defaultStyle,
            //   ...transitionStyles[state]
            // }}
            />)
        }
      </Transition>
      <Transition in={inProp} timeout={500}>
        {state =>
        (<Box
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <MiniSwap
            titlehelper={t(
              'When you search for some token topics, the platform will automatically provide token quick exchange function and one-stop encryption service. Now it supports mainstream digital currencies, and more currencies will be accessed in the future. Please look forward to it'
            )}
            powered={<Flex padding="0 20px 20px">
              <Text>
                Powered by &nbsp;
              </Text>
              <LinkExternal color="primary" height="24px" fontSize="16px" href="https://dsgmetaverse.com/">
                Dsgmetaverse
              </LinkExternal>
            </Flex>}
            // subTitleTips={<Text>推荐自@0x526w.....已自动为您匹配$To ken$</Text>}
            onInputCurrencyChange={handleInputChange}
            inputCurrencyId="0x0858241B08b1335d7711838D6cC9C60a72c92C4B"
            resetTheme={{
              dark: {
                colors: {
                  dropdown: dark.colors.input,
                  text: dark.colors.white_black,
                  backgroundDisabled: dark.colors.tertiary,
                  primary: dark.colors.primary,
                  success: dark.colors.success,
                  textSubtle: dark.colors.textTips,
                  backgroundAlt: dark.colors.backgroundCard,
                  background: dark.colors.background,
                  dropdownDeep: dark.colors.backgroundCard,
                  invertedContrast: dark.colors.backgroundCard
                },
                shadows: {
                  inset: 'none',
                  box: 'none',
                  success: ''
                },
                modal: {
                  background: dark.colors.backgroundCard,
                },
                card: {
                  boxShadow: '',
                  background: dark.colors.backgroundCard
                },
                zIndices: {
                  modal: 9999
                }
              },
              light: {
                colors: {
                  dropdown: light.colors.input,
                  text: light.colors.white_black,
                  backgroundDisabled: light.colors.tertiary,
                  primary: light.colors.textPrimary,
                  textSubtle: light.colors.white_black,
                  backgroundAlt: light.colors.backgroundAlt,
                  invertedContrast: light.colors.invertedContrast
                },
                shadows: {
                  inset: 'none',
                  box: 'none'
                },
                card: {
                  boxShadow: '',
                  background: light.colors.backgroundCard
                },
                zIndices: {
                  modal: 9999
                }
              }
            }}
            onConnectWallet={onConnectWallet}
            chainId={chainId}
            isDark={isDark}
            lang={currentLanguage.locale}
          />
        </Box>)}
      </Transition>
    </SwapBox>
  );
};

export default Swap
