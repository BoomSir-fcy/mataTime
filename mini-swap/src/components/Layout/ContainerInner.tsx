import React from 'react'
import { Box, BoxProps } from 'pancake-uikit'
import styled from 'styled-components'

const BoxStyled = styled(Box)`
  flex: 1;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin: 16px 8px;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    margin: 16px 8px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 16px 16px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 16px 24px;
  }
`

const ContainerInner: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <BoxStyled mx="auto" width="100%" {...props}>
      {children}
    </BoxStyled>
  )
}

export default ContainerInner
