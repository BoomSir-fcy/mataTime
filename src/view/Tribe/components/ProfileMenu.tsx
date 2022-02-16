import React from 'react';
import styled from 'styled-components';
import { useStore } from 'store';
import { Flex, Box, Text } from 'uikit';
import { Avatar, Icon } from 'components';
import { shortenAddress } from 'utils/contract';

const Content = styled(Flex)`
  min-width: 0;
  flex: 1;
  flex-direction: column;
  margin-left: 12px;
`;

const UserTitle = styled(Flex)`
  min-width: 0;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white_black};
  .name {
    font-size: 18px;
    font-weight: bold;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const TribeProfileMenu: React.FC<{
  nick_name?: string;
  address?: string;
  nft_image?: string;
}> = React.memo(({ nick_name, address, nft_image }) => {
  return (
    <React.Fragment>
      <Flex alignItems='center' width='100%' style={{ minWidth: 0 }}>
        <Avatar disableFollow src={nft_image} scale='sm' />
        <Content>
          <UserTitle>
            <Text className='name'>{nick_name}</Text>
          </UserTitle>
          <Text color='textTips'>@{shortenAddress(address, 1)}</Text>
        </Content>
      </Flex>
    </React.Fragment>
  );
});
