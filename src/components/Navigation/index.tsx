import React from 'react';
import styled from 'styled-components';
import { Icon, Badge } from 'components';
import { Flex, Button, Image } from 'uikit';
import { useStore } from 'store';

const NavigationContainer = styled(Flex)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 75px;
  background: #000000;
  box-shadow: 0px -6px 8px 0px rgba(255, 255, 255, 0.15);
  border-radius: 50px 50px 0 0;
  position: fixed;
  bottom: 0;
  z-index: 1100;
`;

const TabButton = styled(Button)<{ active: boolean }>`
  position: relative;
`;

// showModal
export const Navigation = React.memo(() => {
  const userInfo = useStore(p => p.loginReducer.userInfo);

  return (
    <NavigationContainer>
      <TabButton variant='text' active={true}>
        <Icon name='icon-shouye' size={25} />
      </TabButton>
      <TabButton variant='text'>
        <Icon name='icon-tixing' size={25} />
        <Badge count='999' />
      </TabButton>
      <TabButton variant='text'>
        <Icon name='icon-qianbao2' size={25} />
      </TabButton>
      <TabButton variant='text' width='76px'>
        <Image
          width={38}
          height={38}
          style={{ borderRadius: '50%', overflow: 'hidden' }}
          src={userInfo?.nft_image}
          alt={userInfo?.nick_name}
        />
      </TabButton>
    </NavigationContainer>
  );
});
