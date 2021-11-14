import React from 'react'
import { Box, BoxProps } from 'uikit'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'

const BoxStyled = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
`

const Container: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <BoxStyled mx="auto" maxWidth="1300px" {...props}>
      {children}
    </BoxStyled>
  )
}

export default Container
