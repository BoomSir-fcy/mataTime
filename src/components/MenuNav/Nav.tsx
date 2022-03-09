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
import { NftStatus, TribeType } from 'store/tribe/type';

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

  /* 
    部落配置:
    1.判断是否是部落主
      TribeInfo.tribe.owner_address === account
      跳转404
    2.有没有领取部落主NFT
      TribeInfo.status === 1
      除了[部落主NFT] 其他都不能点
    3.有没有质押部落主NFT
      TribeInfo.status === 2
      除了[部落主NFT] 其他都不能点
    4.有没有设置成员NFT
      TribeInfo.tribe.type === TribeType.PRO
      [成员nft]加感叹号
    5.获取部落类型判断显示[邀请设置]
      禁用[邀请设置]
  */
  enum TribeMeStatus {
    NORMAL,
    NOT_MASTER,
    UN_RECEIVE,
    UN_STAKE,
    UN_SET_MEMBER_NFT,
    BASE_TYPE,
  }

  const tribeMeStatus = useMemo(() => {
    if (
      tribeInfo?.tribe?.owner_address?.toLowerCase() !==
      currentUid?.address?.toLowerCase()
    ) {
      return TribeMeStatus.NOT_MASTER;
    }
    if (
      tribeInfo?.status === NftStatus.UnReceive ||
      tribeInfo?.status === NftStatus.INIT
    ) {
      return TribeMeStatus.UN_RECEIVE;
    }
    if (tribeInfo?.status === NftStatus.UnStake) {
      return TribeMeStatus.UN_STAKE;
    }
    if (!tribeInfo?.tribe?.member_nft_id) {
      return TribeMeStatus.UN_SET_MEMBER_NFT;
    }
    if (tribeInfo?.tribe?.type === TribeType.BASIC) {
      return TribeMeStatus.BASE_TYPE;
    }
    return TribeMeStatus.NORMAL;
  }, [tribeInfo, currentUid]);

  const activeSubChildren = useMemo(() => {
    // 如果是部落管理 做权限管理
    if (activeSubConfig?.configId === ConfigId.TRIBE_ME) {
      if (tribeMeStatus === TribeMeStatus.NOT_MASTER) {
        return [];
      }
      if (
        tribeMeStatus === TribeMeStatus.UN_RECEIVE ||
        tribeMeStatus === TribeMeStatus.UN_STAKE
      ) {
        return activeSubConfig.children.map(item => {
          return {
            ...item,
            disabled: item.configId !== ConfigId.TRIBE_ME_MASTER_NFT,
          };
        });
      }
      if (tribeMeStatus === TribeMeStatus.UN_SET_MEMBER_NFT) {
        return activeSubConfig.children.map(item => {
          return {
            ...item,
            badgeIcon:
              item.configId === ConfigId.TRIBE_ME_MEMBER_NFT
                ? item.badgeIconName
                : null,
          };
        });
      }
      if (tribeMeStatus !== TribeMeStatus.BASE_TYPE) {
        return activeSubConfig.children.map(item => {
          return {
            ...item,
            hide: false,
          };
        });
      }
      return activeSubConfig.children;
    }
    if (activeSubConfig?.children) {
      return activeSubConfig.children;
    }
    return null;
  }, [activeSubConfig, tribeMeStatus]);

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
              disabled={item.disabled}
              badgeIcon={item.badgeIcon}
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
                  badgeIcon={item.badgeIcon}
                  path={item.path}
                  disabled={item.disabled}
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
                  badgeIcon={item.badgeIcon}
                  disabled={item.disabled}
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
