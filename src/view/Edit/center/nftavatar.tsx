import React, { useState } from 'react';
import { Box, Text, Flex, Button } from 'uikit';
import styled from 'styled-components';
import { Avatar } from 'components';
import { useStore } from 'store';
import { StakeNFT } from 'components/NftList';
import { useTranslation } from 'contexts/Localization';

const Nft = styled(Box)`
  background: transparent;
  margin-top: 20px;
  padding: 27px 26px 38px 34px;
  border-radius: ${({ theme }) => theme.radii.card};
`;
const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  margin-right: 31px;
`;
const Point = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
  font-size: 16px;
`;
const Rows = styled(Flex)`
  margin-top: 28px;
`;
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
`;
const UserName = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const NftAvatar: React.FC = () => {
  const userInfo: any = useStore(p => p.loginReducer.userInfo);
  const NftList = useStore(p => p.loginReducer.nftList);
  const { t } = useTranslation();

  return (
    <Nft>
      <Flex>
        <Title>{t('setNftAvatar')}</Title>
        <Point>{t('setNftAvatarList')}</Point>
      </Flex>
      <Rows>
        <Avatar
          src={userInfo.nft_image}
          scale="ld"
          style={{ marginRight: '18px' }}
        />
        <Column>
          <UserName>{userInfo.nick_name}</UserName>
          <Text color={'textTips'}>#{userInfo.nft_id}</Text>
        </Column>
      </Rows>
      <StakeNFT />
      {/* <Authorize>
            <Button>授权获取</Button>
          </Authorize> */}
    </Nft>
  );
};
export default NftAvatar;
