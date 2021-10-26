import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Container } from './container';

const SafeSet = React.lazy(() => import('./SafeSet'));
const NoticeSet = React.lazy(() => import('./NoticeSet'));
const LikeSet = React.lazy(() => import('./NoticeSet'));


const Set = (props) => {
  console.log('props', props);

  return (
    <Router>
      <Route render={() =>
        <Container>
          <Route exact component={SafeSet} />
          <Route component={NoticeSet} />
          <Route component={LikeSet} />
        </Container>}
      />
    </Router>
  )
}

export default Set;