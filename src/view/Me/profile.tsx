import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useImmer } from 'use-immer';
import { Link } from 'react-router-dom';
import {
  Crumbs,
  Avatar,
  Certification,
  List,
  MoreOperatorEnum,
  Icon
} from 'components';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import { Box, Button, Card, Flex, Text } from 'uikit';

import { shortenAddress } from 'utils/contract';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useTranslation } from 'contexts/Localization';
import { useStore } from 'store';
import { Api } from 'apis';

import { Tabs, Popup } from './components';
import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import defaultDarkImages from 'assets/images/default_background.png';
import defaultLightImages from 'assets/images/default_light_background.png';

import useAuth from 'hooks/useAuth';

const Center = styled(Box)`
  width: 100%;
`;
const ProfileCard = styled(Card)`
  position: relative;
  overflow: visible;
  background-color: transparent;
`;
const HeadTop = styled(Box)`
  width: 100%;
  min-height: 270px;
  background-size: 100% auto;
`;
const ProfileInfo = styled(Box)`
  margin-top: -75px;
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
    word-wrap: break-word;
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

const Profile: React.FC<any> = props => {
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
  const { t } = useTranslation();
  const country = useStore(p => p.appReducer.localtion);
  const currentUid = useStore(p => p.loginReducer.userInfo);
  const setting = useStore(p => p.appReducer.systemCustom);
  const uid = props.match?.params?.uid;
  const gray = useTheme().colors.textTips;
  const { profile, loading, page, totalPage, list } = state;
  const { signOut } = useAuth();
  const { isDark } = useTheme();
  const defaultImages = isDark ? defaultDarkImages : defaultLightImages;
  const { languange } = setting;
  const systemLang = languange?.value?.code;

  // 阅读文章扣费
  const [nonce, setNonce] = useState(0)
  useReadArticle(nonce);

  const init = async (offset?: number) => {
    try {
      setState(p => {
        p.loading = true;
      });
      const [profile, tweet] = await Promise.all([
        Api.MeApi.getProfile(uid),
        Api.MeApi.getProfileMsg(offset || page, uid)
      ]);
      if (Api.isSuccess(profile) || Api.isSuccess(tweet)) {
        setState(p => {
          p.profile = profile?.data;
          p.list = offset
            ? [...(tweet?.data?.list || [])]
            : [...state.list, ...(tweet?.data?.list || [])];
          p.page = (offset || page) + 1;
          p.totalPage = tweet.data.total_page;
        });
      }
    } catch (error) {
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  };

  React.useEffect(() => {
    init(1);
  }, [uid]);

  const locationDisplay = React.useMemo(() => {
    const defaultCountry = country?.find(item => item.ID === profile.location);
    return systemLang === 'CN'
      ? defaultCountry?.LocaltionZh
      : defaultCountry?.LocationEn;
  }, [country, profile.location]);

  return (
    <Center>
      <Crumbs title={t('meHome')} back={Boolean(uid)} />
      <ProfileCard isBoxShadow>
        <HeadTop
          style={{
            backgroundImage: `url(${profile.background_image || defaultImages})`
          }}
        />
        <ProfileInfo>
          <Info>
            <Flex alignItems="flex-end" style={{ flex: 1 }}>
              <Avatar scale="xl" src={profile.nft_image} />
              <Desc>
                <Text className="name">{profile.nick_name}</Text>
                <Flex mt="5px">
                  <Flex>
                    {/* <Certification /> */}
                    <Text className="text">
                      @{shortenAddress(profile.address)}
                    </Text>
                  </Flex>
                  {locationDisplay && (
                    <Flex className="marginLeft" alignItems="center">
                      <Icon name="icon-dizhi" color={gray} />
                      <Text className="text">{locationDisplay}</Text>
                    </Flex>
                  )}
                </Flex>
              </Desc>
            </Flex>
            {!uid || Number(uid) === currentUid.uid ? (
              <>
                <Button as={Link} to="/me/edit">
                  {t('meEditProfile')}
                </Button>
                {/* <Button onClick={() => { signOut() }}>
                  {t('退出账号')}
                </Button> */}
              </>
            ) : (
              <Popup user={profile} onCallback={() => init(1)} />
            )}
          </Info>
          <Content>
            <Box className="desc">
              <Text className="text" style={{ wordBreak: 'break-word' }}>
                {profile.introduction}
              </Text>
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
                {t('meFans')}
                <Text className="value"> {profile.fans_num}</Text>
              </Text>
              <Text className="text">
                {t('meFollow')}
                <Text className="value"> {profile.attention_num}</Text>
              </Text>
              <Text className="text">
                {t('meDynamic')}
                <Text className="value"> {profile.post_num}</Text>
              </Text>
            </Flex>
            {/* <Flex className="topic">
              <Text className="text">{t('meActiveTopic')}</Text>
              {profile?.label_list.map((row: string, index: number) => (
                <Button variant="secondary" key={index}>
                  #{row}
                </Button>
              ))}
            </Flex> */}
          </Content>
        </ProfileInfo>
      </ProfileCard>
      <Tabs />
      <List
        marginTop={13}
        loading={loading}
        renderList={() => {
          if (loading || page > totalPage) return false;
          init();
        }}
      >
        {list.map((item, index) => (
          <MeItemWrapper key={`${item.id}+${index}`}>
            {
              // 浏览自己的不扣费
              currentUid?.uid !== item.user_id && (
                <SpendTimeViewWithArticle nonce={nonce} readType={ReadType.ARTICLE} articleId={item.id} />
              )
            }
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
              callback={(type) => {
                init(1)
              }}
            />
            <MentionOperator
              replyType="twitter"
              type="Article"
              postId={item.id}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id
                }
              }}
              callback={(type) => {
                console.log(type, '===')
                init(1)
              }}
            />
          </MeItemWrapper>
        ))}
      </List>
    </Center>
  );
};

export default Profile;
