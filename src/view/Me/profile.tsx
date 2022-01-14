import React, { useState, useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { useImmer } from 'use-immer';
import { Link, useHistory } from 'react-router-dom';
import {
  Crumbs,
  Avatar,
  Certification,
  List,
  MoreOperatorEnum,
  Icon,
  FollowButton,
  CancelAttentionModal,
  SendPost,
} from 'components';
import { debounce } from 'lodash';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import { Box, Button, Card, Flex, Text } from 'uikit';

import { shortenAddress } from 'utils/contract';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useTranslation } from 'contexts/Localization';
import { EN } from 'config/localization';
import { useStore } from 'store';
import { Api } from 'apis';

import { Tabs, Popup } from './components';
import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import defaultDarkImages from 'assets/images/default_background.png';
import defaultLightImages from 'assets/images/default_light_background.png';

import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';

import { ComponentsWrapper } from 'components/Cirde/PageContainer';
import CommonCircle from 'components/Cirde/CommonCircle';

import useAuth from 'hooks/useAuth';
import useMenuNav from 'hooks/useMenuNav';
import eventBus from 'utils/eventBus';

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
  overflow: hidden;
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
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0;
  }
  .name {
    min-width: 0;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 18px;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 28px;
    }
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }
  .text {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textTips};
  }
  .marginLeft {
    margin-left: 10px;
    ${({ theme }) => theme.mediaQueries.sm} {
      margin-left: 30px;
    }
  }
`;

const Content = styled(Box)`
  .desc {
    ${mediaQueriesSize.marginb}
  }
  .text {
    font-size: 18px;
    & a {
      color: ${({ theme }) => theme.colors.textPrimary};
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
const CenterImg = styled.img`
  position: absolute;
  top: 40%;
  left: 8%;
`;

const FollowButtonBox = styled(Box)`
  ${mediaQueriesSize.marginr}
`;

const ProfileDesc: React.FC<{
  profile: any;
  className?: string;
}> = ({ profile, className }) => {
  const gray = useTheme().colors.textTips;
  const { currentLanguage } = useTranslation();
  const country = useStore(p => p.appReducer.localtion);

  const locationDisplay = React.useMemo(() => {
    const defaultCountry = country?.find(item => item.ID === profile.location);
    return currentLanguage.locale === EN.locale
      ? defaultCountry?.LocationEn
      : defaultCountry?.LocaltionZh;
  }, [country, profile.location]);

  return (
    <Desc className={className}>
      <Text className='name' ellipsis maxLine={2}>
        {profile.nick_name}
      </Text>
      <Flex mt='5px' flexWrap='wrap'>
        <Flex>
          {/* <Certification /> */}
          <Text className='text'>@{shortenAddress(profile.address)}</Text>
        </Flex>
        {locationDisplay && (
          <Flex className='marginLeft' alignItems='center'>
            <Icon name='icon-dizhi' color={gray} />
            <Text className='text'>{locationDisplay}</Text>
          </Flex>
        )}
      </Flex>
    </Desc>
  );
};

const Profile: React.FC<any> = props => {
  const history = useHistory();
  const [state, setState] = useImmer({
    profile: {
      label_list: [],
    } as Api.User.userInfoParams,
    loading: false,
    list: [],
    page: 1,
    totalPage: 0,
  });
  const { t, currentLanguage } = useTranslation();
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
  const [FollowState, setFollowState] = useImmer({
    cancelFollow: false,
    cancelParams: {
      uid: 0,
      address: '',
      nft_image: '',
    },
  });
  const [isEnd, setIsEnd] = useState(false);
  const perpage = MAX_SPEND_TIME_PAGE_TATOL;

  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);

  const { isMobile } = useMenuNav();

  const FollowData = useMemo(() => {
    const data = {
      address: profile.address,
      display_format: profile.display_format,
      introduction: profile.introduction,
      location: profile.location,
      nft_image: profile.nft_image,
      nick_name: profile.nick_name,
      uid: profile.uid,
      attention_status: profile.is_attention,
    };
    return data;
  }, [profile]);

  const init = async (offset?: number) => {
    try {
      setState(p => {
        p.loading = true;
      });
      const [profile, tweet] = await Promise.all([
        Api.MeApi.getProfile(uid),
        Api.MeApi.getProfileMsg({ page: offset || page, perpage, uid }),
      ]);
      if (Api.isSuccess(profile)) {
        setState(p => {
          p.profile = profile?.data;
        });
      }
      if (Api.isSuccess(tweet)) {
        setState(p => {
          p.list = offset
            ? [...(tweet?.data?.list || [])]
            : [...state.list, ...(tweet?.data?.list || [])];
          p.page = (offset || page) + 1;
          p.totalPage = tweet.data.total_page;
        });
        if (tweet?.data?.list?.length < perpage) {
          setIsEnd(true);
        } else {
          setIsEnd(false);
        }
      }
    } catch (error) {
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  };

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum) => {
    const {
      FOLLOW,
      CANCEL_FOLLOW,
      SETTOP,
      CANCEL_SETTOP,
      COMMONT,
      EXPAND,
      SHIELD,
      DELPOST,
      BLOCKUSER,
    } = MoreOperatorEnum;
    const handleChangeList = type === SHIELD || type === DELPOST;
    let arr = [];

    if (
      type === FOLLOW ||
      type === CANCEL_FOLLOW ||
      type === SETTOP ||
      type === CANCEL_SETTOP ||
      // type === COMMONT ||
      type === BLOCKUSER
    ) {
      setIsEnd(false);
      init(1);
      return;
    }

    // 折叠
    if (type === EXPAND) return setNonce(prep => prep + 1);
    state.list.forEach((item: any) => {
      let obj = item;
      if (item.id === newItem.id) {
        obj = { ...newItem.post };
      }
      if (item.id === newItem.id && handleChangeList) {
        // 屏蔽、删除
      } else {
        arr.push(obj);
      }
    });
    setState(p => {
      p.list = [...arr];
    });
    if (handleChangeList) {
      setNonce(prep => prep + 1);
    }
  };
  const followUser = async (focus_uid: number) => {
    try {
      const res = await Api.MeApi.followUser(focus_uid);
      if (Api.isSuccess(res)) {
        init(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 取消关注
  const unFollowRequest = async item => {
    try {
      const res = await Api.MeApi.unFollowUser(item.uid);
      if (Api.isSuccess(res)) {
        setFollowState(p => {
          p.cancelFollow = false;
        });
        init(1);
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    init(1);
  }, [uid]);

  // 添加事件监听，用于更新状态
  const updateProfile = useCallback(() => init(1), [uid, page, perpage]);
  React.useEffect(() => {
    eventBus.addEventListener('updateProfile', updateProfile);
    return () => {
      eventBus.removeEventListener('updateProfile', updateProfile);
    };
  }, [updateProfile]);

  const locationDisplay = React.useMemo(() => {
    const defaultCountry = country?.find(item => item.ID === profile.location);
    return currentLanguage.locale === EN.locale
      ? defaultCountry?.LocationEn
      : defaultCountry?.LocaltionZh;
  }, [country, profile.location]);

  return (
    <Center>
      <Crumbs title={t('meHome')} back={Number(uid) !== currentUid.uid} />
      <ProfileCard isBoxShadow>
        <HeadTop
          style={{
            backgroundImage: `url(${profile.background_image})`,
          }}
        >
          {!profile.background_image && (
            <ComponentsWrapper>
              <CommonCircle
                width='18rem'
                height='18rem'
                margin='-9rem 0 0 -9rem'
                bgWidth='48rem'
                bgHeight='19rem'
                bgMargin='-6rem 0 0 -23rem'
                isAnimation
              >
                <CenterImg
                  width='250px'
                  height='250px'
                  src={
                    require(isDark
                      ? 'assets/images/logo.svg'
                      : 'assets/images/light_logo.svg').default
                  }
                />
              </CommonCircle>
            </ComponentsWrapper>
          )}
        </HeadTop>
        <ProfileInfo>
          <Info>
            <Flex alignItems='flex-end' style={{ flex: 1 }}>
              <Avatar
                disableFollow
                scale={isMobile ? 'ld' : 'xl'}
                src={profile.nft_image}
              />
              <ProfileDesc className='show-media-sm' profile={profile} />
            </Flex>
            {!uid || Number(uid) === currentUid.uid ? (
              <>
                <Button as={Link} to='/me/edit'>
                  {t('meEditProfile')}
                </Button>
                {/* <Button onClick={() => { signOut() }}>
                  {t('退出账号')}
                </Button> */}
              </>
            ) : (
              <Flex alignItems='center'>
                <FollowButtonBox>
                  <FollowButton
                    data={FollowData}
                    followFunc={debounce(() => followUser(uid), 1000)}
                    unFollowFunc={() =>
                      setFollowState(p => {
                        p.cancelParams = {
                          uid,
                          address: profile.address,
                          nft_image: profile.nft_image,
                        };
                        p.cancelFollow = true;
                      })
                    }
                  />
                </FollowButtonBox>
                <Popup user={profile} onCallback={() => init(1)} />
              </Flex>
            )}
          </Info>
          <Content>
            <ProfileDesc className='hide-media-sm' profile={profile} />
            <Box className='desc'>
              <Text className='text' style={{ wordBreak: 'break-word' }}>
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
            <Flex className='number'>
              <Text
                as={Boolean(uid) && profile.allow_watch_fans === 1 ? Link : ''}
                to={`/me/user/fans?uid=${uid}`}
                className='text'
              >
                {t('meFans')}
                <Text className='value'>{profile.fans_num}</Text>
              </Text>
              <Text
                as={
                  Boolean(uid) && profile.allow_watch_attention === 1
                    ? Link
                    : ''
                }
                to={`/me/user/follow?uid=${uid}`}
                className='text'
              >
                {t('meFollow')}
                <Text className='value'>{profile.attention_num}</Text>
              </Text>
              <Text className='text'>
                {t('meDynamic')}
                <Text className='value'>{profile.post_num}</Text>
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
          if (loading || isEnd) return false;
          init();
        }}
      >
        {list.map((item, index) => (
          <MeItemWrapper key={`${item.id}+${index}`}>
            {
              // 浏览自己的不扣费
              currentUid?.uid !== item.user_id && (
                <SpendTimeViewWithArticle
                  nonce={nonce}
                  setNonce={setNonce}
                  readType={ReadType.ARTICLE}
                  articleId={item.id}
                />
              )
            }
            <MentionItem
              {...props}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id,
                },
              }}
              postUid={uid}
              callback={(data, type) => {
                // if (_type === MoreOperatorEnum.EXPAND) {
                //   setNonce(prep => prep + 1);
                //   return;
                // }
                // init(1);
                updateList(data, type);
              }}
            />
            <MentionOperator
              replyType='twitter'
              type='Article'
              postId={item.id}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id,
                },
              }}
              callback={(data, type) => {
                // if (_type === MoreOperatorEnum.EXPAND) {
                //   setNonce(prep => prep + 1);
                //   return;
                // }
                // init(1);
                updateList(data, type);
              }}
            />
          </MeItemWrapper>
        ))}
      </List>
      <CancelAttentionModal
        title={t('meUnsubscribeTips')}
        show={FollowState.cancelFollow}
        params={FollowState.cancelParams}
        confirm={debounce(
          () => unFollowRequest(FollowState.cancelParams),
          1000,
        )}
        onClose={() =>
          setFollowState(p => {
            p.cancelFollow = false;
          })
        }
      />
      <SendPost />
    </Center>
  );
};

export default Profile;
