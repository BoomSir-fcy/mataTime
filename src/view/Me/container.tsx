import React from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route } from 'react-router-dom';
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

import { mediaQueriesSize } from 'uikit/theme/base';

const PageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 35px;
  display: flex;
  justify-content: center;
`;
const LeftCard = styled(Flex)`
  /* width: 200px; */
`;
const CenterCard = styled(Box)`
  width: 670px;
  ${mediaQueriesSize.marginLRmd}
`;
const RightCard = styled.div`
  /* width: 300px; */
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
    icon: 'icon-a-tianjiaguanzhuguanzhu',
    activeIcon: 'icon-gerenxinxi1',
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
      <Flex justifyContent="space-between">
        <Affix
          offsetTop={100}
          positionObj={{
            top: '10px',
            left: '50%',
            marginLeft: '-550px'
          }}
        >
          <LeftCard>
            {index > -1 ? <Menu /> : <CommonMenu menu={menuArr} {...props} />}
          </LeftCard>
        </Affix>
        <CenterCard>{props.children}</CenterCard>
        <Affix
          offsetTop={100}
          positionObj={{
            top: '10px',
            right: '50%',
            marginRight: '-660px'
          }}
        >
          <RightCard>
            <Route path="/" component={Search}></Route>
            <Route path="/" component={Swap}></Route>
            <Route path="/" component={RecommendPeople}></Route>
            <Route path="/" component={HotTopic}></Route>
            <Route path="/" component={FooterCopyright}></Route>
          </RightCard>
        </Affix>
      </Flex>
    </PageContainer>
  );
};
