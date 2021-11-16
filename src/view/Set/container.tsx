import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { Crumbs, CommonMenu } from 'components';

import { mediaQueriesSize } from 'uikit/theme/base';
import { Search, Swap, RecommendPeople, HotTopic, FooterCopyright } from '../Home/right';

const PageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 35px;
  display: flex;
  justify-content: center;
`;
const LeftCard = styled(Flex)``;
const CenterCard = styled(Box)`
  flex: 1;
  ${mediaQueriesSize.marginLRmd}
`;
const RightCard = styled.div`
  width: 375px;
`;

const menuArr = [
  {
    icon: 'icon-shouye',
    activeIcon: 'icon-shouye1',
    title: 'setMenuAccountSecurity',
    path: '/set/safeset'
  },
  {
    icon: 'icon-xingqiu',
    activeIcon: 'icon-xingqiu1',
    title: 'setMenuNotification',
    path: '/set/noticeset'
  },
  {
    icon: 'icon-xiaoxi',
    activeIcon: 'icon-xiaoxi1',
    title: 'setMenuPreference',
    path: '/set/likeset'
  }
];

export const Container = props => {
  return (
    <PageContainer>
      <Flex justifyContent="space-between" width="100%">
        <LeftCard>
          <CommonMenu menu={menuArr} {...props} />
        </LeftCard>
        <CenterCard>
          <Crumbs title="设置" />
          {props.children}
        </CenterCard>
        <RightCard>
          <Search />
          <Swap />
          <RecommendPeople />
          <HotTopic />
          <FooterCopyright />
        </RightCard>
      </Flex>
    </PageContainer>
  );
};
