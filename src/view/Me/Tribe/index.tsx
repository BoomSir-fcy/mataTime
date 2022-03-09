import { Crumbs } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Text } from 'uikit';
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import useMenuNav from 'hooks/useMenuNav';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useFetchTribeInfoById, useTribeInfoById } from 'store/mapModule/hooks';
import NoPermission from 'components/NoPermission';
import { useStore } from 'store';
import { NftStatus, TribeType } from 'store/tribe/type';

const FeeSetting = React.lazy(() => import('./FeeSetting'));
const Info = React.lazy(() => import('./Info'));
const MyTribe = React.lazy(() => import('./MyTribe'));
const TopicsSetting = React.lazy(() => import('./TopicsSetting'));
const TribalDocs = React.lazy(() => import('./TribalDocs'));
const MasterNFT = React.lazy(() => import('./MasterNFT'));
const MemberNFT = React.lazy(() => import('./MemberNFT'));
const InvitationSetting = React.lazy(() => import('./InvitationSetting'));
const MemberManagement = React.lazy(() => import('./MemberManagement'));

const MeTribe = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const { replace } = useHistory();
  const { isMobile } = useMenuNav();

  const parseQs = useParsedQueryString();
  const [tribeId, setTribeId] = useState(null);

  useEffect(() => {
    if (parseQs.i) {
      setTribeId(Number(parseQs.i));
    } else if (tribeId) {
      replace({
        ...location,
        search: location.search ? `${location}&i=${tribeId}` : `?i=${tribeId}`,
      });
    }
  }, [parseQs.i, tribeId, location]);

  /* 
  1 未领取 2已领取 3 取消质押 4 已质押 5已过期
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

  const { updater } = useFetchTribeInfoById(tribeId);
  // updater()

  const tribeInfo = useTribeInfoById(tribeId);

  const currentUid = useStore(p => p.loginReducer.userInfo);

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
    NORMAL = 0,
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

  const noPermission = useMemo(() => {
    if (location.pathname === path) return false;
    if (
      tribeMeStatus === TribeMeStatus.NORMAL ||
      tribeMeStatus === TribeMeStatus.UN_SET_MEMBER_NFT
    )
      return false;
    if (
      location.pathname === `${path}/master-nft` &&
      (tribeMeStatus === TribeMeStatus.UN_RECEIVE ||
        tribeMeStatus === TribeMeStatus.UN_STAKE)
    )
      return false;
    if (
      location.pathname !== `${path}/invitation-setting` &&
      tribeMeStatus === TribeMeStatus.BASE_TYPE
    )
      return false;
    return true;
  }, [tribeMeStatus, location.pathname, path]);

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setRefreshing(false);
  }, [tribeInfo]);
  return (
    <Box>
      {!isMobile &&
        (location.pathname !== path ? (
          <Crumbs title={tribeInfo?.tribe?.name} />
        ) : null)}

      {noPermission ? (
        <NoPermission
          refreshing={refreshing}
          refresh={() => {
            updater();
            setRefreshing(true);
          }}
          mt='calc(18% + 86px)'
        />
      ) : (
        <Box>
          <Switch>
            <Route path={path} exact component={MyTribe} />
            <Route path={`${path}/info`} component={Info} />
            <Route path={`${path}/fee-setting`} component={FeeSetting} />
            <Route path={`${path}/topics-setting`} component={TopicsSetting} />
            <Route path={`${path}/tribal-docs`} component={TribalDocs} />
            <Route path={`${path}/master-nft`} component={MasterNFT} />
            <Route path={`${path}/member-nft`} component={MemberNFT} />
            <Route
              path={`${path}/invitation-setting`}
              component={InvitationSetting}
            />
            <Route
              path={`${path}/member-management`}
              component={MemberManagement}
            />
          </Switch>
        </Box>
      )}
    </Box>
  );
};

export default MeTribe;
