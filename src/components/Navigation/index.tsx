import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components';
import { Flex, Button } from 'uikit';

const NavigationContainer = styled(Flex)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 55px;
  background: #000000;
  box-shadow: 0px -6px 8px 0px rgba(255, 255, 255, 0.15);
  border-radius: 50px 50px 0 0;
  position: fixed;
  bottom: 0;
  z-index: 1100;
`;

const Tab = styled(Button)<{ active: boolean }>``;

// showModal
export const Navigation = React.memo(() => {
  return (
    <NavigationContainer>
      <Button variant='text'>
        <Icon name='icon-shouye' />
      </Button>
      <Button variant='text'>
        <Icon name='icon-tixing' />
      </Button>
      <Button variant='text'>
        <Icon name='icon-qianbao2' />
      </Button>
    </NavigationContainer>
  );
});
