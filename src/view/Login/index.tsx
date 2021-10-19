import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'uikit'; 
import { mediaQueries } from "uikit/theme/base";

import { LoginJoin } from './components';

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
  return (
    <Box backgroundImage={`url(${require('assets/images/background_images.jpg').default})`}
      minHeight="calc(100vh - 90px);"
    >
      <LoginContainer>
        <Flex flex="1">
          <img src={require('./images/logo_left_images.png').default} />
        </Flex>
        <LoginJoin />
      </LoginContainer>
    </Box>
  )
}

export default Login;