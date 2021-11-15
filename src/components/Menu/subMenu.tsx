import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Link, useLocation, History } from 'react-router-dom';
import { Flex, Card, Box, Button } from 'uikit';
import { Icon, Badge, Logo, ProfileMenu } from 'components';
import { useStore } from 'store';

const MenuBox = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 13px;
  width: 200px;
  height: calc(100vh - 150px);
  border-radius: 10px;
`;

const LogoWrapper = styled(Box)`
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
    font-weight: bold;
    color: ${({ theme }) => theme.colors.backgroundMenuBack};
    margin-left: 10px;
  }
`;

const User = styled(Flex)`
  display: block;
  margin-top: auto;
  flex: 1;
  flex-grow: inherit;
`;

const ItemLink = styled(Link)`
  margin-top: 20px;
  display: flex;
  width: 144px;
  height: 40px;
  border-radius: 18px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white_black};
  line-height: 40px;
  &.active {
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.backgroundMenu};
  }
`;

export const SubMenu = (props: { menuList: any[] }) => {
  const { menuList } = props;
  const location = useLocation();
  const iconColor = useTheme().colors.backgroundMenuIcon;

  return (
    <React.Fragment>
      {menuList.map((item, index) => {
        return (
          <ItemLink to={item.path} key={index} className={`${location.pathname === item.path && 'active'}`}>
            <div style={{ position: 'relative' }} title={item.title}>
              {item.badge && <Badge count={0} />}
              <Icon name={location.pathname === item.path ? item.activeIcon : item.icon} margin="10px 14px" color={iconColor} />
            </div>
            <span style={{ marginLeft: '5px' }}>{item.title}</span>
          </ItemLink>
        );
      })}
    </React.Fragment>
  );
};

export const CommonMenu: React.FC<{
  menu: [];
  route: any;
  history: History;
}> = React.memo(props => {
  const { history, menu } = props;
  const isDark = useStore(p => p.appReducer.systemCustom.isDark);
  const iconColor = useTheme().colors.backgroundMenuBack;

  const goback = () => {
    history.goBack();
  };

  return (
    <MenuBox>
      <Box>
        <LogoWrapper>
          <Logo url="/" src={require(isDark ? 'assets/images/logo.svg' : 'assets/images/light_logo.svg').default} />
        </LogoWrapper>
        <BackWarpper onClick={goback}>
          <Icon name={'icon-fanhui'} color={iconColor} />
          <span>返回</span>
        </BackWarpper>
        <SubMenu menuList={menu} />
      </Box>
      <User as={Link} to="/me">
        <ProfileMenu />
      </User>
    </MenuBox>
  );
});
