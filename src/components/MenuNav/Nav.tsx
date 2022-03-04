import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Api } from 'apis';
import { useStore } from 'store';
import { Box, Flex, Text } from 'uikit';
import config, { ConfigId } from 'config/constants/navConfig';
import { useTranslation } from 'contexts/Localization';
import { Icon } from 'components';
import NavItem from './NavItem';
import NavGoback from './NavGoback';
import { useReadMsg } from './hooks';
import { useTribeInfoById } from 'store/mapModule/hooks';
import useParsedQueryString from 'hooks/useParsedQueryString';

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
  const [displaySubChildren, setDisplaySubChildren] = useState([]);
  const unReadMsg = useSelector((state: any) => state.loginReducer.unReadMsg);
  const notification = useSelector(
    (state: any) => state.appReducer.systemCustom.notification,
  );

  const currentUid = useStore(p => p.loginReducer.userInfo);
  const initMemberNFT = useStore(p => p.tribe.tribesNftInfo.initMemberNFT);

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
            if (subItem.customName === 'backMe') {
              return {
                ...subItem,
                backPath: `${subItem.backPath}/profile/${currentUid.uid}`,
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
      if (item.customName === 'backMe') {
        return {
          ...item,
          backPath: `${item.backPath}/profile/${currentUid.uid}`,
        };
      }
      return { ...item };
    });
  }, [currentUid?.uid]);

  const menu = renderConfig.filter(row => row.lable); // 第一节导航栏

  // 阅读信息微标
  useReadMsg(pathname);
  const parseQs = useParsedQueryString();

  const tribeInfo = useTribeInfoById(parseQs.i);

  // 第二级导航栏
  const activeChildren = useMemo(() => {
    const activeConfig = renderConfig.find(item =>
      item?.children?.some(subItem => subItem.path === pathname),
    );
    if (activeConfig) return activeConfig.children;

    const activeChildrenConfig = renderConfig.find(item =>
      item?.children?.some(subItem => {
        return subItem?.children?.some(
          subChildrenItem => subChildrenItem.path === pathname,
        );
      }),
    );
    if (activeChildrenConfig) return activeChildrenConfig.children;
    return null;
  }, [pathname, renderConfig]);

  // 第三级导航栏配置
  const activeSubConfig = useMemo(() => {
    if (activeChildren) {
      return activeChildren.find(item =>
        item?.children?.some(subItem => subItem.path === pathname),
      );
    }
    return null;
  }, [pathname, activeChildren]);

  // 第三级导航栏
  const activeSubChildren = useMemo(() => {
    console.log(activeSubConfig, 'activeSubConfig');
    // 如果是部落管理 做权限管理
    if (activeSubConfig?.configId === ConfigId.TRIBE_ME) {
      return activeSubConfig.children;
    }
    if (activeSubConfig?.children) {
      return activeSubConfig.children;
    }
    return null;
  }, [activeSubConfig]);

  useEffect(() => {
    if (activeChildren) {
      setDisplayChildren(activeChildren); // 显示第二级导航栏
    }
  }, [activeChildren]);

  useEffect(() => {
    if (activeSubChildren) {
      setDisplaySubChildren(activeSubChildren); // 显示第三级导航栏
    }
  }, [activeSubChildren]);

  // 当前导航栏层级 0是第一级 2是第三级
  const index = useMemo(() => {
    if (activeSubChildren) return 2;
    if (activeChildren) return 1;
    return 0;
  }, [activeSubChildren, activeChildren]);

  return (
    <NavStyled mt='16px'>
      {/* 第一级导航栏 */}
      <NavShowBox translateX={`${index * -100}%`}>
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
              badgeIcon={
                item.badgeIconName && !initMemberNFT ? item.badgeIconName : null
              }
            />
          );
        })}
      </NavShowBox>
      {/* 第二级导航栏 */}
      <NavShowBox translateX={`${(index - 1) * -100}%`}>
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
                  badgeIcon={
                    item.badgeIconName && !initMemberNFT
                      ? item.badgeIconName
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
      {/* 第三级导航栏 */}
      <NavShowBox translateX={`${(index - 2) * -100}%`}>
        {displaySubChildren && (
          <Box>
            <NavGoback
              path={activeSubConfig?.backPath || activeSubConfig?.path}
            />
            {displaySubChildren.map(item => {
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
                  badgeIcon={
                    item.badgeIconName && !initMemberNFT
                      ? item.badgeIconName
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
