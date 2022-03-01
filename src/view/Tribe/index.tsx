import React from 'react';
import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom';
import { Box, Text } from 'uikit';

const Create = React.lazy(() => import('./Create'));
const Detail = React.lazy(() => import('./Detail'));
const Home = React.lazy(() => import('./Home'));
const Manage = React.lazy(() => import('./Manage'));
const Post = React.lazy(() => import('./Post'));
const PostDetail = React.lazy(() => import('./PostDetail'));

const Tribe = () => {
  const { pathname } = useLocation();
  const { path } = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={`${path}`} exact component={Home} />
        <Route path={`${path}/create`} component={Create} />
        <Route path={`${path}/detail`} component={Detail} />
        <Route path={`${path}/manage`} component={Manage} />
        <Route path={`${path}/post`} component={Post} />
        <Route path={`${path}/postdetail`} component={PostDetail} />
      </Switch>
    </Box>
  );
};

export default Tribe;