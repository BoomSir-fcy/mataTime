import React from 'react'
import { ChainId, Currency, currencyEquals, getActiveETHERWidthChainId, Token } from 'dsgswap-sdk'
import { Text } from 'pancake-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { useAllTokens } from 'hooks/Tokens'

import { SUGGESTED_BASES } from '../../config/constants'
import { AutoColumn } from '../Layout/Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Layout/Row'
import { CurrencyLogo } from '../Logo'
import FlexAutoWarpper from '../Layout/FlexAutoWarpper'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.colors.dropdown)};
  border-radius: 10px;
  display: flex;
  padding: 6px;
  margin-bottom: 4px !important;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.colors.background};
  }

  background-color: ${({ theme, disable }) => disable && theme.colors.dropdown};
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const { t } = useTranslation()
  const ETHER = getActiveETHERWidthChainId()

  const inactiveTokens: {
    [address: string]: Token
  } = useAllTokens()

  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontSize="14px">{t('Common bases')}</Text>
        <QuestionHelper placement="top-start" text={t('These tokens are commonly paired with other tokens.')} ml="4px" />
      </AutoRow>
      <AutoRow gap="auto">
        <FlexAutoWarpper lineMax={4}>
          <BaseWrapper
            onClick={() => {
              if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
                onSelect(ETHER)
              }
            }}
            disable={selectedCurrency === ETHER}
          >
            <CurrencyLogo symbol={ETHER.symbol} style={{ marginRight: 8 }} />
            <Text>{ETHER?.symbol}</Text>
          </BaseWrapper>
          {(chainId ? (SUGGESTED_BASES[chainId] || []) : []).map((token: Token) => {
            const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
            return (
              <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected} key={token.address}>
                <CurrencyLogo currency={inactiveTokens[token.address] || token} style={{ marginRight: 8 }} />
                <Text>{token.symbol}</Text>
              </BaseWrapper>
            )
          })}
        </FlexAutoWarpper>
      </AutoRow>
    </AutoColumn>
  )
}
