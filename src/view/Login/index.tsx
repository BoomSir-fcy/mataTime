import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { storeAction, useStore } from 'store';
import { Flex } from 'uikit'; 
import { Footer } from 'components';
import { mediaQueries } from "uikit/theme/base";

import { LoginJoin, SignUp } from './components';

const LoginContainer = styled(Flex)`
  padding-top: 58px;
  ${mediaQueries.xxl} {
    padding-left: 160px;
    padding-right: 160px;
  }
`

const Login: React.FC = React.memo((route: RouteComponentProps) => {

  const dispatch = useDispatch();
  const loginReduce = useStore(p => p.loginReducer);
  const { isSignup, signUpFail } = loginReduce;
  const { location } = route;

  const checkNetwork = async() => {
    const chainId: any = await window.ethereum.request({ method: 'eth_chainId' });
    dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
  }

  React.useEffect(() => {
    checkNetwork();
    window.ethereum.on('chainChanged', (chainId: string) => {
      dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
    });
    return () => {
      dispatch(storeAction.changeSignUp({isSignup: false}));
      dispatch(storeAction.changeSignUpStep({singUpStep: 1}));
    }
  }, []);

  return (
    <React.Fragment>
      <LoginContainer>
        <Flex flex="1">
          <img src={require('./images/logo_left_images.png').default} />
        </Flex>
        {
          isSignup ? 
          <SignUp isSignup={signUpFail} />
          :
          <LoginJoin />
        }
      </LoginContainer>
      <Footer />
    </React.Fragment>
  )
})

export default withRouter(Login);