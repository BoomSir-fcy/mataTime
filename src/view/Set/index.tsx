import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Container } from './container';

const SafeSet = React.lazy(() => import('./safeset'));
const NoticeSet = React.lazy(() => import('./noticeset'));
const LikeSet = React.lazy(() => import('./likeset'));

const Set = (props) => {
  return (
    <Router>
      <Route render={() =>
        <Container>
          <Route path="/set" exact component={SafeSet} />
          <Route path={`${props.match.path}/safeset`} component={SafeSet} />
          <Route path={`${props.match.path}/noticeset`} component={NoticeSet} />
          <Route path={`${props.match.path}/likeset`} component={LikeSet} />
        </Container>}
      />
    </Router>
  )
}

export default Set;