import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Icon, Badge } from 'components';

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
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const location = useLocation();

  const itemClick = index => {
    setCurrentIndex(index);
  };

  return (
    <React.Fragment>
      {menuList.map((item, index) => {
        return (
          <ItemLink to={item.path} key={index} style={{ backgroundColor: location.pathname === item.path ? '#232A3D' : '' }} onClick={() => itemClick(index)}>
            <div style={{ position: 'relative' }}>
              {item.badge && <Badge count={0} />}
              <Icon name={item.icon} margin="10px 14px"></Icon>
            </div>
            <span style={{ marginLeft: '5px' }}>{item.title}</span>
          </ItemLink>
        );
      })}
    </React.Fragment>
  );
};
