import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Container } from './container';

const Account = React.lazy(() => import('./account'));
const Profile = React.lazy(() => import('./profile'));
const Edit = React.lazy(() => import('../Edit'));
const Follow = React.lazy(() => import('./follow'));
const Fans = React.lazy(() => import('./fans'));
const Praise = React.lazy(() => import('./praise'));
const Shield = React.lazy(() => import('./shield'));
const Collect = React.lazy(() => import('./collect'));
const Invite = React.lazy(() => import('view/Task/components/Invite'));

const Me = props => {
  return (
    <Switch>
      <Route
        path={`${props.match.path}`}
        render={() => (
          <Container {...props}>
            <Route path={`${props.match.path}`} exact component={Profile} />
            <Route path={`${props.match.path}/account`} component={Account} />
            <Route
              path={`${props.match.path}/profile/:uid`}
              exact
              component={Profile}
            />

            <Route
              path={`${props.match.path}/user/follow`}
              exact
              component={Follow}
            />
            <Route
              path={`${props.match.path}/user/fans`}
              exact
              component={Fans}
            />
            <Route path={`${props.match.path}/edit`} component={Edit} />
            <Route path={`${props.match.path}/follow`} component={Follow} />
            <Route path={`${props.match.path}/fans`} component={Fans} />
            <Route path={`${props.match.path}/praise`} component={Praise} />
            <Route path={`${props.match.path}/collect`} component={Collect} />
            <Route path={`${props.match.path}/invite`} component={Invite} />
            <Route path={`${props.match.path}/shield`} component={Shield} />
          </Container>
        )}
      />
    </Switch>
  );
};

export default withRouter(Me);
