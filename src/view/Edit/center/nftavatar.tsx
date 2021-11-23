import React, { useState } from 'react';
import { Box, Text, Flex, Button } from 'uikit';
import styled from 'styled-components';
import { Avatar } from 'components';
import { useStore } from 'store';
import { StakeNFT } from 'components/NftList';

const Nft = styled(Box)`
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundCard};
  margin-top: 19px;
  padding: 27px 26px 38px 34px;
  border-radius: 10px;
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
const Authorize = styled(Flex)`
  justify-content: center;
  align-items: center;
  height: 112px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  margin-top: 28px;
`;
const GetAuthorizeBox = styled(Box)`
  padding: 17px;
  margin-top: 28px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
`;
const GetAuthorize = styled(Flex)`
  justify-content: space-between;
  margin-top: 26px;
`;
const AvatarName = styled(Text)`
  text-align: center;
  margin-top: 21px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textTips};
`;

const NftAvatar: React.FC = () => {
  const [state, setstate] = useState();
  const userInfo: any = useStore(p => p.loginReducer.userInfo);
  const NftList = useStore(p => p.loginReducer.nftList);

  return (
    <Nft>
      <Flex>
        <Title>NFT 头像</Title>
        <Point>平台仅支持将持有的NFT图片作为头像，暂不支持上传图片</Point>
      </Flex>
      <div>
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
      </div>
    </Nft>
  );
};
export default NftAvatar;
