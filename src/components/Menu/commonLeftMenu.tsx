import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Text, Radio, Input } from 'uikit';
import { Logo, Info } from 'components';

import { mediaQueriesSize } from "uikit/theme/base";

import { MenuProps } from 'components/Layout/CommonLayout/menuData';

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
  h2{
    font-size: 18px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
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

type IProps = {
  logo: any;
  menu: MenuProps [];
}

export const CommonLeftMenu = React.memo((props: IProps) => {
  return (
    <MenuWarpper>
      <LogoWarpper>
        {props.logo}
      </LogoWarpper>
      <MenuBody>
        {
          props.menu.map((item: any) => {
            return (
              <MenuItems as={Link} to={item.link}>
                <MenuText>{item.name}</MenuText>
              </MenuItems>
            )
          })
        }
        <MenuItems className="active" as={Link} to="/">
          <MenuText>首页</MenuText>
        </MenuItems>
        <MenuItems as={Link} to="/me/account">
          <MenuText>星球</MenuText>
        </MenuItems>
        <MenuItems>
          <MenuText>消息</MenuText>
        </MenuItems>
      </MenuBody>
    </MenuWarpper>
  )
})