import React from 'react';
import styled from 'styled-components';
import { Flex, Text, Button } from 'uikit';
import { Avatar } from '../Avatar';

const FolloWarpper = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;
const Name = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;
const Desc = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
`;

export const Follow: React.FC<{
  rows: {
    nft_image: string;
    nick_name: string;
    attention_status: number;
  };
}> = ({ rows }) => {
  return (
    <FolloWarpper>
      <Flex alignItems="center">
        <Avatar scale="md" src={rows.nft_image} />
        <Flex flexDirection="column" paddingLeft="12px">
          <Flex alignItems="center">
            <Name>{rows.nick_name}</Name>
          </Flex>
          <Desc>@0x32...9239</Desc>
        </Flex>
      </Flex>
      <Button variant="secondary">+关注</Button>
    </FolloWarpper>
  );
};
