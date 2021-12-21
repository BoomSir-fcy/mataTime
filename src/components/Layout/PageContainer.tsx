import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { BoxProps, Box, Flex, FlexProps } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import MenuNav from 'components/MenuNav';
import Sidebar from 'components/Sidebar';
import Container from 'components/Layout/Container';
import { hideLeftNavPath, hideSidebarPath } from 'config/constants/navConfig';
import Crumbs from './crumbs';

interface PageSectionProps extends FlexProps {
  containerProps?: BoxProps;
  innerProps?: BoxProps;
}

const PageContainerStyled = styled(Box)`
  /* FIXME: 解决失败, 用另外的方法 */
  /* padding-left: calc(100vw - 100%); // 解决页面滚动条抖动问题 */
`;

const ChildrenWrapper = styled(Box)`
  min-height: auto;
  max-width: 1200px;
  /* width: 1200px; */
  margin: auto;
  padding-top: 0;
  padding-bottom: 0;
`;

const LineStyled = styled(Box)`
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  height: 100vh;
  position: sticky;
  top: 0;
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`;
const InnerBox = styled(Flex)`
  position: relative;
  top: 0;
  z-index: 2;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.primaryDark};
`;

const CennerBox = styled(Box)<{ showSidebar?: boolean }>`
  width: 100%;
  max-width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: ${({ showSidebar }) => (showSidebar ? '670px' : '984px')};
  }
`;

// 解决右侧slider图层在上问题
const GlobalStyle = createGlobalStyle`
  .mini-swap-Modal__Body--open {
    .mini-swap-Modal__Body--open-sidebar{
      z-index: 20;
    }
  }
`;

const PageContainer: React.FC = ({ children }) => {
  const { t } = useTranslation();
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
        <Flex width='100%' alignItems='flex-start' justifyContent='center'>
          {showMenuNav && <MenuNav />}
          <LineStyled />
          <Flex flex='1' alignItems='flex-start' justifyContent='space-between'>
            <InnerBox flex='1' flexDirection='column'>
              <CennerBox showSidebar={showSidebar}>{children}</CennerBox>
            </InnerBox>
            <LineStyled mr='14px' />
            {showSidebar && (
              <Sidebar className='mini-swap-Modal__Body--open-sidebar' />
            )}
          </Flex>
        </Flex>
      </ChildrenWrapper>
    </PageContainerStyled>
  );
};

export default PageContainer;
