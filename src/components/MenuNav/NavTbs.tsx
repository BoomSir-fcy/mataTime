import React from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { Icon, Badge } from 'components';
import { Flex, Button, Image } from 'uikit';
import { useStore } from 'store';

import { tbasNavConfig } from 'config/constants/navConfig';

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
  z-index: 9;
`;

const TabButton = styled(Button)<{ active: boolean }>`
  position: relative;
  width: 50px;
  height: 50px;
  ${({ theme, active }) =>
    active && {
      background: theme.colors.backgroundCard,
    }}
`;

export const Navigation = React.memo(() => {
  const history = useHistory();
  const location = useLocation();
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const notification = useStore(p => p.appReducer.systemCustom.notification);
  const unReadMsg = useStore(p => p.loginReducer.unReadMsg);

  const goRoute = (route: string) => {
    history.push(route);
  };

  if (location.pathname === '/login') {
    return <></>;
  }

  return (
    <NavigationContainer>
      {tbasNavConfig.map((row, index) => (
        <TabButton
          key={index}
          variant='text'
          active={location.pathname === row.path}
          onClick={() => goRoute(row.path)}
        >
          <Icon name={row.icon} size={25} />
          {row.badgeName && notification && (
            <Badge count={unReadMsg.mineTotalMsgNum} />
          )}
        </TabButton>
      ))}
      <TabButton
        variant='text'
        style={{ padding: 0 }}
        onClick={() => goRoute(`/me/profile/${userInfo?.uid}`)}
      >
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
