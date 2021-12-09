import React, { useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import GlobalStyle from 'style/global';
import { Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchThunk, storeAction } from 'store';
import { CommonLayout, ToastComponents } from 'components';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import PageLoader from 'components/Loader/PageLoader';
import PageContainer from 'components/Layout/PageContainer';
import { Box } from 'uikit';
import { storage } from 'config';

import useEagerConnect from 'hooks/useEagerConnect';
import { RewardAuthorContract } from 'components/RewardAuth/hook';

import history from './routerHistory';
import AccountUpdater from './view/Updater/AccountUpdater';
import HttpUpdater from './view/Updater/HttpUpdater';

import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
dayjs.extend(relativeTime);

// 路由加载
const Home = React.lazy(() => import('./view/Home'));
const ArticleDetilsLayout = React.lazy(
  () => import('./components/Layout/ArticleDetilsLayout')
);
const TopicList = React.lazy(() => import('./view/TopicList'));
const Me = React.lazy(() => import('./view/Me'));
const Login = React.lazy(() => import('./view/Login'));
const Set = React.lazy(() => import('./view/Set'));
const Test = React.lazy(() => import('./view/Test'));
const Account = React.lazy(() => import('./view/Account'));
const FaucetSmart = React.lazy(() => import('./view/FaucetSmart'));

const Container = styled(Box)`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

function App() {
  useEagerConnect();
  const dispatch = useDispatch();
  const token = window.localStorage.getItem(storage.Token);
  const { account } = useActiveWeb3React();
  const { getTokens, approve } = RewardAuthorContract();

  const getTokensToCache = async () => {
    try {
      const res = await getTokens();
      const isApprove = await approve(
        account,
        res.map(item => item[0])
      );
      const newArr = res.map((item, index) => [
        ...item.toString().split(','),
        isApprove[index].toString()
      ]);
      dispatch(storeAction.setSupportToken(newArr));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchThunk.fetchUserInfoAsync());
      // dispatch(storeAction.setUserToken(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (account) {
      getTokensToCache();
    }
  }, [token, account]);

  // useEffect(() => {
  //   eventBus.addEventListener('http', (data) => {
  //     console.log('==========', data)
  //   })
  // }, [])

  return (
    <Router history={history}>
      <GlobalStyle />
      <Container id="bg">
        {/* TODO: 把左侧导航栏提成公共组件 放到这个位置 */}
        <PageContainer>
          <React.Suspense fallback={<PageLoader />}>
            <AccountUpdater />
            <HttpUpdater />
            <Switch>
              <Route path="/" exact render={props => <Home {...props} />} />
              <Route path="/login" exact component={Login} />
              <Route
                path="/topicList/:id/:name"
                render={props => (
                  <TopicList
                    key={props.location.pathname + props.location.search}
                    {...props}
                  />
                )}
              />
              <Route
                path="/articleDetils/:id"
                render={props => <ArticleDetilsLayout {...props} />}
              />
              <Route
                path="/news"
                render={props => <CommonLayout {...props} />}
              />
              <Route path="/me" component={Me} />
              <Route path="/set" component={Set} />
              <Route path="/account" component={Account} />
              <Route path="/faucet-smart" component={FaucetSmart} />
              {process.env.NODE_ENV === 'development' && (
                <Route path="/test" component={Test} />
              )}
            </Switch>
          </React.Suspense>
        </PageContainer>
      </Container>
      <ToastComponents />
    </Router>
  );
}

export default App;
