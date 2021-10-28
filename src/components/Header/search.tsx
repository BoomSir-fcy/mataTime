import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Svg } from 'uikit';

const SearchBox = styled(Flex)`
  width: 370px;
  height: 50px;
  background: rgba(45, 76, 182, 0.5);
  border-radius: 20px;
  padding-left: 33px;
`

const InputBox = styled.input`
  flex: 1;
  height: 100%;
  border: 0;
  background-color: transparent;
  outline: 0;
  padding-left: 12px;
`

export const Search = React.memo(() => {
  return (
    <SearchBox justifyContent="space-between" alignItems="center">
      <Svg viewBox="0 0 45 45" width="30px">
        <image xlinkHref={require('./images/icon_search.png').default} />
      </Svg>
      <InputBox placeholder="搜索 SOFI" />
    </SearchBox>
  )
})