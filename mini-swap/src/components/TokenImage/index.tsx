import React from 'react'
import {
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
  TokenImage as UIKitTokenImage,
  ImageProps,
} from 'pancake-uikit'
import { ETHER_TOKEN } from 'dsgswap-sdk'

import { Token } from 'config/constants/types'
import { getAddress, getToken } from 'utils/addressHelpers'
import getTokenLogoURL from 'utils/getTokenLogoURL'
import { BASE_TOKEN_URL } from 'config'

interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken?: Token
  secondaryToken?: Token
  primarySymbol?: string
  secondarySymbol?: string
  primaryAddress?: string
  secondaryAddress?: string
}

const getImageUrlFromToken = (token: Token) => {
  return `${BASE_TOKEN_URL}${token.symbol}.png`
}

const getTokenImgs = (token?: Token, symbol?: string, address?: string) => {
  if (token && token?.symbol) {
    if (token?.address) {
      const tokenAddress = token.symbol === getToken(ETHER_TOKEN).symbol ? getToken(ETHER_TOKEN).address : getAddress(token.address)
      return [
        `${BASE_TOKEN_URL}${tokenAddress}.svg`,
        `${BASE_TOKEN_URL}${tokenAddress}.png`,
        `${BASE_TOKEN_URL}${token.symbol}.png`,
        getTokenLogoURL(tokenAddress),
      ]
    }
    return [
      `${BASE_TOKEN_URL}${token.symbol}.png`,
    ]
  }
  let symbols = []
  if (symbol) {
    symbols = [`${BASE_TOKEN_URL}${symbol}.png`]
  }
  if (address) {
    const addresss = [
      `${BASE_TOKEN_URL}${address}.svg`,
      `${BASE_TOKEN_URL}${address}.png`,
      ...symbols,
      getTokenLogoURL(address),
    ]
    return addresss
  }
  return symbols
}

export const TokenPairImage: React.FC<TokenPairImageProps> = ({
  primaryToken,
  primarySymbol,
  secondarySymbol,
  secondaryToken,
  primaryAddress,
  secondaryAddress,
  ...props
}) => {
  const primarySrc = primaryToken ? getTokenImgs(primaryToken) : getTokenImgs(null, primarySymbol, primaryAddress)
  const secondarySrc = primaryToken ? getTokenImgs(secondaryToken) : getTokenImgs(null, secondarySymbol, secondaryAddress)
  return <UIKitTokenPairImage primarySrcs={primarySrc} secondarySrcs={secondarySrc} {...props} />
}

interface TokenImageProps extends ImageProps {
  token: Token
}

export const TokenImage: React.FC<TokenImageProps> = ({ token, ...props }) => {
  return <UIKitTokenImage srcs={[getImageUrlFromToken(token)]} {...props} />
}
