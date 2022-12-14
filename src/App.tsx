import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import GlobalStyle from 'style/global';
// import VConsole from 'vconsole';
import { Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchThunk, storeAction } from 'store';
import { useFetchTimeBurnData } from 'store/wallet/hooks';
import { CommonLayout, ToastComponents, Navigation } from 'components';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import PageLoader from 'components/Loader/PageLoader';
import PageContainer from 'components/Layout/PageContainer';
import { Box } from 'uikit';
import { storage } from 'config';
import { isApp } from 'utils/client';

import useEagerConnect from 'hooks/useEagerConnect';
import { RewardAuthorContract } from 'components/RewardAuth/hook';
import useUnreadMsg from 'hooks/imHooks/useUnreadMsg';

import history from './routerHistory';
import AccountUpdater from './view/Updater/AccountUpdater';
import EventBusUpdater from './view/Updater/EventBusUpdater';
import ScrollBarApdater from './view/Updater/ScrollBarApdater';
import TimeLeftUpdater from './view/Updater/TimeLeftUpdater';
import Gotop from 'components/GoTop';

dayjs.extend(relativeTime, {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y' },
    { l: 'yy', d: 'year' },
  ],
  rounding: Math.floor,
});
dayjs.extend(updateLocale);

// dayjs.updateLocale('en', {
//   relativeTime: {
//     ss: "%d s",

//   }
// })

// 路由加载
const Home = React.lazy(() => import('./view/Home'));
// const ArticleDetilsLayout = React.lazy(
//   () => import('./components/Layout/ArticleDetilsLayout'),
// );
const TopicList = React.lazy(() => import('./view/TopicList'));
const Me = React.lazy(() => import('./view/Me'));
const Login = React.lazy(() => import('./view/Login'));
const Set = React.lazy(() => import('./view/Set'));
const Test = React.lazy(() => import('./view/Test'));
const Account = React.lazy(() => import('./view/Account'));
const Task = React.lazy(() => import('./view/Task'));
const FaucetSmart = React.lazy(() => import('./view/FaucetSmart'));
const PickNft = React.lazy(() => import('./view/PickNft'));
const Swap = React.lazy(() => import('./view/Swap'));
const Search = React.lazy(() => import('./view/Search'));
const Post = React.lazy(() => import('./view/Post'));
const PostDetails = React.lazy(() => import('./view/Post/details'));
const ForwardList = React.lazy(() => import('./view/Post/forward'));

const Container = styled(Box)`
  /* background-color: ${({ theme }) => theme.colors.background}; */
  min-height: 100vh;
`;

const Updater = () => {
  return (
    <>
      <AccountUpdater />
      <EventBusUpdater />
      <ScrollBarApdater />
      <TimeLeftUpdater />
    </>
  );
};

function App() {
  useEagerConnect();
  useUnreadMsg(); // 未读消息
  useFetchTimeBurnData(); // 今日消耗
  const dispatch = useDispatch();
  const token = window.localStorage.getItem(storage.Token);
  const { account } = useActiveWeb3React();
  const { getTokens, approve } = RewardAuthorContract();

  const getTokensToCache = useCallback(async () => {
    try {
      const res = await getTokens();
      const isApprove = await approve(
        account,
        res?.map(item => item[0]),
      );
      const newArr = res.map((item, index) => [
        ...item.toString().split(','),
        isApprove[index].toString(),
      ]);
      dispatch(storeAction.setSupportToken(newArr));
    } catch (error) {
      console.error(error);
    }
  }, [account, dispatch, getTokens, approve]);

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
  }, [token, account, getTokensToCache]);

  return (
    <Router history={history}>
      <GlobalStyle />
      <Container id='bg'>
        <PageContainer>
          <React.Suspense fallback={<PageLoader />}>
            <Box className='popupBoundary'>
              <Switch>
                <Route path='/' exact render={props => <Home {...props} />} />
                <Route path='/login' exact component={Login} />
                <Route
                  path='/topiclist/:id/:name'
                  render={props => (
                    <TopicList
                      key={props.location.pathname + props.location.search}
                      {...props}
                    />
                  )}
                />
                <Route path='/articledetils/:id' component={PostDetails} />
                <Route path='/forward/:id' component={ForwardList} />
                <Route path='/task' component={Task} />
                <Route
                  path='/notification'
                  render={props => <CommonLayout {...props} />}
                />
                <Route path='/me' component={Me} />
                <Route path='/set' component={Set} />
                <Route path='/account' component={Account} />
                <Route path='/picknft' component={PickNft} />
                <Route path='/create' component={PickNft} />
                <Route path='/search' component={Search} />
                <Route path='/post' component={Post} />
                <Route path='/swap' component={Swap} />
                {process.env.NODE_ENV === 'development' && (
                  <>
                    <Route path='/faucet-smart' component={FaucetSmart} />
                    <Route path='/test' component={Test} />
                  </>
                )}
              </Switch>
            </Box>
            <Updater />
          </React.Suspense>
        </PageContainer>
        <Gotop />
        {isApp() && <Navigation />}
      </Container>
      <ToastComponents />
    </Router>
  );
}

export default App;
