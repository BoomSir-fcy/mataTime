import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import Logo from './Logo';
import Nav from './Nav';
import NavFooter from './NavFooter';

const MenuContener = styled(Flex)`
  height: 100vh;
  width: 214px;
  /* background: pink; */
  /* border: 1px red solid; */
  position: sticky;
  top: 0;
  flex-shrink: 0;
`;

export interface MenuNavProps {
  // seconds?: number
}

const MenuNav: React.FC<MenuNavProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <MenuContener pt="22px" flexDirection="column">
      <Flex flex="1" flexDirection="column">
        <Logo />
        <Nav />
      </Flex>
      <NavFooter />
    </MenuContener>
  );
};

export default MenuNav;
