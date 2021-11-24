import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { CommonMenu, Affix } from 'components';
import { useLocation } from 'hooks';
import {
  Search,
  Swap,
  RecommendPeople,
  HotTopic,
  FooterCopyright
} from '../Home/right';
import { Menu } from 'view/Home/left/menu';

const PageContainer = styled(Box)`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  display: flex;
`;
const LeftCard = styled(Flex)`
  width: 200px;
  height: 100vh;
  overflow: auto;
`;
const CenterCard = styled(Box)`
  flex: 1;
  margin: 0 15px;
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
const RightCard = styled(Flex)`
  width: 300px;
  height: 100vh;
  position: relative;
  overflow: auto;
`;

const menuArr = [
  {
    icon: 'icon-gerenxinxi',
    activeIcon: 'icon-gerenxinxi1',
    title: 'meMenuHome',
    path: '/me'
  },
  {
    icon: 'icon-e31guanzhu',
    activeIcon: 'icon-e31guanzhuxuanzhong',
    title: 'meMenuFollow',
    path: '/me/follow'
  },
  {
    icon: 'icon-aixin',
    activeIcon: 'icon-aixin1',
    title: 'meMenuFans',
    path: '/me/fans'
  },
  {
    icon: 'icon-dianzan',
    activeIcon: 'icon-dianzan1',
    title: 'meMenuLink',
    path: '/me/praise'
  },
  {
    icon: 'icon-shoucang',
    activeIcon: 'icon-shoucang1',
    title: 'meMenuFav',
    path: '/me/collect',
    badge: false
  }
  // {
  //   icon: 'icon-pingbi1',
  //   activeIcon: 'icon-pingbi',
  //   title: 'meMenuShield',
  //   path: '/me/shield',
  // },
];

export const Container = props => {
  useLocation();
  const index = props.location.pathname.indexOf('/me/profile');
  return (
    <PageContainer>
      <Flex justifyContent="space-between" width="100%">
        <LeftCard>
          <Affix offsetTop={0} positionObj={{}}>
            {index > -1 ? <Menu /> : <CommonMenu menu={menuArr} {...props} />}
          </Affix>
        </LeftCard>
        <CenterCard>{props.children}</CenterCard>
        <RightCard>
          <Affix offsetTop={100} positionObj={{}}>
            <>
              <Search />
              <Swap />
              <RecommendPeople />
              <HotTopic />
              <FooterCopyright />
            </>
          </Affix>
        </RightCard>
      </Flex>
    </PageContainer>
  );
};
