import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { BoxProps, Box, Flex, FlexProps } from 'uikit';
import MenuNav from 'components/MenuNav';
import Sidebar from 'components/Sidebar';
import Container from 'components/Layout/Container';
import { hideSidebarPath } from '../Sidebar/config';
import { hideLeftNavPath } from '../MenuNav/config';
// backgroundVariants

interface PageSectionProps extends FlexProps {
  containerProps?: BoxProps;
  innerProps?: BoxProps;
}

const PageContainerStyled = styled(Box)`
  padding-left: calc(100vw - 100%); // 解决页面滚动条抖动问题
`;

const ChildrenWrapper = styled(Container)`
  min-height: auto;
  width: 100%;
  padding-top: 0;
  padding-bottom: 0;
`;

const LineStyled = styled(Box)`
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  height: 100vh;
  position: sticky;
  top: 0;
`;
const InnerBox = styled(Flex)`
  position: sticky;
  top: 0;
  z-index: 2;
`;

// 解决图层问题
const GlobalStyle = createGlobalStyle`
  .mini-swap-Modal__Body--open {
    .mini-swap-Modal__Body--open-sidebar{
      z-index: 9;
    }
  }
`

const PageContainer: React.FC = ({ children }) => {
  const { pathname } = useLocation();

  const showSidebar = useMemo(() => {
    return !hideSidebarPath.includes(pathname);
  }, [pathname]);

  const showMenuNav = useMemo(() => {
    return !hideLeftNavPath.includes(pathname);
  }, [pathname]);

  const fillPage = useMemo(() => {
    return !showMenuNav && !showSidebar;
  }, [showMenuNav, showSidebar]);

  if (fillPage) {
    return <Box>{children}</Box>;
  }

  return (
    <PageContainerStyled>
      <GlobalStyle />
      <ChildrenWrapper>
        <Flex width="100%" alignItems="flex-start" justifyContent="center">
          {showMenuNav && <MenuNav />}
          <LineStyled />
          <Flex flex="1" alignItems="flex-start" justifyContent="space-between">
            <InnerBox flex="1" flexDirection="column">
              <Box maxWidth={showSidebar ? '670px' : '984px'} width="100%">
                {children}
              </Box>
            </InnerBox>
            <LineStyled mr="14px" />
            {showSidebar && <Sidebar className="mini-swap-Modal__Body--open-sidebar" />}
          </Flex>
        </Flex>
      </ChildrenWrapper>
    </PageContainerStyled>
  );
};

export default PageContainer;
