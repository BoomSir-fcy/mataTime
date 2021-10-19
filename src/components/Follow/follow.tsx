import React from 'react';
import styled from 'styled-components';
import { Flex, Text, Button } from 'uikit';
import { Avatar } from '../Avatar';

const FolloWarpper = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`

const Name = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`
const Desc = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips}; 
`

const SafeIcon = styled.img`
  width: 22px;
  height: 22px;

`

export const Follow = (() => {
  return (
    <FolloWarpper>
      <Flex alignItems="center">
        <Avatar src={require('assets/images/community_logo.png').default} />
        <Flex flexDirection="column" paddingLeft="12px">
          <Flex alignItems="center">
            <Name>曼克斯</Name>
            <SafeIcon src={require('assets/images/icon_safe.png').default} alt="" />
          </Flex>
          <Desc>@0x32...9239</Desc>
        </Flex>
      </Flex>
      <Button>+关注</Button>
    </FolloWarpper>
  )
})