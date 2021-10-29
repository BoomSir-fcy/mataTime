import React from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { Follow, Logo } from 'components';
import { Box, Button, Flex, Text } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useDispatch } from 'react-redux';
import { fetchThunk } from 'store';

const FlexButton = styled(Flex)`
  margin-top: 110px;
  justify-content: space-between;
  button {
    width: 205px;
  }
`

const LogoWarpper = styled(Box)`
  width: 337px;
  height: 60px;
  ${mediaQueriesSize.marginbmd}
`

export const SignUpcomplete = React.memo(() => {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state;

  const complete = () => {
    dispatch(fetchThunk.fetchUserInfoAsync());
    history.replace(`${from?.pathname || '/'}`);
  }

  return (
    <Box>
      <LogoWarpper>
        <Logo url="/" src={require('../images/logo.svg').default} />
      </LogoWarpper>
      <Text fontSize="34px" marginBottom="26px" bold>推荐关注热门用户</Text>
      <Box>
        {[12,3, 4].map((row:number, index:number) => (
          <Follow key={index} />
        ))}
      </Box>
      <FlexButton>
        <Button scale="ld">换一批</Button>
        <Button scale="ld" variant="secondary" onClick={complete}>完成注册</Button>
      </FlexButton>
    </Box>
  )
})

