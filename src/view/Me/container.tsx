import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { useLocation } from 'hooks';

const PageContainer = styled(Box)`
  position: relative;
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
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
  // const index = props.location.pathname.indexOf('/me/profile');
  return <PageContainer>{props.children}</PageContainer>;
};
