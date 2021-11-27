import React, { useCallback } from 'react';
import styled from 'styled-components';
import MiniSwap from 'libs/mini-swap';
import { useWeb3React } from '@web3-react/core';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import { useTranslation } from 'contexts/Localization';
import { light, dark, Text } from 'uikit';
import useConnectWallet from 'hooks/useConnectWallet';
import { CoinMarketCap } from 'components/CoinMarketCap';
import { backgroundColor } from 'styled-system';

const SwapBox = styled.div`
  /* margin-top:15px; */
  width: 300px;
  /* height: 436px; */
`;
export const Swap: React.FC = () => {
  const { chainId } = useWeb3React();
  const { t } = useTranslation();

  const [languange] = useLanguange();
  const [isDark] = useThemeManager();
  const { onConnectWallet } = useConnectWallet();

  const handleInputChange = useCallback(currency => {
    console.log(currency);
  }, []);

  return (
    <SwapBox>
      <CoinMarketCap mb="14px" />
      <MiniSwap
        titlehelper={t('当您搜索一些代币话题时, 平台会自动提供代币快捷兑换功能,提供一站式加密服务,现已支持主流数字货币,后续将不断接入更多货币,敬请期待')}
        subTitleTips={<Text>
          推荐自@0x526w.....已自动为您匹配$To ken$
        </Text>}
        onInputCurrencyChange={handleInputChange}
        resetTheme={{
          dark: {
            colors: {
              dropdown: dark.colors.input,
              text: dark.colors.white_black,
              backgroundDisabled: dark.colors.tertiary,
              primary: dark.colors.textPrimary,
              textSubtle: dark.colors.white_black,
              backgroundAlt: dark.colors.dropdownDeep,
              invertedContrast: dark.colors.backgroundCard
            },
            shadows: {
              inset: 'none'
            },
            card: {
              boxShadow: dark.shadows.box,
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
              inset: 'none'
            },
            card: {
              boxShadow: light.shadows.box,
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
        lang={languange?.value?.locale}
      />
    </SwapBox>
  );
};
