import { Crumbs } from 'components';
import React, { useEffect, useState } from 'react';
import { Box, Text } from 'uikit';
import { Switch, Route, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import useMenuNav from 'hooks/useMenuNav';
import useParsedQueryString from 'hooks/useParsedQueryString';

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
  const { replace } = useHistory()
  const { isMobile } = useMenuNav();

  const parseQs = useParsedQueryString();
  const [tribeId, setTribeId] = useState(null)

  useEffect(() => {
    if (parseQs.i) {
      setTribeId(Number(parseQs.i))
    } else if (tribeId) {
      console.log(111)
      replace({ ...location, search: location.search ? `${location}&i=${tribeId}` : `?i=${tribeId}` })
    }
  }, [parseQs.i, tribeId, location])

  return (
    <Box>
      {!isMobile && (location.pathname !== path ? <Crumbs title={'部落名字'} /> : null)}
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
  );
};

export default MeTribe;
