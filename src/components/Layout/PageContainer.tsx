import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { BoxProps, Box, Flex, FlexProps } from 'uikit'
import MenuNav from 'components/MenuNav';
import Sidebar from 'components/Sidebar';
import Container from 'components/Layout/Container'
import { hideSidebarPath } from '../Sidebar/config';
import { hideLeftNavPath } from '../MenuNav/config';
// backgroundVariants

interface PageSectionProps extends FlexProps {
  containerProps?: BoxProps
  innerProps?: BoxProps
}

const ChildrenWrapper = styled(Container)`
  min-height: auto;
  width: 100%;
  padding-top: 0;
  padding-bottom: 0;
`

const LineStyled = styled(Box)`
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  height: 100vh;
  position: sticky;
  top: 0;
`
const InnerBox = styled(Flex)`
  position: sticky;
  top: 0;
`

const PageContainer: React.FC = ({ children }) => {
  const { pathname } = useLocation()

  console.log(pathname, 'pathname')

  const showSidebar = useMemo(() => {
    return !hideSidebarPath.includes(pathname)
  }, [pathname])

  return (
    <ChildrenWrapper>
      <Flex width="100%" alignItems="flex-start" justifyContent="center">
        {
          !hideLeftNavPath.includes(pathname) && (
            <MenuNav />
          )
        }
        <LineStyled />
        <Flex flex="1" alignItems="flex-start" justifyContent="space-between">
          <InnerBox flex="1" flexDirection="column">
            <Box maxWidth={showSidebar ? '670px' : '984px'} width="100%">
              {children}
            </Box>
          </InnerBox>
          <LineStyled mr="14px"/>
          {
            showSidebar && (
              <Sidebar />
            )
          }
        </Flex>
      </Flex>
    </ChildrenWrapper>
  )
}

export default PageContainer
