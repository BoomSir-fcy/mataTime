import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Text, Radio, Input } from 'uikit';
import { Logo, Icon, Avatar } from 'components';

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
  margin: 10px auto 20px auto;
`
const BackWarpper = styled(Box)`
  display: flex;
  align-items: center;
  margin: 20px;
  cursor: pointer;
  i{
    font-size: 23px !important;
    font-weight: bold;
  }
  span{
    font-size: 18px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: #FFFFFF;
    margin-left: 10px;
  }
`

const MenuBody = styled(Box)`
  padding-bottom: 300px;
`

const MenuItems = styled(Box)`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  margin-bottom: 20px;
  &.active {
    width: 140px;
    padding: 5px 15px;
    border-radius: 18px;
    background-color: #232A3D;
  }
`
const MenuIcon = styled(Box)`
  margin-right: 20px;
  position: relative;
  span{
    position: absolute;
    width: 21px;
    height: 13px;
    background: #EC612B;
    border-radius: 5px;
    font-size: 11px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -10px;
    top: -5px;
  }
`
const MenuText = styled(Text)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSubtle};
`

const UserTitle = styled.div`
  margin:0 12px;
  font-weight:700;
  font-size:18px;
  color:#fff;
  ::after{
    position:relative;
    right:-50px;
    content: "";
    display:inline-block;
    width:0px;
    height:0px;
    border-bottom: 7px solid transparent;
    border-left: 7px solid #fff;
    border-right: 7px solid transparent;
    border-top: 7px solid transparent;
}
`
const UserDesc = styled.div`
  margin:0 12px;
  font-size: 16px;
  font-weight: 400;
  color: #B5B5B5;
`

type IProps = {
  menu: MenuProps[];
  route: any;
}

export const CommonLeftMenu = React.memo((props: IProps) => {
  const { pathname } = props.route
  return (
    <MenuWarpper>
      <LogoWarpper>
        <Logo url="/" src={require('assets/images/logo.svg').default} />
      </LogoWarpper>
      <BackWarpper>
        <Icon name={'icon-fanhui'}></Icon>
        <span>返回</span>
      </BackWarpper>
      <MenuBody>
        {
          props.menu.map((item: any) => {
            return (
              <MenuItems className={item.link === pathname ? 'active' : ''} as={Link} to={item.link}>
                <MenuIcon>
                  <Icon name={item.icon}></Icon>
                  <span>0</span>
                </MenuIcon>
                <MenuText>{item.name}</MenuText>
              </MenuItems>
            )
          })
        }
      </MenuBody>
      <Flex>
        <Avatar src="" scale="sm" />
        <Box>
          <UserTitle>
            OliNe
          </UserTitle>
          <UserDesc>@0x3...d39</UserDesc>
        </Box>
      </Flex>
    </MenuWarpper>
  )
})