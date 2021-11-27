import React from 'react'
import styled from 'styled-components'
import useLastTruthy from 'hooks/useLast'
import { AdvancedSwapDetails, AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  margin-top: ${({ show }) => (show ? '0' : 0)};
  padding-top: 0;
  padding-bottom: 0;
  width: 100%;
  max-width: 400px;
  border-radius: 0;
  background-color: ${({ theme }) => theme.colors.invertedContrast};

  /* transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-128%)')}; */
  /* max-height: ${({ show }) => (show ? 'auto' : '60px')}; */
  /* overflow:  ${({ show }) => (show ? 'visible' : 'hide')};; */
  transition: transform 300ms ease-in-out;
`

export default function AdvancedSwapDetailsDropdown({ trade, isPolyMethed, polyData, ...rest }: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade)

  const show = Boolean(isPolyMethed ? polyData : trade)

  return (
    <AdvancedDetailsFooter show={show}>
      {show && <AdvancedSwapDetails {...rest} isPolyMethed={isPolyMethed} polyData={polyData} trade={trade ?? lastTrade ?? undefined} />}

    </AdvancedDetailsFooter>
  )
}
