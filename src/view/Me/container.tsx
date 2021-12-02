import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { useLocation } from 'hooks';

const PageContainer = styled(Box)`
  position: relative;
  max-width: 100%;
`;

export const Container = props => {
  useLocation();
  // const index = props.location.pathname.indexOf('/me/profile');
  return <PageContainer>{props.children}</PageContainer>;
};
