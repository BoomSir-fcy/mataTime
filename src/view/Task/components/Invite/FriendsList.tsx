import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'uikit';

const Row = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueriesSize.marginbmd}
`
const FriendsList: React.FC = () => {
  return (
    <Flex width="100%" flexDirection="column">
      <Row>
        <Text color="textTips" small>Nickname</Text>
        <Text color="textTips" small>Address</Text>
        <Text color="textTips" small>Invitation Time</Text>
        <Text small>My Rebate（TIME）</Text>
      </Row>
      <Row>
        <Text small>Nickname</Text>
        <Text small>0x2...2652</Text>
        <Text small>2022-12-12 18:00:46</Text>
        <Text small>123452.12</Text>
      </Row>
      <Row>
        <Text small>Nickname</Text>
        <Text small>0x2...2652</Text>
        <Text small>2022-12-12 18:00:46</Text>
        <Text small>123452.12</Text>
      </Row>
    </Flex>
  );
}

export default FriendsList;
