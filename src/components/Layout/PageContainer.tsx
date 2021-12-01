import React from 'react'
import styled from 'styled-components'
import { BoxProps, Box, Flex, FlexProps } from 'uikit'
import MenuNav from 'components/MenuNav';
import Sidebar from 'components/Sidebar';
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
      <Flex width="100%" alignItems="flex-start" justifyContent="center">
        <MenuNav />
        <Flex flex="1" alignItems="flex-start" justifyContent="space-between">
          <Flex mr="14px" flex="1" flexDirection="column">
            <Box maxWidth="670px" width="100%">
              {children}
            </Box>
          </Flex>
          <Sidebar />
        </Flex>
      </Flex>
    </ChildrenWrapper>
  )
}

export default PageContainer
