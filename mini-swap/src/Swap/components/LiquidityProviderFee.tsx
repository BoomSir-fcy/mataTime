import React from 'react'
import { getValueWithChainId, SWAP_STAKE_NFT_INFO, SWAP_TOKEN, SWAP_V_TOKEN } from 'dsgswap-sdk'
import { Text, Flex } from 'pancake-uikit'
import QuestionHelper from 'components/QuestionHelper'
import { useTranslation } from 'contexts/Localization'

/**
 * Formatted version of price impact text with warning colors
 */
export default function LiquidityProviderFee() {
  const { t } = useTranslation()

  const nftInfo = getValueWithChainId(SWAP_STAKE_NFT_INFO)
  const swapToken = getValueWithChainId(SWAP_TOKEN)
  const swapvToken = getValueWithChainId(SWAP_V_TOKEN)

  return (
    <Flex>
      <Text fontSize="14px" color="text">
        {t('Fee')}
      </Text>
      <QuestionHelper
        text={
          <>
            <Text mb="12px">{t('for each trade a 0.3% fee is paid')}:</Text>
            <Text>-{t('0.1% to the LP token holders')}</Text>
            <Text>-{t('0.04% to the %symbol% stakers', {
              symbol: `${t(nftInfo.name)} NFT`
            })}</Text>
            <Text>-{t('0.05% buyback %symbol% and burn', {
              symbol: swapToken.symbol
            })}</Text>
            <Text>-{t('0.025% buyback %symbol%, then to %symbol% LP', {
              symbol: swapToken.symbol
            })}</Text>
            <Text>-{t('0.025% to %symbol% holder', {
              symbol: swapvToken.symbol
            })}</Text>
            <Text>-{t('0.06% to operation fund')}</Text>
          </>
        }
        placement="top-start"
        ml="4px"
      />
    </Flex>
  )
}
