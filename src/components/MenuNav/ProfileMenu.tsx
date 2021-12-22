import React from 'react';
import styled from 'styled-components';
import { useStore } from 'store';
import { Flex, Box, Text } from 'uikit';
import { Avatar } from 'components';
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
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icon {
    width: 0px;
    height: 0px;
    border-bottom: 7px solid transparent;
    border-left: 7px solid ${({ theme }) => theme.colors.white_black};
    border-right: 7px solid transparent;
    border-top: 7px solid transparent;
  }
`;

export const ProfileMenu = React.memo(() => {
  const userInfo = useStore(p => p.loginReducer.userInfo);
  return (
    <React.Fragment>
      {userInfo.uid ? (
        <Flex alignItems='center' width='100%' style={{ minWidth: 0 }}>
          <Avatar disableFollow src={userInfo?.nft_image} scale='sm' />
          <Content>
            <UserTitle>
              <Text className='name'>{userInfo.nick_name}</Text>
              <Box className='icon'></Box>
            </UserTitle>
            <Text color='textTips'>@{shortenAddress(userInfo.address, 1)}</Text>
          </Content>
        </Flex>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
});
