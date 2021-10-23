import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Button, Text, Radio, Input } from 'uikit';
import { Logo } from 'components';

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

`

const MenuItems = styled(Box)`


`
const MenuText = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const LeftMenu = React.memo(() => {
  return (
    <MenuWarpper>
      <LogoWarpper>
        <Logo url="/" src={require('assets/images/logo.svg').default} />
      </LogoWarpper>
      <MenuBody>
        <MenuItems>
          <MenuText>首页</MenuText>
        </MenuItems>
        <MenuItems>
          <MenuText>星球</MenuText>
        </MenuItems>
        <MenuItems>
          <MenuText>消息</MenuText>
        </MenuItems>
      </MenuBody>
    </MenuWarpper>
  )
})