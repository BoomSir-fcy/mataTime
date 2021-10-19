import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useImmer } from "use-immer";
import { useDispatch } from "react-redux";
import { useTranslation } from 'contexts/Localization';
import { useStore, storeAction, Dispatch } from 'store';
import { languages } from './config/localization';
import { Header, Toast, ConnectWalletButton } from 'components';

import GlobalStyle from 'style/global';

// 路由加载
const Home = React.lazy(() => import('./view/Home'));
const Login = React.lazy(() => import('./view/Login'));

const Button = styled.button`
  padding: 5px 10px;
  background-color: transparent;
`

function App() {

  const dispatch = useDispatch();
  const testStore = useStore(p=> p.testReducer);
  const { t, setLanguage } = useTranslation();

  return (
    <React.Fragment>
      <Router>
        <React.Suspense fallback={<h1></h1>}>
          <GlobalStyle />
          <Header>
            <ConnectWalletButton />
            {/* <Button onClick={() => 
              dispatch(storeAction.testUpdaeShow({show: !testStore.show}))}>{t("wallet")}</Button> */}
            <Button onClick={() => 
              Dispatch.toast.show({type: 'info',  text: '🦄 Wow so easy!'}) 
            }>{t("wallet")}</Button>
            <Button onClick={() => setLanguage(languages['zh-CN'])}>Change Language</Button>
            <Link to="/">Goback</Link>
            <Link to="/login">login</Link>
          </Header> 
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
          </Switch>
          <Toast />
        </React.Suspense>
      </Router>
    </React.Fragment>
  );
}

export default React.memo(App);
