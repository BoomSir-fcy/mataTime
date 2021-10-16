import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useImmer } from "use-immer";
import { useDispatch } from "react-redux";
import { useTranslation } from 'contexts/Localization';
import { useStore, storeAction, Dispatch } from 'store';
import { languages } from './config/localization';
import { Toast } from 'components';

import GlobalStyle from 'style/global';

// 路由加载
const Home = React.lazy(() => import('./view/Home'));

const Header = styled.header`
  background-color: #282c34;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
const Button = styled.button`
  padding: 5px 10px;
  background-color: transparent;
`

function App() {

  const dispatch = useDispatch();
  const testStore = useStore(p=> p.testReducer);
  const { t, setLanguage } = useTranslation();
  const [state] = useImmer({
    logo: require('./logo.svg').default
  })

  return (
    <React.Fragment>
      <Router>
        <React.Suspense fallback={<h1>111</h1>}>
          <GlobalStyle />
          <Header>
            <img src={state.logo} width="100" alt="logo" />
            {/* <Button onClick={() => 
              dispatch(storeAction.testUpdaeShow({show: !testStore.show}))}>{t("wallet")}</Button> */}
            <Button onClick={() => 
              Dispatch.toast.show({type: 'info',  text: '🦄 Wow so easy!'}) 
            }>{t("wallet")}</Button>
            <Button onClick={() => setLanguage(languages['zh-CN'])}>Change Language</Button>
            <Link to="/">Goback</Link>
            <Link to="/home">Home</Link>
          </Header> 
          <Toast />
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </React.Suspense>
      </Router>
    </React.Fragment>
  );
}

export default React.memo(App);
