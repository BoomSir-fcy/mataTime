import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts/Localization';

const PageContainer = styled(Box)`
  position: relative;
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
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
      <Crumbs title={t('homeMenuSet')} />
      {props.children}
    </PageContainer>
  );
};
