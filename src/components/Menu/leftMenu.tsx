import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Text, Radio, Input } from 'uikit';
import { Logo, Info } from 'components';

import { mediaQueriesSize } from "uikit/theme/base";

const MenuWarpper = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.paddingsm}
`
const LogoWarpper = styled(Box)`
  width: 175px;
  height: 32px;
  margin: 0 auto;
`

const MenuBody = styled(Box)`
  padding-bottom: 100px;
`

const MenuItems = styled(Box)`
  display: block;
  ${mediaQueriesSize.margint}
  &.active {
    max-width: 120px;
    padding: 10px 15px;
    border-radius: 18px;
    background-color: #232A3D;
  }
`
const MenuText = styled(Text)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const LeftMenu = React.memo(() => {
  return (
    <MenuWarpper>
      <LogoWarpper>
        <Logo url="/" src={require('assets/images/logo.svg').default} />
      </LogoWarpper>
      <MenuBody>
        <MenuItems className="active" as={Link} to="/">
          <MenuText>首页</MenuText>
        </MenuItems>
        <MenuItems>
          <MenuText>星球</MenuText>
        </MenuItems>
        <MenuItems>
          <MenuText>消息</MenuText>
        </MenuItems>
      </MenuBody>
      <Info />
    </MenuWarpper>
  )
})