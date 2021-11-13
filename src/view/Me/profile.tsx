import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Crumbs, Avatar, Certification } from 'components';
import { Box, Button, Card, Flex, Text } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import { Api } from 'apis';

import defaultImages from 'assets/images/default_me_background.jpg';

const ProfileCard = styled(Card)`
  position: relative;
`;
const HeadTop = styled(Box)`
  width: 100%;
  min-height: 270px;
  border-radius: ${({ theme }) => theme.radii.card};
  background-size: 100% auto;
`;
const ProfileInfo = styled(Box)`
  margin-top: -85px;
  ${mediaQueriesSize.padding}
`;
const Info = styled(Flex)`
  justify-content: space-between;
  align-items: flex-end;
  ${mediaQueriesSize.marginbmd}
`;
const Desc = styled(Box)`
  ${mediaQueriesSize.marginl}
  .name {
    font-size: 28px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }
  .text {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textTips};
  }
  .marginLeft {
    margin-left: 30px;
  }
`;

const Content = styled(Box)`
  .desc {
    ${mediaQueriesSize.marginb}
  }
  .text {
    font-size: 18px;
    & a {
      color: #7393ff;
    }
  }
  .number {
    ${mediaQueriesSize.marginb}
    .text {
      display: inline-block;
      margin-right: 8px;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.textTips};
    }
    .value {
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.text};
    }
    .text + .text {
      margin-left: 30px;
    }
  }

  .topic {
    align-items: center;
    .text {
      font-size: 16px;
      color: ${({ theme }) => theme.colors.textTips};
      ${mediaQueriesSize.marginr}
    }
    button + button {
      margin-left: 15px;
    }
  }
`;

const Profile: React.FC<any> = React.memo(props => {
  const [stateUserInfo, setUserInfo] = useState<Api.User.userInfoParams>({
    UID: 0,
    nick_name: '',
    fans_num: 0,
    attention_num: 0,
    email: '',
    introduction: '',
    location: '',
    label_list: []
  });

  const getUserInfo = async () => {
    try {
      const res = await Api.MeApi.getProfile(props.match?.params?.uid);
      setUserInfo({
        ...res.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Box>
      <Crumbs title="个人主页" />
      <ProfileCard>
        <HeadTop style={{ backgroundImage: `url(${defaultImages})` }} />
        <ProfileInfo>
          <Info>
            <Flex alignItems="flex-end">
              <Avatar scale="xl" src={stateUserInfo.nft_image} />
              <Desc>
                <Text className="name">{stateUserInfo.nick_name}</Text>
                <Flex mb="5px">
                  <Flex>
                    <Certification />
                    <Text className="text">@0x3...d39</Text>
                  </Flex>
                  <Flex className="marginLeft">
                    <Text className="text">{stateUserInfo.location}</Text>
                  </Flex>
                </Flex>
                <Text className="text">177条动态</Text>
              </Desc>
            </Flex>
            <Button as={Link} to="/me/edit">
              编辑资料
            </Button>
          </Info>
          <Content>
            <Box className="desc">
              <Text className="text">{stateUserInfo.Introduction}</Text>
              <Text className="text">
                Web:{' '}
                <Text as={Link} to="/">
                  http://dsgmetaverse.com/#/
                </Text>
              </Text>
              <Text className="text">Email：{stateUserInfo.email}</Text>
            </Box>
            <Flex className="number">
              <Text className="text">
                粉丝 <Text className="value">{stateUserInfo.fans_num}</Text>
              </Text>
              <Text className="text">
                关注 <Text className="value">{stateUserInfo.attention_num}</Text>
              </Text>
              <Text className="text">
                动态 <Text className="value">{stateUserInfo.fans_num}</Text>
              </Text>
            </Flex>
            <Flex className="topic">
              <Text className="text">活跃话题</Text>
              {stateUserInfo?.label_list.map((row: string, index: number) => (
                <Button variant="secondary" key={index}>
                  #{row}
                </Button>
              ))}
            </Flex>
          </Content>
        </ProfileInfo>
      </ProfileCard>
    </Box>
  );
});

export default Profile;
