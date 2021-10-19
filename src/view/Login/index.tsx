import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Box, Flex } from 'uikit'; 
import { mediaQueries } from "uikit/theme/base";

import { LoginJoin, SignUp } from './components';

const LoginContainer = styled(Flex)`
  padding-top: 91px;
  ${mediaQueries.xxl} {
    padding-left: 160px;
    padding-right: 160px;
  }
  ${mediaQueries.md} {

  }
`

const Login: React.FC = () => {

  const [state, setState] = useImmer({
    isSignUp: false
  })

  return (
    <Box backgroundImage={`url(${require('assets/images/background_images.jpg').default})`}
      minHeight="calc(100vh - 90px);"
    >
      <LoginContainer>
        <Flex flex="1">
          <img src={require('./images/logo_left_images.png').default} />
        </Flex>
        {
          state.isSignUp ? 
          <SignUp />
          :
          <LoginJoin />
        }
      </LoginContainer>
    </Box>
  )
}

export default Login;