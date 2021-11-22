import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import useEagerConnect from 'hooks/useEagerConnect';
import GlobalStyle from 'style/global';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStore, storeAction, fetchThunk } from 'store';
import PageLoader from 'components/Loader/PageLoader';
import { CommonLayout, Header, Toast } from 'components';
// WalletModal
import { Box, Button, Spinner } from 'uikit';
import { storage } from 'config';
import { useThemeManager } from 'store/app/hooks';
import { useWeb3React } from '@web3-react/core';

import 'moment/locale/zh-cn';
import 'react-toastify/dist/ReactToastify.css';

import history from './routerHistory';
import useAuth from './hooks/useAuth';

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
  background-image: ${({ dark }) =>
    `url(${
      require(dark
        ? 'assets/images/dark_background.jpg'
        : 'assets/images/light_background.jpg').default
    })`};
  background-attachment: fixed;
  min-height: 100vh;
`;

function App() {
  useEagerConnect();
  const dispatch = useDispatch();
  const store = useStore(p => p.appReducer);
  const token = window.localStorage.getItem(storage.Token);
  const [isDark] = useThemeManager();
  const { account } = useWeb3React();
  const [ConnectAddr, setConnectAddr] = useState('0');
  const { signOut } = useAuth();

  // 查询是否切换账户
  const isChangeAddr = () => {
    if (ConnectAddr === '0') {
      // 赋值初始化地址
      setConnectAddr(account);
    } else if (ConnectAddr !== account) {
      // 切换了地址就清除数据 重新登陆
      signOut();
    }
  };

  // 消息通知
  const newsNotice = () => {
    // 用于检查浏览器是否支持这个API。
    if (window.Notification) {
      // 支持
    } else {
      // 不支持
    }

    // 检查当前浏览器是否支持Notification对象，并且当前用户准许使用该对象，然后调用Notification.requestPermission方法，向用户弹出一条通知
    if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission(function (status) {
        var n = new Notification('通知标题', { body: '这里是通知内容！' });
      });
    }

    // Notification.requestPermission方法用于让用户做出选择，到底是否接收通知。它的参数是一个回调函数，该函数可以接收用户授权状态作为参数。
    Notification.requestPermission(function (status) {
      if (status === 'granted') {
        var n = new Notification('Hi!');
        console.log('n', n);
      } else {
        alert('Hi!');
      }
    });
  };

  useEffect(() => {
    if (store.connectWallet) {
      const changeHandler = () => {
        dispatch(storeAction.connectWallet({ connectWallet: false }));
      };
      document.body.addEventListener('click', changeHandler);
      return () => document.body.removeEventListener('click', changeHandler);
    }
  }, [store.connectWallet]);

  useEffect(() => {
    Boolean(token) && dispatch(fetchThunk.fetchUserInfoAsync());
  }, [token]);

  useEffect(() => {
    if (account) {
      // 1.1判断链接钱包后是否切换了钱包账户
      isChangeAddr();
    } else {
      if (ConnectAddr !== '0') {
        signOut();
      }
    }
    return () => {};
  }, [account]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container id="bg" dark={isDark}>
        <React.Suspense fallback={<PageLoader />}>
          <Router history={history}>
            <Route path="/" exact render={props => <Home {...props} />} />
            <Route
              path="/topicList/:id/:name"
              exact
              render={props => <Home {...props} />}
            />
            {process.env.NODE_ENV === 'development' && (
              <Route path="/test" exact>
                <Test />
              </Route>
            )}
            <Route
              path="/articleDetils/:id"
              exact
              render={props => (
                <>
                  <Header {...props} />
                  <ArticleDetilsLayout {...props}></ArticleDetilsLayout>
                </>
              )}
            ></Route>
            <Route
              path="/news"
              render={props => <CommonLayout {...props}></CommonLayout>}
            ></Route>
            <Route path="/login" exact component={Login} />
            <Route path="/exchange" component={Exchange} />
            <Route path="/me" component={Me} />
            <Route path="/set" component={Set} />
          </Router>
        </React.Suspense>
      </Container>
      <Toast />
    </React.Fragment>
  );
}

export default React.memo(App);
