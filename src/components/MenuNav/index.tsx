import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Overlay, useMatchBreakpoints } from 'uikit';
import useMenuNav from 'hooks/useMenuNav';
import { useTranslation } from 'contexts/Localization';
import Logo from './Logo';
import Nav from './Nav';
import NavFooter from './NavFooter';
import { Panel } from './styled'
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";

const MenuContener = styled(Flex) <{ isMobile: boolean }>`
  height: 100vh;
  width: ${({ isMobile }) => (isMobile ? '0' : `${SIDEBAR_WIDTH_FULL}px`)};
  /* background: pink; */
  width: 214px;
  background:  ${({ theme }) => theme.colors.primaryDark};
  /* border: 1px red solid; */
  position: ${({ isMobile }) => (isMobile ? 'fixed' : 'sticky')};
  top: 0;
  left: 0;
  flex-shrink: 0;
  /* margin-top: 22px; */
  flex-direction: column;
  z-index: 10;
`;

export interface MenuNavProps {
  // seconds?: number
}

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const MenuNav: React.FC<MenuNavProps> = ({ }) => {
  const { t } = useTranslation();
  const { isPushed, setIsPushed, isMobile } = useMenuNav()

  return (
    <MenuContener isMobile={isMobile}>
      <Panel isMobile={isMobile} isPushed={isPushed} showMenu>
        <Flex flex="1" flexDirection="column">
          <Logo />
          <Nav />
        </Flex>
        <NavFooter />
      </Panel>
      <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
    </MenuContener>
  );
};

export default MenuNav;
