import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Flex, Card, Box, Button } from 'uikit';
import { Icon, Logo, SubMenu, ProfileMenu } from 'components';

import menuData from './menuData';

const MenuBox = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 13px;
  width: 200px;
  height: calc(100vh - 150px);
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

const User = styled(Flex)`
  display: block;
  margin-top: auto;
  flex: 1;
  flex-grow: inherit;
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
        {/* <Btn>
          <Button scale="ld">断开钱包</Button>
        </Btn> */}
      </Box>
      <User as={Link} to="/me">
        <ProfileMenu />
      </User>
    </MenuBox>
  );
};
