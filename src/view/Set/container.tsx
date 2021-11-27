import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { Crumbs, CommonMenu, Affix } from 'components';
import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';
import {
  Search,
  Swap,
  RecommendPeople,
  HotTopic,
  FooterCopyright
} from '../Home/right';

const PageContainer = styled(Box)`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const LeftCard = styled(Flex)`
  width: 200px;
  height: 100vh;
  overflow: auto;
`;
const CenterCard = styled(Box)`
  flex: 1;
  width: 670px;
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
    title: 'setMenuAccountSecurity',
    path: '/set/safeset'
  },
  {
    icon: 'icon-xiaoxi',
    activeIcon: 'icon-xiaoxi1',
    title: 'setMenuNotification',
    path: '/set/noticeset'
  },
  {
    icon: 'icon-aixin',
    activeIcon: 'icon-aixin1',
    title: 'setMenuPreference',
    path: '/set/likeset'
  }
];

export const Container = props => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Flex justifyContent="space-between" width="100%">
        <LeftCard>
          <Affix offsetTop={100} positionObj={{}}>
            <CommonMenu menu={menuArr} {...props} />
          </Affix>
        </LeftCard>
        <CenterCard>
          <Crumbs title={t('homeMenuSet')} />
          {props.children}
        </CenterCard>
        <RightCard>
          <Affix offsetTop={100} positionObj={{}}>
            <>
              <Search />
              <Swap />
              <RecommendPeople />
              <HotTopic {...props} />
              <FooterCopyright />
            </>
          </Affix>
        </RightCard>
      </Flex>
    </PageContainer>
  );
};
