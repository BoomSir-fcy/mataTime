import React, { Fragment, memo } from 'react'
import { Trade } from 'dsgswap-sdk'
import { Text, Flex, ChevronRightIcon } from 'pancake-uikit'
import { unwrappedToken } from 'utils/wrappedCurrency'
import { PolyData } from 'state/types'

export default memo(function SwapRoute({ trade, polyData, isPolyMethed }: { trade?: Trade, isPolyMethed?: boolean, polyData?: PolyData }) {
  const renderPath = isPolyMethed ? polyData.protocols : trade.route.path
  return (
    <Flex flexWrap="wrap" width="100%" justifyContent="flex-end" alignItems="center">
      {renderPath.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1
        const currency = unwrappedToken(token)
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={i}>
            <Flex alignItems="end">
              <Text fontSize="14px" ml="0.125rem" mr="0.125rem">
                {currency.symbol}
              </Text>
            </Flex>
            {!isLastItem && <ChevronRightIcon width="12px" />}
          </Fragment>
        )
      })}
    </Flex>
  )
})
