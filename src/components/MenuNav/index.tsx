import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Overlay, useMatchBreakpoints } from 'uikit';
import useMenuNav from 'hooks/useMenuNav';
import { Link } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import Logo from './Logo';
import Nav from './Nav';
import NavFooter from './NavFooter';
import { Panel } from './styled';
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from './config';
import { ProfileMenu } from './ProfileMenu';
import { useStore } from 'store';

const MenuContener = styled(Flex)<{ isMobile: boolean; PickNft: boolean }>`
  height: 100vh;
  width: ${({ isMobile }) => (isMobile ? '0' : `${SIDEBAR_WIDTH_FULL}px`)};
  /* border: 1px red solid; */
  position: ${({ isMobile }) => (isMobile ? 'fixed' : 'sticky')};
  top: 0;
  left: 0;
  flex-shrink: 0;
  /* margin-top: 22px; */
  flex-direction: column;
  z-index: ${({ PickNft }) => (PickNft ? 1010 : 10)};
`;

const UserBox = styled(Flex)`
  background: ${({ theme }) => theme.colors.backgroundThemeCard};
  border-radius: 10px;
  height: 70px;
  align-items: center;
  margin-top: 12px;
  /* margin-right: 8px; */
`;

export interface MenuNavProps {
  PickNft?: boolean;
}

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const MenuNav: React.FC<MenuNavProps> = ({ PickNft, children }) => {
  const { t } = useTranslation();
  const { isPushed, setIsPushed, isMobile } = useMenuNav();
  const currentUid = useStore(p => p.loginReducer.userInfo);

  return (
    <MenuContener PickNft={PickNft} isMobile={isMobile}>
      <Panel padding={PickNft} isMobile={isMobile} isPushed={isPushed} showMenu>
        {/* <Flex flex='1' flexDirection='column'>
          <Logo />
          <UserBox as={Link} to={`/me/profile/${currentUid.uid}`}>
            <ProfileMenu />
          </UserBox>
          <Nav />
        </Flex>
        <NavFooter /> */}
        {PickNft ? (
          children
        ) : (
          <>
            <Flex flex='1' flexDirection='column'>
              <Logo />
              <UserBox as={Link} to={`/me/profile/${currentUid.uid}`}>
                <ProfileMenu />
              </UserBox>
              <Nav />
            </Flex>
            <NavFooter />
          </>
        )}
      </Panel>
      <MobileOnlyOverlay
        show={isPushed}
        onClick={() => setIsPushed(false)}
        role='presentation'
      />
    </MenuContener>
  );
};

export default MenuNav;
