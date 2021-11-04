import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { Link, withRouter, useLocation } from 'react-router-dom';
import menuData from './menuData';
import { Avatar, Icon } from 'components';

const MenuBox = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 13px;
  width: 200px;
  height: calc(100vh - 150px);
  background: #191f2d;
  border-radius: 10px;
`;
const Logo = styled.h2`
  width: 175px;
  height: 32px;
  background: url('${require('assets/images/logo/nav-logo.png').default}') center/cover;
`;
const ItemLink = styled(Link)`
  margin-top: 20px;
  display: flex;
  width: 130px;
  height: 40px;
  border-radius: 18px;
  font-size: 18px;
  font-weight: bold;
  color: #eaeaea;
  line-height: 40px;
`;
const Badge = (props: { count: number | string }) => {
  let { count } = props;
  if (count > 99) {
    count = '+99';
  }
  return (
    <span
      style={{
        position: 'absolute',
        top: '-5px',
        right: '-20px',
        // width:'25px',
        padding: '0 6px',
        height: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#EC612B',
        borderRadius: '5px',
        fontWeight: 400,
        fontSize: '12px'
      }}
    >
      {count}
    </span>
  );
};
export const MenuList = (props: { menuList: any[] }) => {
  let location = useLocation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const { menuList } = props;
  const itemClick = index => {
    setCurrentIndex(index);
  };
  return (
    <>
      {menuList.map((item, index) => {
        return (
          <ItemLink onClick={itemClick.bind(this, index)} to={item.path} key={index} style={{ backgroundColor: location.pathname === item.path ? '#232A3D' : '' }}>
            <div style={{ position: 'relative' }} title={item.title}>
              {item.badge ? <Badge count={0}></Badge> : ''}
              <Icon name={currentIndex === index ? item.activeIcon : item.icon} margin="10px 14px"></Icon>
            </div>
            <span style={{ marginLeft: '5px' }}>{item.title}</span>
          </ItemLink>
        );
      })}
    </>
  );
};
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
  margin: 20px;
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

export const Menu: React.FC = props => {
  const Back = () => {
    console.log('window.history', window.history.replaceState);
    console.log('props', props);
    window.history.go(-1);
  };
  return (
    <MenuBox>
      <Box>
        <Logo />
        <a href="/">
          <BackWarpper onClick={Back}>
            <Icon name={'icon-fanhui'}></Icon>
            <span>返回</span>
          </BackWarpper>
        </a>
        <MenuList menuList={menuData}></MenuList>
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
