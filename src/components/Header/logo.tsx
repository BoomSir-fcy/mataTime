import React from 'react';
import { Box } from 'uikit';

export const Logo: React.FC = (() => {
  return (
    <Box width="300px" height="60px" marginRight="92px">
      <img src={require('./images/logo.svg').default} alt="" />
    </Box>
  )
})