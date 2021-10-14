import React from 'react';
import styled from 'styled-components';
import { useImmer } from "use-immer";
import { useDispatch } from "react-redux";
import { useTranslation } from 'contexts/Localization';
import { useStore } from 'store';

import GlobalStyle from 'style/global';

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
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
  const testStore = useStore(p=> p.test);
  const { t } = useTranslation();
  const [state] = useImmer({
    logo: require('./logo.svg').default
  })

  React.useEffect(() => {

  }, []);

  console.log(process.env, testStore);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Header>
        <img src={state.logo} className="App-logo" alt="logo" />
        <Button onClick={() => {
          dispatch({ type: 'TEST/SHOW' });
        }}>{t("Connect Wallet")}</Button>
      </Header>
    </React.Fragment>
  );
}

export default React.memo(App);
