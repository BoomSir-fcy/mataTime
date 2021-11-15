import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Icon, Badge } from 'components';
import { useStore } from 'store';

const ItemLink = styled(Link)`
  margin-top: 20px;
  display: flex;
  width: 144px;
  height: 40px;
  border-radius: 18px;
  font-size: 18px;
  font-weight: bold;
  color: #eaeaea;
  line-height: 40px;
`;

export const SubMenu = (props: { menuList: any[] }) => {
  const { menuList } = props;
  const isDark = useStore(p => p.appReducer.systemCustom.isDark);
  const location = useLocation();

  return (
    <React.Fragment>
      {menuList.map((item, index) => {
        return (
          <ItemLink
            to={item.path}
            key={index}
            style={{
              backgroundColor: location.pathname === item.path ? (isDark ? '#232A3D' : '#EAF2FF') : '',
              fontWeight: location.pathname === item.path ? 'bold' : 'normal'
            }}
          >
            <div style={{ position: 'relative' }} title={item.title}>
              {item.badge && <Badge count={0} />}
              <Icon name={location.pathname === item.path ? item.activeIcon : item.icon} margin="10px 14px" color={isDark ? '#ffffff' : '#7A83A0'}></Icon>
            </div>
            <span style={{ marginLeft: '5px' }}>{item.title}</span>
          </ItemLink>
        );
      })}
    </React.Fragment>
  );
};
