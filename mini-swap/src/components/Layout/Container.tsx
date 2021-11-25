import React from 'react'
import { Box, BoxProps } from 'pancake-uikit'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'

const BoxStyled = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  /* ${({ theme }) => theme.mediaQueries.xl} {
    padding: 16px 8px;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 16px 8px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 16px 16px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 16px 24px;
  } */
`

const Container: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <BoxStyled mx="auto" maxWidth="1300px" {...props}>
      {children}
    </BoxStyled>
  )
}

export default Container
