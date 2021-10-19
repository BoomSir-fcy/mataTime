import React from 'react';
import styled from 'styled-components';
import { Follow } from 'components';
import { Box, Button, Flex, Text } from 'uikit';

const FlexButton = styled(Flex)`
  margin-top: 110px;
  justify-content: space-between;
  button {
    width: 205px;
  }
`

export const SignUpcomplete = React.memo(() => {
  return (
    <Box>
      <Text fontSize="34px" marginBottom="26px" bold>推荐关注热门用户</Text>
      <Box>
        {[12,3, 4].map((row:number, index:number) => (
          <Follow key={index} />
        ))}
      </Box>
      <FlexButton>
        <Button scale="ld">换一批</Button>
        <Button scale="ld" variant="secondary">完成注册</Button>
      </FlexButton>
    </Box>
  )
})

