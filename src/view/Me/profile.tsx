import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Link } from 'react-router-dom';
import { Crumbs, Avatar, Certification, List, MoreOperatorEnum } from 'components';
import { Box, Button, Card, Flex, Text } from 'uikit';

import { shortenAddress } from 'utils/contract';
import { mediaQueriesSize } from 'uikit/theme/base';
import { Api } from 'apis';

import { Tabs } from './components';
import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';

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
  const [state, setState] = useImmer({
    profile: {
      post_num: 0,
      label_list: []
    } as Api.User.userInfoParams,
    loading: false,
    list: [],
    page: 1,
    totalPage: 0
  });
  const uid = props.match?.params?.uid;
  const { profile, loading, page, totalPage, list } = state;

  const init = async () => {
    try {
      setState(p => {
        p.loading = true;
      });
      const [profile, tweet] = await Promise.all([Api.MeApi.getProfile(uid), Api.MeApi.getProfileMsg(page, uid)]);
      setState(p => {
        p.profile = profile.data;
        p.list = tweet.data.list;
        p.page = page + 1;
        p.totalPage = tweet.data.total_page;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  };

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    let arr = [];
    list.forEach((item: any) => {
      let obj = item;
      if (item.id === newItem.id) {
        obj = { ...newItem.post };
      }
      if (item.id === newItem.id && (type === MoreOperatorEnum.SHIELD || type === MoreOperatorEnum.DELPOST)) {
        // 屏蔽、删除
      } else if (item.id === newItem.id && type === MoreOperatorEnum.SETTOP) {
        // 置顶
        arr.unshift(obj);
      } else {
        arr.push(obj);
      }
    });
    setState(p => {
      p.list = [...arr];
    });
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <Box>
      <Crumbs title="个人主页" />
      <ProfileCard>
        <HeadTop style={{ backgroundImage: `url(${defaultImages})` }} />
        <ProfileInfo>
          <Info>
            <Flex alignItems="flex-end">
              <Avatar scale="xl" src={profile.nft_image} />
              <Desc>
                <Text className="name">{profile.nick_name}</Text>
                <Flex mb="5px">
                  <Flex>
                    <Certification />
                    <Text className="text">@{shortenAddress(profile.address)}</Text>
                  </Flex>
                  <Flex className="marginLeft">
                    <Text className="text">{profile.location}</Text>
                  </Flex>
                </Flex>
                <Text className="text">{profile.post_num}条动态</Text>
              </Desc>
            </Flex>
            {!uid && (
              <Button as={Link} to="/me/edit">
                编辑资料
              </Button>
            )}
          </Info>
          <Content>
            <Box className="desc">
              <Text className="text">{profile.introduction}</Text>
              {/* <Text className="text">
                Web:{' '}
                <Text as={Link} to="/">
                  http://dsgmetaverse.com/#/
                </Text>
              </Text>
              <Text className="text">Email：{profile.email}</Text> */}
            </Box>
            <Flex className="number">
              <Text className="text">
                粉丝 <Text className="value">{profile.fans_num}</Text>
              </Text>
              <Text className="text">
                关注 <Text className="value">{profile.attention_num}</Text>
              </Text>
              <Text className="text">
                动态 <Text className="value">{profile.fans_num}</Text>
              </Text>
            </Flex>
            <Flex className="topic">
              <Text className="text">活跃话题</Text>
              {profile?.label_list.map((row: string, index: number) => (
                <Button variant="secondary" key={index}>
                  #{row}
                </Button>
              ))}
            </Flex>
          </Content>
        </ProfileInfo>
      </ProfileCard>
      <Tabs />
      <List
        marginTop={13}
        loading={loading}
        renderList={() => {
          if (loading || page > totalPage) return false;
          setState(p => {
            p.loading = true;
          });
          Api.MeApi.getProfileMsg(page, uid).then(res => {
            setState(p => {
              p.loading = false;
            });
            if (Api.isSuccess(res)) {
              setState(p => {
                p.page = page + 1;
                p.list = [...list, ...res.data.list];
              });
            }
          });
        }}
      >
        {list.map((item, index) => (
          <MeItemWrapper key={`${item.id}+${index}`}>
            <MentionItem
              {...props}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id
                }
              }}
              callback={(item: any, type: MoreOperatorEnum) => {
                updateList(item, type);
              }}
            />
            <MentionOperator
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id
                }
              }}
              callback={(item: any) => {
                updateList(item);
              }}
            />
          </MeItemWrapper>
        ))}
      </List>
    </Box>
  );
});

export default Profile;
