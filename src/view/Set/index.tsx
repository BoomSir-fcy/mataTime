import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Container } from './container';

const SafeSet = React.lazy(() => import('./SafeSet'));
const NoticeSet = React.lazy(() => import('./NoticeSet'));
const LikeSet = React.lazy(() => import('./LikeSet'));

const Set = props => {
  return (
    <Router>
      <Route
        render={() => (
          <Container>
            <Route path="/set" exact component={SafeSet} />
            <Route path={`${props.match.path}/safeset`} component={SafeSet} />
            <Route path={`${props.match.path}/noticeset`} component={NoticeSet} />
            <Route path={`${props.match.path}/likeset`} component={LikeSet} />
          </Container>
        )}
      />
    </Router>
  );
};

export default withRouter(Set);
