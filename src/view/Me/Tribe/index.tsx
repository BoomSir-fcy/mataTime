import { Crumbs } from 'components';
import React from 'react';
import { Box, Text } from 'uikit';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
const FeeSetting = React.lazy(() => import('./FeeSetting'));
const Info = React.lazy(() => import('./Info'));
const MyTribe = React.lazy(() => import('./MyTribe'));
const TopicsSetting = React.lazy(() => import('./TopicsSetting'));
const TribalDocs = React.lazy(() => import('./TribalDocs'));
const MasterNFT = React.lazy(() => import('./MasterNFT'));
const InvitationSetting = React.lazy(() => import('./InvitationSetting'));
const MemberManagement = React.lazy(() => import('./MemberManagement'));

const MeTribe = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <Box>
      <Crumbs title={pathname === path ? '我的部落' : '部落名字'} />
      <Switch>
        <Route path={path} exact component={MyTribe} />
        <Route path={`${path}/info`} component={Info} />
        <Route path={`${path}/fee-setting`} component={FeeSetting} />
        <Route path={`${path}/topics-setting`} component={TopicsSetting} />
        <Route path={`${path}/tribal-docs`} component={TribalDocs} />
        <Route path={`${path}/master-nft`} component={MasterNFT} />
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
  );
};

export default MeTribe;