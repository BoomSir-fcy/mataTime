import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { storeAction, useStore } from 'store';
import { Box, Flex } from 'uikit'; 
import { Footer } from 'components';
import { mediaQueries } from "uikit/theme/base";

import { LoginJoin, SignUp } from './components';

const LoginContainer = styled(Box)`
  padding-top: 58px;
  ${mediaQueries.xxl} {
    padding-left: 160px;
    padding-right: 160px;
  }
  ${mediaQueries.md} {

  }
`

const Login: React.FC = React.memo(() => {

  const dispatch = useDispatch();
  const loginReduce = useStore(p => p.loginReducer);
  const { isSignup } = loginReduce;

  React.useEffect(() => {
    return () => {
      dispatch(storeAction.changeSignUp({isSignup: false}));
    }
  }, []);

  return (
    <LoginContainer>
      <Flex>
        <Flex flex="1">
          <img src={require('./images/logo_left_images.png').default} />
        </Flex>
        {
          isSignup ? 
          <SignUp isSignup={true} />
          :
          <LoginJoin />
        }
      </Flex>
      <Footer />
    </LoginContainer>
  )
})

export default Login;