import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Container } from './container';

const SafeSet = React.lazy(() => import('./SafeSet'));
const NoticeSet = React.lazy(() => import('./NoticeSet'));
const LikeSet = React.lazy(() => import('./LikeSet'));

const Set = props => {
  return (
    <Container {...props}>
      <Switch>
        <Route path={`${props.match.path}/safeset`} component={SafeSet} />
        <Route path={`${props.match.path}/noticeset`} component={NoticeSet} />
        <Route path={`${props.match.path}/likeset`} component={LikeSet} />
      </Switch>
    </Container>
  );
};

export default withRouter(Set);
