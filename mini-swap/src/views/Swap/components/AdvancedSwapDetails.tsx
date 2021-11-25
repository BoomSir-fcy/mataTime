import React from 'react'
import { Trade, TradeType } from 'dsgswap-sdk'
import { Text } from 'pancake-uikit'
import { Field } from 'state/swap/actions'
import { PolyData } from 'state/types'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
import { useTranslation } from 'contexts/Localization'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'
import LiquidityProviderFee from './LiquidityProviderFee'

interface TradeSummaryProps {
  trade: Trade
  allowedSlippage: number
}
interface TradeSummaryPolyProps {
  polyData: PolyData
}

function TradeSummary({ trade, allowedSlippage }: TradeSummaryProps) {
  const { t } = useTranslation()

  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)
  return (
    <AutoColumn style={{ padding: '0 16px' }}>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="text">
            {isExactIn ? t('Minimum received') : t('Maximum sold')}
          </Text>
          <QuestionHelper
            text={t('Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.')}
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <RowFixed>
          <Text fontSize="14px">
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ?? '-'}
          </Text>
        </RowFixed>
      </RowBetween>
      <>
        <RowBetween>
          <RowFixed>
            <Text fontSize="14px" color="text">
              {t('Price Impact')}
            </Text>
            <QuestionHelper
              text={t('The difference between the market price and estimated price due to trade size.')}
              ml="4px"
              placement="top-start"
            />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>

        <RowBetween>
          <LiquidityProviderFee />
          <Text fontSize="14px">
            {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
          </Text>
        </RowBetween>
      </>
    </AutoColumn>
  )
}
function TradeSummaryPloy({ polyData }: TradeSummaryPolyProps) {
  const { t } = useTranslation()

  return (
    <AutoColumn style={{ padding: '0 16px' }}>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {t('Minimum received')}
          </Text>
          <QuestionHelper
            text={t('Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.')}
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <RowFixed>
        <Text fontSize="14px">
          {`${polyData?.toCurrencyAmount?.toSignificant(4)} ${polyData?.toToken?.symbol}` ?? '-'}
        </Text>
        </RowFixed>
      </RowBetween>
    </AutoColumn>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
  polyData?: PolyData
  isPolyMethed?: boolean
}

export function AdvancedSwapDetails({ trade, isPolyMethed, polyData }: AdvancedSwapDetailsProps) {
  const [allowedSlippage] = useUserSlippageTolerance()
  const { t } = useTranslation()

  const showRoute = !isPolyMethed ? Boolean(trade && trade.route.path.length > 2) : Boolean(polyData && polyData.protocols.length > 2)

  return (
    <AutoColumn gap="0px">
      {
        isPolyMethed && (
          <TradeSummaryPloy polyData={polyData} />
        )
      }
      {(trade && !isPolyMethed) && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <RowBetween style={{ padding: '0 16px' }}>
                <RowFixed minWidth="80px">
                  <Text fontSize="14px" color="text">
                    {t('Route')}
                  </Text>
                  <QuestionHelper
                    text={t("Routing through these tokens resulted in the best price for your trade.")}
                    ml="4px"
                    placement="top-start"
                  />
                </RowFixed>
                <SwapRoute isPolyMethed={isPolyMethed} polyData={polyData} trade={trade} />
              </RowBetween>
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}
