import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Api } from 'apis';
import { useStore } from 'store';
import { Box, Flex } from 'uikit';
import config from 'config/constants/navConfig';
import { useTranslation } from 'contexts/Localization';
import { Icon } from 'components';
import NavItem from './NavItem';
import NavGoback from './NavGoback';
import { useReadMsg } from './hooks';

export interface NavProps {
  // seconds?: number
}
export interface MenuNavLink {
  path: string;
  icon: React.ReactElement;
  lable: string;
  showBadge?: boolean;
  badge?: number;
}

const NavStyled = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
`;

const NavShowBox = styled(Box)<{ translateX?: string }>`
  position: absolute;
  width: 100%;
  transition: transform 0.3s;
  transform: ${({ translateX }) => `translateX(${translateX})`};
`;

const Nav: React.FC<NavProps> = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [displayChildren, setDisplayChildren] = useState([]);
  const dispatch = useDispatch();
  const unReadMsg = useSelector((state: any) => state.loginReducer.unReadMsg);
  const notification = useSelector(
    (state: any) => state.appReducer.systemCustom.notification,
  );

  const currentUid = useStore(p => p.loginReducer.userInfo);

  const renderConfig = useMemo(() => {
    return config.map(item => {
      if (item.children) {
        return {
          ...item,
          children: item.children.map(subItem => {
            if (subItem.customName === 'me') {
              return {
                ...subItem,
                path: `${subItem.path}/profile/${currentUid.uid}`,
              };
            }
            return { ...subItem };
          }),
        };
      }
      if (item.customName === 'me') {
        return {
          ...item,
          path: `${item.path}/profile/${currentUid.uid}`,
        };
      }
      return { ...item };
    });
  }, [currentUid?.uid]);

  const menu = renderConfig.filter(row => row.lable);

  useReadMsg(pathname);

  const activeChildren = useMemo(() => {
    const activeConfig = renderConfig.find(item =>
      item?.children?.some(subItem => subItem.path === pathname),
    );
    if (activeConfig) return activeConfig.children;
    return null;
  }, [pathname, renderConfig]);

  useEffect(() => {
    if (activeChildren) {
      setDisplayChildren(activeChildren);
    }
  }, [activeChildren]);

  return (
    <NavStyled mt='16px'>
      <NavShowBox translateX={activeChildren ? '-100%' : '0'}>
        {menu.map(item => {
          return (
            <NavItem
              key={item.path}
              icon={item.icon}
              activeIcon={item.activeIcon}
              coming={item.coming}
              lable={item.lable}
              hide={item.hide}
              path={item.path}
              // hide={item.hide}
              pathname={pathname}
              childrenLen={item.children?.length ?? 0}
              badge={
                item.badgeName && notification && unReadMsg[item.badgeName]
                  ? unReadMsg[item.badgeName]
                  : null
              }
            />
          );
        })}
      </NavShowBox>
      <NavShowBox translateX={activeChildren ? '0' : '100%'}>
        {displayChildren && (
          <Box>
            <NavGoback />
            {displayChildren.map(item => {
              return (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  activeIcon={item.activeIcon || item.icon}
                  coming={item.coming}
                  lable={item.lable}
                  hide={item.hide}
                  childrenLen={item.children?.length ?? 0}
                  markPath={item.markPath}
                  badge={
                    item.badgeName && notification && unReadMsg[item.badgeName]
                      ? unReadMsg[item.badgeName]
                      : null
                  }
                  path={item.path}
                  pathname={pathname}
                />
              );
            })}
          </Box>
        )}
      </NavShowBox>
    </NavStyled>
  );
};
export default Nav;
