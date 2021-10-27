import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Container } from './container';

const Account = React.lazy(() => import('./account'));
const Profile = React.lazy(() => import('./profile'));
const Edit = React.lazy(() => import('../Edit'));

const Me = (props) => {
  return (
    <Router>
      <Route render={() =>
        <Container>
          <Route path={`${props.match.path}`} exact component={Profile} />
          <Route path={`${props.match.path}/account`} component={Account} />
          <Route path={`${props.match.path}/profile`} component={Account} />
          <Route path={`${props.match.path}/edit`} component={Edit} />
        </Container>}
      />
    </Router>
  )
}

export default Me;