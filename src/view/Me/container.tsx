import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { useLocation } from 'hooks';

const PageContainer = styled(Box)`
  position: relative;
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

export const Container = props => {
  useLocation();
  // const index = props.location.pathname.indexOf('/me/profile');
  return <PageContainer>{props.children}</PageContainer>;
};
