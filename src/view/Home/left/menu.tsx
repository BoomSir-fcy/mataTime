import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex, Box, Card } from 'uikit';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProfileMenu, Icon, Logo, Badge } from 'components';

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

const LogoWrapper = styled.div`
  width: 175px;
  height: 32px;
`;

const ItemLink = styled(Link)`
  margin-top: 20px;
  display: flex;
  width: 120px;
  height: 40px;
  border-radius: 18px;
  font-size: 18px;
  /* font-weight: bold; */
  color: ${({ theme }) => (theme.isDark ? '#eaeaea' : '#000000')};
  line-height: 40px;
`;

const User = styled(Flex)`
  display: block;
  margin-top: auto;
  flex: 1;
  flex-grow: inherit;
`;

export const MenuList = (props: { menuList: any[] }) => {
  const isDark = useSelector((state: any) => state.appReducer.systemCustom.isDark);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { menuList } = props;
  const itemClick = index => {
    setCurrentIndex(index);
  };
  return (
    <>
      {menuList.map((item, index) => {
        return (
          <ItemLink
            onClick={itemClick.bind(this, index)}
            to={item.path}
            key={index}
            style={{
              backgroundColor: currentIndex === index ? (isDark ? '#232A3D' : '#EAF2FF') : '',
              fontWeight: currentIndex === index ? 'bold' : 'normal'
            }}
          >
            <div style={{ position: 'relative' }} title={item.title}>
              {item.badge && <Badge count={0} />}
              <Icon name={currentIndex === index ? item.activeIcon : item.icon} margin="10px 14px" color={isDark ? '#ffffff' : '#7A83A0'}></Icon>
            </div>
            <span style={{ marginLeft: '5px' }}>{item.title}</span>
          </ItemLink>
        );
      })}
    </>
  );
};

export const Menu: React.FC = () => {
  const isDark = useSelector((state: any) => state.appReducer.systemCustom.isDark);
  return (
    <MenuBox>
      <Box>
        <LogoWrapper>
          <Logo url="/" src={require(isDark ? 'assets/images/logo.svg' : 'assets/images/light_logo.svg').default} />
        </LogoWrapper>
        <MenuList menuList={menuData}></MenuList>
      </Box>
      <User as={Link} to="/me">
        <ProfileMenu />
      </User>
    </MenuBox>
  );
};