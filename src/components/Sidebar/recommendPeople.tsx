import React, { useState, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useImmer } from 'use-immer';
import { useTranslation } from 'contexts/Localization';
import { shortenAddress } from 'utils/contract';
import { Flex, Card, Box, Text } from 'uikit';
import { Avatar, FollowButton, CancelAttentionModal, Icon } from 'components';
import { useToast } from 'hooks';
import { Api } from 'apis';
import RefreshIcon from 'components/Loader/RefreshIcon';
import eventBus from 'utils/eventBus';

const RecommendPeopleBox = styled(Card)`
  width: 300px;
  margin-top: 15px;
  padding: 20px 0;
`;
const TitleText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
`;
const MoreBtn = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
`;
const UserInfo = styled(Flex)`
  min-width: 0;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 12px;
`;
export const UserTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.white_black};
  width: 100px;
  min-width: 0;
  font-size: 14px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export const UserDesc = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textTips};
  overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
`;

const HeadAction = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  transition: all 0.1s ease-out;
  padding: 0 18px;
  .rotate {
    transform: rotate(90deg);
  }
  i {
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Content = styled(Flex)`
  padding: 0 18px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverList};
  }
`;

const EmptyContent = styled(Flex)`
  padding-top: 20px;
  justify-content: center;
  align-content: center;
`;

type Iprops = {};

const RecommendPeople: React.FC<Iprops> = props => {
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const [isInit, setIsInit] = useState(true);
  const [state, setState] = useImmer({
    list: [] as any,
    isRotate: false,
    cancelFollow: false,
    cancelParams: {
      uid: 0,
      address: '',
      nft_image: '',
    },
  });
  const { list } = state;
  const theme = useTheme();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getManList();
  }, []);

  useEffect(() => {
    if (state.isRotate) {
      getManList();
    }
  }, [state.isRotate]);

  const getCurrentState = useCallback(
    async (data?: any) => {
      if (data?.data && !list.some(({ uid }) => uid === data?.data)) {
        return false;
      }

      const uids = list.map(({ uid }) => uid);
      try {
        const res = await Api.AttentionApi.getFollowState(uids);
        if (Api.isSuccess(res)) {
          const considerFocus = res.data;
          const followTemp = list.map(row => {
            if (considerFocus[row.uid]) {
              return { ...row, attention_status: 1 };
            }
            return { ...row, attention_status: 0 };
          });
          setState(p => {
            p.list = followTemp;
            p.cancelFollow = false;
          });
        }
      } catch (error) {}
    },
    [list],
  );

  // 添加事件监听，用于更新状态
  useEffect(() => {
    eventBus.addEventListener('updateFollowState', getCurrentState);
    return () => {
      eventBus.removeEventListener('updateFollowState', getCurrentState);
    };
  }, [getCurrentState]);

  const getManList = async () => {
    try {
      setRefresh(true);
      const res = await Api.UserApi.referrerMans({ num: 3 });
      if (Api.isSuccess(res)) {
        setIsInit(true);
        setState(p => {
          p.list = res.data || [];
          p.isRotate = false;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefresh(false);
    }
  };

  // 关注用户
  const followRequest = async (focus_uid: number, index: number) => {
    const res = await Api.AttentionApi.onAttentionFocus(focus_uid);
    if (Api.isSuccess(res)) {
      getCurrentState();
      eventBus.dispatchEvent(new MessageEvent('updateProfile'));
      // toastSuccess(t('commonMsgFollowSuccess') || res.data);
    }
  };

  // 取消关注
  const unFollowRequest = async item => {
    try {
      const res = await Api.MeApi.unFollowUser(item.uid);
      if (Api.isSuccess(res)) {
        getCurrentState();
        eventBus.dispatchEvent(new MessageEvent('updateProfile'));
        // toastSuccess(t('commonMsgFollowError') || res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    isInit && (
      <RecommendPeopleBox isBoxShadow isRadius>
        <HeadAction>
          <TitleText>{t('recommendPeopleTitle')}</TitleText>
          <Box>
            <RefreshIcon
              margin='0'
              // refresh={refresh}
              onClick={() => getManList()}
              color={theme.colors.white_black}
            />
          </Box>
          {/* <MoreBtn onClick={getManList}>{t('moreText')}</MoreBtn> */}
        </HeadAction>
        {state.list.map((item, index) => (
          <Content
            key={`${item.uid}_${index}`}
            alignItems='center'
            justifyContent='space-between'
            mt='17px'
          >
            <Flex
              as={Link}
              to={`/me/profile/${item.uid}`}
              style={{ flex: 1, alignItems: 'center' }}
            >
              <Avatar
                uid={item.uid}
                src={item.nft_image}
                scale='sm'
                callback={type => getCurrentState()}
              />
              <UserInfo>
                <UserTitle>{item.nick_name}</UserTitle>
                <UserDesc>{shortenAddress(item.address)}</UserDesc>
              </UserInfo>
            </Flex>
            <FollowButton
              key={index}
              data={item}
              followFunc={debounce(() => followRequest(item.uid, index), 1000)}
              unFollowFunc={() =>
                setState(p => {
                  p.cancelParams = { ...item, index };
                  p.cancelFollow = true;
                })
              }
            />
          </Content>
        ))}

        {state.list.length <= 0 && (
          <EmptyContent>
            <Text>{t('noRecommendations')}</Text>
          </EmptyContent>
        )}

        <CancelAttentionModal
          title={t('meUnsubscribeTips')}
          show={state.cancelFollow}
          params={state.cancelParams}
          confirm={debounce(() => unFollowRequest(state.cancelParams), 1000)}
          onClose={() =>
            setState(p => {
              p.cancelFollow = false;
            })
          }
        />
      </RecommendPeopleBox>
    )
  );
};

export default RecommendPeople;
