import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import useEagerConnect from 'hooks/useEagerConnect';
import GlobalStyle from 'style/global';
import { IM } from 'utils';
import { Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStore, storeAction, fetchThunk } from 'store';
import PageLoader from 'components/Loader/PageLoader';
import { CommonLayout, ToastComponents } from 'components';
// WalletModal
import { Box, Button, Spinner } from 'uikit';
import { storage } from 'config';
import { useThemeManager } from 'store/app/hooks';
import { useWeb3React } from '@web3-react/core';

import 'moment/locale/zh-cn';
import 'react-toastify/dist/ReactToastify.css';

import history from './routerHistory';
import useAuth from './hooks/useAuth';
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

const Container = styled(Box)<{
  dark: boolean;
}>`
  /* background-image: ${({ dark }) =>
    `url(${
      require(dark
        ? 'assets/images/dark_background.jpg'
        : 'assets/images/light_background.jpg').default
    })`};
  background-attachment: fixed; */
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

function App() {
  useEagerConnect();
  const dispatch = useDispatch();
  const token = window.localStorage.getItem(storage.Token);
  const [isDark] = useThemeManager();
  const { account } = useWeb3React();
  const [ConnectAddr, setConnectAddr] = useState('0');
  const { signOut } = useAuth();

  const initSocket = () => {
    let im = new IM({
      url: 'ws://192.168.101.112:8888/v1/ws',
      token: token
    });
    im.init();
  };

  React.useEffect(() => {
    // initSocket();
  }, []);

  // 查询是否切换账户
  // const isChangeAddr = () => {
  //   if (ConnectAddr === '0') {
  //     // 赋值初始化地址
  //     setConnectAddr(account);
  //   } else if (ConnectAddr !== account) {
  //     // 切换了地址就清除数据 重新登陆
  //     signOut();
  //   }
  // };

  // useEffect(() => {
  //   if (store.connectWallet) {
  //     const changeHandler = () => {
  //       dispatch(storeAction.connectWallet({ connectWallet: false }));
  //     };
  //     document.body.addEventListener('click', changeHandler);
  //     return () => document.body.removeEventListener('click', changeHandler);
  //   }
  // }, [store.connectWallet]);

  useEffect(() => {
    Boolean(token) && dispatch(fetchThunk.fetchUserInfoAsync());
  }, [token, dispatch]);

  // useEffect(() => {
  //   if (account) {
  //     // 1.1判断链接钱包后是否切换了钱包账户
  //     isChangeAddr();
  //   } else {
  //     if (ConnectAddr !== '0') {
  //       signOut();
  //     }
  //   }
  //   return () => { };
  // }, [account]);

  return (
    <Router history={history}>
      <GlobalStyle />
      <Container id="bg" dark={isDark}>
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
            {process.env.NODE_ENV === 'development' && (
              <Route path="/test" componen={Test} />
            )}
          </Switch>
        </React.Suspense>
      </Container>
      <ToastComponents />
    </Router>
  );
}

export default App;
