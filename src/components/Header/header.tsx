import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'uikit';
import { Logo } from './logo';
import { Search } from './search';
import { Menu } from './menu';

import { mediaQueries } from "uikit/theme/base";

const BoxStyled = styled(Box)`
  width: 100%;
  height: 90px;
  background: linear-gradient(90deg, #5B3CE0, #5A7EFA);
  ${mediaQueries.xxl} {
    padding-left: 160px;
    padding-right: 160px;
  }
`

export const Header = React.memo((props) => {
  return (
    <BoxStyled>
      <Flex alignItems="center" justifyContent="space-between" height="100%">
        <Flex justifyContent="space-between" alignItems="center"> 
          <Logo src={require('./images/logo.svg').default} url="/" />
          <Search />
        </Flex>
        <Menu />
        {props.children}
      </Flex>
    </BoxStyled>
  )
})