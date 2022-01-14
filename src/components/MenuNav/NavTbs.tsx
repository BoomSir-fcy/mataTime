import React from 'react';
import styled, { useTheme } from 'styled-components';
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
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.colors.tabsShadows};
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
      background: theme.colors.tabsCurrentBackground,
    }}
`;

export const Navigation = React.memo(() => {
  const history = useHistory();
  const location = useLocation();
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const notification = useStore(p => p.appReducer.systemCustom.notification);
  const unReadMsg = useStore(p => p.loginReducer.unReadMsg);
  const tabsColor = useTheme().colors.tabsAction;

  const goRoute = (route: string) => {
    history.push(route);
  };

  if (location.pathname === '/login') {
    return <></>;
  }

  // todo 后面优化
  const top = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <NavigationContainer>
      {tbasNavConfig.map((row, index) => (
        <TabButton
          key={index}
          variant='text'
          active={location.pathname === row.path}
          onClick={() =>
            location.pathname === row.path ? top() : goRoute(row.path)
          }
        >
          <Icon name={row.icon} color={tabsColor} size={25} />
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
