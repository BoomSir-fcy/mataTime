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

const Me = props => {
  return (
    <Router>
<<<<<<< HEAD
      <Route render={() =>
        <Container>
          <Route path={`${props.match.path}`} exact component={Profile} />
          <Route path={`${props.match.path}/account`} component={Account} />
          <Route path={`${props.match.path}/profile`} component={Account} />
          <Route path={`${props.match.path}/edit`} component={Edit} />
          <Route path={`${props.match.path}/follow`} component={Follow} />
          <Route path={`${props.match.path}/fans`} component={Fans} />
          <Route path={`${props.match.path}/praise`} component={Praise} />
          <Route path={`${props.match.path}/shield`} component={Shield} />
        </Container>}
=======
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
          </Container>
        )}
>>>>>>> d9b2f8b83afdf9ae5d2430ffc9633c23b349bc8d
      />
    </Router>
  );
};

export default Me;
