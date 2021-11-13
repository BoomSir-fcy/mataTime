import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Button } from 'uikit';
import { Avatar, Icon, Logo, SubMenu } from 'components';

import menuData from './menuData';

const MenuBox = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 13px;
  width: 200px;
  height: calc(100vh - 150px);
  background: #191f2d;
  border-radius: 10px;
`;
const LogoWarpper = styled(Box)`
  width: 175px;
  height: 32px;
`;
const Btn = styled.div`
  width: 100%;
  margin-top: 94px;
  text-align: center;
`;

const UserTitle = styled.div`
  margin: 0 12px;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  ::after {
    position: relative;
    right: -50px;
    content: '';
    display: inline-block;
    width: 0px;
    height: 0px;
    border-bottom: 7px solid transparent;
    border-left: 7px solid #fff;
    border-right: 7px solid transparent;
    border-top: 7px solid transparent;
  }
`;
const UserDesc = styled.div`
  margin: 0 12px;
  font-size: 16px;
  font-weight: 400;
  color: #b5b5b5;
`;
const BackWarpper = styled(Box)`
  display: flex;
  align-items: center;
  margin: 30px 0 30px 15px;
  cursor: pointer;
  i {
    font-size: 23px !important;
    font-weight: bold;
  }
  span {
    font-size: 18px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: #ffffff;
    margin-left: 10px;
  }
`;

export const Menu: React.FC<any> = props => {
  const { history } = props;

  const goback = () => {
    history.goBack();
  };

  return (
    <MenuBox>
      <Box>
        <LogoWarpper>
          <Logo url="/" src={`${require('assets/images/logo/nav-logo.png').default}`} />
        </LogoWarpper>
        <BackWarpper onClick={goback}>
          <Icon name={'icon-fanhui'} />
          <span>返回</span>
        </BackWarpper>
        <SubMenu menuList={menuData} />
        <Btn>
          <Button scale="ld">断开钱包</Button>
        </Btn>
      </Box>
      <Flex>
        <Avatar src="" scale="sm" />
        <Box>
          <UserTitle>OliNe</UserTitle>
          <UserDesc>@0x3...d39</UserDesc>
        </Box>
      </Flex>
    </MenuBox>
  );
};
