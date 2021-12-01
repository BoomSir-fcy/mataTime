import React from 'react'
import styled from 'styled-components'
import { BoxProps, Box, Flex, FlexProps } from 'uikit'
import Container from 'components/Layout/Container'
// backgroundVariants

interface PageSectionProps extends FlexProps {
  containerProps?: BoxProps
  innerProps?: BoxProps
}

const ChildrenWrapper = styled(Container)`
  min-height: auto;
  width: 100%;
  padding-top: 0;
`

const PageContainer: React.FC = ({ children }) => {

  return (
    <ChildrenWrapper>
      <Flex alignItems="flex-start" justifyContent="center">
        {children}
      </Flex>
    </ChildrenWrapper>
  )
}

export default PageContainer
