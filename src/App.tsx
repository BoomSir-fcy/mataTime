import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import GlobalStyle from 'style/global';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStore, storeAction, fetchThunk } from 'store';
import { CommonLayout, Header, Toast, WalletModal } from 'components';
import { Box } from 'uikit';
import { storage } from 'config';
import { PrivateRoute } from './PrivateRoute';

import 'moment/locale/zh-cn';
import 'react-toastify/dist/ReactToastify.css';

moment.locale('zh-cn');

// 路由加载
const Home = React.lazy(() => import('./view/Home'));
const ArticleDetilsLayout = React.lazy(() => import('./components/Layout/ArticleDetilsLayout'));
const Me = React.lazy(() => import('./view/Me'));
const Login = React.lazy(() => import('./view/Login'));
const Set = React.lazy(() => import('./view/Set'));

const Container = styled(Box)`
  background-image: url(${require('assets/images/background_images.jpg').default});
  background-attachment: fixed;
  min-height: 100vh;
`;

function App() {
  const dispatch = useDispatch();
  const store = useStore(p => p.appReducer);
  const token = window.localStorage.getItem(storage.Token);
  const systemCustom = JSON.parse(window.localStorage.getItem(storage.systemCustom));

  React.useEffect(() => {
    if (store.connectWallet) {
      const changeHandler = () => {
        dispatch(storeAction.connectWallet({ connectWallet: false }));
      };
      document.body.addEventListener('click', changeHandler);
      return () => document.body.removeEventListener('click', changeHandler);
    }
  }, [store.connectWallet]);

  React.useEffect(() => {
    Boolean(token) && dispatch(fetchThunk.fetchUserInfoAsync());
    Boolean(systemCustom) && dispatch(storeAction.setSystemCustom(systemCustom));
  }, [token]);

  return (
    <React.Fragment>
      <Router>
        <React.Suspense fallback={<h1></h1>}>
          <GlobalStyle />
          <Container id="bg">
            <Switch>
              <Route
                path="/"
                exact
                render={props => (
                  <>
                    {/* <Header {...props} /> */}
                    <Home {...props} />
                  </>
                )}
              ></Route>
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
              <Route path="/news" render={props => <CommonLayout {...props}></CommonLayout>}></Route>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/me" component={Me} />
              {/* <Route path="/edit" component={Edit} /> */}
              <PrivateRoute path="/set" component={Set} />
            </Switch>
          </Container>
          <Toast />
          <WalletModal onClick={() => dispatch(storeAction.connectWallet({ connectWallet: false }))} show={store.connectWallet} />
        </React.Suspense>
      </Router>
    </React.Fragment>
  );
}

export default React.memo(App);
