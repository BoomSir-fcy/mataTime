import React from 'react';
import styled from 'styled-components';
import GlobalStyle from 'style/global';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from 'contexts/Localization';
import useEagerConnect from 'hooks/useEagerConnect'
import { useStore, storeAction } from 'store';
import { Header, Toast, WalletModal, CommonLayout } from 'components';
import { Box } from 'uikit';
import { languages } from './config/localization';

import { PrivateRoute } from './PrivateRoute';

// import { CommonLayout } from 'components/Layout';

// 路由加载
const Home = React.lazy(() => import('./view/Home'));
const Login = React.lazy(() => import('./view/Login'));
const News = React.lazy(() => import('./view/News'));
const MeAccount = React.lazy(() => import('./view/Me/account'));

const Container = styled(Box)`
  background-image: url(${require('assets/images/background_images.jpg').default});
  min-height: 100vh;
`

function App() {
  useEagerConnect()

  const dispatch = useDispatch();
  const store = useStore(p=> p.appReducer);
  const { t, setLanguage } = useTranslation();

  React.useEffect(() => {
    if(store.connectWallet) {
      const changeHandler = () => {
        dispatch(storeAction.connectWallet({connectWallet: false}));
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
          {/* <Header /> */}
          <Container>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/news" exact>
                <CommonLayout>
                  <News />
                </CommonLayout>
              </Route>
              <PrivateRoute path="/account" Component={MeAccount} />
              <Route path="/login" component={Login} />
            </Switch>
          </Container>
          <Toast />
          <WalletModal 
            onClick={() => dispatch(storeAction.connectWallet({connectWallet: false}))} 
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
