import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from 'uikit';

const FooterWarpper = styled(Flex)`

`

const Logo = styled(Box)`


`

export const Footer = React.memo(() => {
  return (
    <FooterWarpper>
      <Logo/>
      <Flex>
        <Text>Terms of Service </Text>
        <Text>Privacy Policy</Text>
      </Flex>
    </FooterWarpper> 
  )
})