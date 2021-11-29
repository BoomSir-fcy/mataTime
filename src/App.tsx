import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import useEagerConnect from 'hooks/useEagerConnect';
import GlobalStyle from 'style/global';
import { IM } from 'utils';
import { Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchThunk } from 'store';
import PageLoader from 'components/Loader/PageLoader';
import { CommonLayout, ToastComponents } from 'components';
import { Box } from 'uikit';
import { storage } from 'config';

// XXX: 后期优化一下(account 分支合并后) 更换为占资源更少得dayjs
import 'moment/locale/zh-cn';
import 'react-toastify/dist/ReactToastify.css';

import history from './routerHistory';
import AccountUpdater from './view/Updater/AccountUpdater';

moment.locale('zh-cn');

// 路由加载
const Home = React.lazy(() => import('./view/Home'));
const ArticleDetilsLayout = React.lazy(
  () => import('./components/Layout/ArticleDetilsLayout')
);
const Me = React.lazy(() => import('./view/Me'));
const Login = React.lazy(() => import('./view/Login'));
const Set = React.lazy(() => import('./view/Set'));
const Test = React.lazy(() => import('./view/Test'));
const Exchange = React.lazy(() => import('./view/exchange'));
const Account = React.lazy(() => import('./view/Account'));

const Container = styled(Box)`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

function App() {
  useEagerConnect();
  const dispatch = useDispatch();
  const token = window.localStorage.getItem(storage.Token);

  useEffect(() => {
    Boolean(token) && dispatch(fetchThunk.fetchUserInfoAsync());
  }, [token, dispatch]);

  return (
    <Router history={history}>
      <GlobalStyle />
      <Container id="bg">
        {/* TODO: 把左侧导航栏提成公共组件 放到这个位置 */}
        <React.Suspense fallback={<PageLoader />}>
          <AccountUpdater />
          <Switch>
            <Route path="/" exact render={props => <Home {...props} />} />
            <Route path="/login" exact component={Login} />
            <Route
              path="/topicList/:id/:name"
              render={props => <Home {...props} />}
            />
            <Route
              path="/articleDetils/:id"
              render={props => <ArticleDetilsLayout {...props} />}
            />
            <Route path="/news" render={props => <CommonLayout {...props} />} />
            <Route path="/exchange" component={Exchange} />
            <Route path="/me" component={Me} />
            <Route path="/set" component={Set} />
            <Route path="/account" component={Account} />
            {process.env.NODE_ENV === 'development' && (
              <Route path="/test" component={Test} />
            )}
          </Switch>
        </React.Suspense>
      </Container>
      <ToastComponents />
    </Router>
  );
}

export default App;
