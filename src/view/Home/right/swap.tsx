import React from 'react';
import styled from "styled-components";
import MiniSwap from 'libs/mini-swap'
import { useWeb3React } from '@web3-react/core';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import useConnectWallet from 'hooks/useConnectWallet';

const SwapBox = styled.div`
margin-top:15px;
width: 300px;
/* height: 436px; */
`
export const Swap: React.FC = () => {
  const { chainId } = useWeb3React()

  console.log(chainId)

  const [languange] = useLanguange()
  const [isDark] = useThemeManager()
  const { onConnectWallet } = useConnectWallet()

  // TODO: 样式不统一  待优化

  return (
    <SwapBox>
      <MiniSwap resetTheme={{
        dark: {
          colors: {
            primary: '#4168ED',
            textSubtle: '#7393ff',
            backgroundAlt: '#212827'
          }
        },
        light: {
          colors: {
            primary: '#4168ED',
            textSubtle: '#7393ff',
            backgroundAlt: '#FFFFFF'
          }
        }
      }}
        onConnectWallet={onConnectWallet}
        chainId={chainId} isDark={isDark} lang={languange} />
    </SwapBox>
  )
}