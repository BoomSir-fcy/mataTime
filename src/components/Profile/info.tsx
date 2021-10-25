import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'uikit';
import { Avatar } from 'components';
import { mediaQueriesSize } from 'uikit/theme/base';

import { Certification } from './certification';

const Desc  = styled(Flex)`
  flex: 1;
  flex-direction: column;
  ${mediaQueriesSize.marginlmd}
`

const Name = styled(Flex)`
  flex: 1;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text};
  ::after {
    content: "";
    width: 0;
    height: 0;
    margin-top: 4px;
    border-left: 5px solid ${({ theme }) => theme.colors.text};
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
    border-right: 5px solid transparent;
  }
`
const Rows = styled(Flex)`
  width: 100%;
  align-items: center;
`
const Token = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
`

export const Info = React.memo(() => {
  return (
    <Flex width="100%" justifyContent="flex-start" alignItems="center"> 
      <Avatar src="" scale="sm" />
      <Desc>
        <Name>OliNe</Name>
        <Rows>
          <Certification />
          <Token>@0x3...d39</Token>
        </Rows>
      </Desc>
    </Flex>
  )
})