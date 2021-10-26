import React from 'react';
import styled from 'styled-components';
import GlobalStyle from 'style/global';
import 'style/fonts/iconfont.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from 'contexts/Localization';
import { useStore, storeAction } from 'store';
import { languages } from './config/localization';
import { CommonLayout, Header, Toast, WalletModal } from 'components';
import { Box } from 'uikit';
import { PrivateRoute } from './PrivateRoute';

// 路由加载
const Home = React.lazy(() => import('./view/Home'));
const Me = React.lazy(() => import('./view/Me'));
const Login = React.lazy(() => import('./view/Login'));
const Edit = React.lazy(() => import('./view/Edit'));
const SafeSet = React.lazy(() => import('./view/Set/safeSet'));
const NoticeSet = React.lazy(() => import('./view/Set/noticeSet'));
const LikeSet = React.lazy(() => import('./view/Set/likeSet'));
const Set = React.lazy(() => import('./view/Set'));

const Container = styled(Box)`
  background-image: url(${require('assets/images/background_images.jpg').default});
  min-height: 100vh;
`

function App() {

  const dispatch = useDispatch();
  const store = useStore(p => p.appReducer);
  const { t, setLanguage } = useTranslation();

  React.useEffect(() => {
    if (store.connectWallet) {
      const changeHandler = () => {
        dispatch(storeAction.connectWallet({ connectWallet: false }));
      }
      document.body.addEventListener('click', changeHandler)
      return () => document.body.removeEventListener('click', changeHandler)
    }
  }, [store.connectWallet]);

  return (
    <React.Fragment>
      <Router>
        <React.Suspense fallback={<h1></h1>}>
          <GlobalStyle />
          <Container>
            <Switch>
              <Route path="/" exact>
                <Header />
                <Home />
              </Route>
              <Route path="/news" render={
                props => (
                  <CommonLayout {...props}></CommonLayout>
                )
              }>
              </Route>
              <PrivateRoute path="/me" Component={Me} />
              <PrivateRoute path="/set" Component={Set} />
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/edit">
                <Edit />
              </Route>
              <Route path="/safeSet">
                <SafeSet />
              </Route>
              <Route path="/noticeSet">
                <NoticeSet />
              </Route>
              <Route path="/likeSet">
                <LikeSet />
              </Route>
            </Switch>
          </Container>
          <Toast />
          <WalletModal
            onClick={() => dispatch(storeAction.connectWallet({ connectWallet: false }))}
            show={store.connectWallet} />
        </React.Suspense>
      </Router>
    </React.Fragment>
  );
}

{/* <Button onClick={() => 
              dispatch(storeAction.testUpdaeShow({show: !testStore.show}))}>{t("wallet")}</Button> 
            <Button onClick={() => 
              Dispatch.toast.show({type: 'info',  text: '🦄 Wow so easy!'}) 
            }>{t("wallet")}</Button>
            <Button onClick={() => setLanguage(languages['zh-CN'])}>Change Language</Button>
            */}

export default React.memo(App);
