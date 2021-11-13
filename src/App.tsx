import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import GlobalStyle from 'style/global';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStore, storeAction, fetchThunk } from 'store';
import { CommonLayout, Header, Toast } from 'components';
// WalletModal
import { Box } from 'uikit';
import { storage } from 'config';
import { useThemeManager } from 'store/app/hooks';
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
const Test = React.lazy(() => import('./view/Test'));

const Container = styled(Box) <{
  dark: boolean;
}>`
  background-image: ${({ dark }) => `url(${require(dark ? 'assets/images/dark_background.jpg' : 'assets/images/light_background.jpg').default})`};
  background-attachment: fixed;
  min-height: 100vh;
`;

function App() {
  const dispatch = useDispatch();
  const store = useStore(p => p.appReducer);
  const token = window.localStorage.getItem(storage.Token);
  const [isDark] = useThemeManager();

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
  }, [token]);

  return (
    <React.Fragment>
      <React.Suspense fallback={<h1></h1>}>
        <GlobalStyle />
        <Container id="bg" dark={isDark}>
          <Router forceRefresh>
            <Switch>
              <Route path="/" exact render={props => <Home {...props} />} />
              {
                process.env.NODE_ENV === 'development' && (
                  <Route path="/test" exact >
                    <Test />
                  </Route>
                )
              }
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
              <PrivateRoute path="/set" component={Set} />
            </Switch>
          </Router>
        </Container>
        <Toast />
        {/* <WalletModal onClick={() => dispatch(storeAction.connectWallet({ connectWallet: false }))} show={store.connectWallet} /> */}
      </React.Suspense>
    </React.Fragment>
  );
}

export default React.memo(App);
