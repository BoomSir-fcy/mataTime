import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'uikit';
import { Logo } from './logo';

const BoxStyled = styled(Box)`
  width: 100%;
  height: 90px;
  padding: 0 160px;
  background: linear-gradient(90deg, #5B3CE0, #5A7EFA);
`

export const Header = React.memo((props) => {
  return (
    <BoxStyled>
      <Flex alignItems="center" height="100%">
        <Logo />
        {props.children}
      </Flex>
    </BoxStyled>
  )
})