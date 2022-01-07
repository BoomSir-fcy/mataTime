import React from 'react';
import styled from 'styled-components';
import { Flex } from 'uikit';

const NavigationContainer = styled(Flex)`
  height: 115px;
  background: #000000;
  box-shadow: 0px -6px 8px 0px rgba(255, 255, 255, 0.15);
  border-radius: 50px;
`;

export const Navigation = React.memo(() => {
  return <NavigationContainer>111</NavigationContainer>;
});
