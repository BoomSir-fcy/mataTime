import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Container } from './container';

const Account = React.lazy(() => import('./account'));
const Profile = React.lazy(() => import('./profile'));
const Edit = React.lazy(() => import('../Edit'));
const Follow = React.lazy(() => import('./follow'));
const Fans = React.lazy(() => import('./fans'));
const Praise = React.lazy(() => import('./praise'));
const Shield = React.lazy(() => import('./shield'));
const Collect = React.lazy(() => import('./collect'));

const Me = props => {
  return (
    <Router forceRefresh>
      <Switch>
        <Route
          render={() => (
            <Container {...props}>
              <Route path={`${props.match.path}`} exact component={Profile} />
              <Route path={`${props.match.path}/account`} component={Account} />
              <Route path={`${props.match.path}/profile`} component={Account} />
              <Route path={`${props.match.path}/edit`} component={Edit} />
              <Route path={`${props.match.path}/follow`} component={Follow} />
              <Route path={`${props.match.path}/fans`} component={Fans} />
              <Route path={`${props.match.path}/praise`} component={Praise} />
              <Route path={`${props.match.path}/collect`} component={Collect} />
            </Container>
          )}
        />
      </Switch>
    </Router>
  );
};

export default withRouter(Me);
