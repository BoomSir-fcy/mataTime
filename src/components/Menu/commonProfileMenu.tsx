import React from 'react';
import styled from 'styled-components';
import { useStore } from 'store';
import { Flex, Box } from 'uikit';
import { Avatar } from 'components';
import { shortenAddress } from 'utils/contract';

const UserTitle = styled.div`
  margin: 0 12px;
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white_black};
  ::after {
    position: relative;
    right: -50px;
    content: '';
    display: inline-block;
    width: 0px;
    height: 0px;
    border-bottom: 7px solid transparent;
    border-left: 7px solid ${({ theme }) => theme.colors.white_black};
    border-right: 7px solid transparent;
    border-top: 7px solid transparent;
  }
`;
const UserDesc = styled.div`
  margin: 0 12px;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textTips}; ;
`;

export const ProfileMenu = React.memo(() => {
  const userInfo = useStore(p => p.loginReducer.userInfo);
  return (
    <React.Fragment>
      {userInfo.uid ? (
        <Flex alignItems="center">
          <Avatar src={userInfo?.nft_image} scale="sm" />
          <Box>
            <UserTitle>OliNe</UserTitle>
            <UserDesc>@{shortenAddress(userInfo.address)}</UserDesc>
          </Box>
        </Flex>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
});
