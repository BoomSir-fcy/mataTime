import React from 'react';
import styled from 'styled-components';
import { useStore } from 'store';
import { Flex, Box } from 'uikit';
import { Avatar } from 'components';

const UserTitle = styled.div`
  margin: 0 12px;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  ::after {
    position: relative;
    right: -50px;
    content: '';
    display: inline-block;
    width: 0px;
    height: 0px;
    border-bottom: 7px solid transparent;
    border-left: 7px solid #fff;
    border-right: 7px solid transparent;
    border-top: 7px solid transparent;
  }
`;
const UserDesc = styled.div`
  margin: 0 12px;
  font-size: 16px;
  font-weight: 400;
  color: #b5b5b5;
`;

export const ProfileMenu = React.memo(() => {
  const userInfo: any = useStore(p => p.loginReducer.userInfo);
  return (
    <React.Fragment>
      {userInfo.UID ? (
        <Flex>
          <Avatar src={userInfo?.NftImage} scale="sm" />
          <Box>
            <UserTitle>OliNe</UserTitle>
            <UserDesc>@0x3...d39</UserDesc>
          </Box>
        </Flex>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
});
