import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from './container';

const Account = React.lazy(() => import('./account'));
const Profile = React.lazy(() => import('./profile'));
const Edit = React.lazy(() => import('../Edit'));
const Follow = React.lazy(() => import('./follow'));
const Fans = React.lazy(() => import('./fans'));
const Praise = React.lazy(() => import('./praise'));
const Shield = React.lazy(() => import('./shield'));

const Me = props => {
  return (
    <Router>
      <Route
        render={() => (
          <Container>
            <Route path={`${props.match.path}`} exact component={Profile} />
            <Route path={`${props.match.path}/account`} component={Account} />
            <Route path={`${props.match.path}/profile`} component={Account} />
            <Route path={`${props.match.path}/edit`} component={Edit} />
            <Route path={`${props.match.path}/follow`} component={Follow} />
            <Route path={`${props.match.path}/fans`} component={Fans} />
            <Route path={`${props.match.path}/praise`} component={Praise} />
            <Route path={`${props.match.path}/shield`} component={Shield} />
          </Container>
        )}
      />
    </Router>
  );
};

export default Me;
