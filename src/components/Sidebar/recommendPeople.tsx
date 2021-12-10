import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useImmer } from 'use-immer';
import { useTranslation } from 'contexts/Localization';
import { shortenAddress } from 'utils/contract';
import { Flex, Card, Text } from 'uikit';
import { Avatar, FollowButton, CancelAttentionModal } from 'components';
import { useToast } from 'hooks';
import { Api } from 'apis';

const RecommendPeopleBox = styled(Card)`
  width: 300px;
  margin-top: 15px;
  padding: 20px 18px;
`;
const TitleText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
`;
const MoreBtn = styled.span`
  font-size: 14px;
  color: #7393ff;
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
  font-size: 18px;
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

type Iprops = {};

const RecommendPeople: React.FC<Iprops> = props => {
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const [isInit, setIsInit] = useState(true);
  const [state, setState] = useImmer({
    list: [] as any,
    cancelFollow: false,
    cancelParams: {
      uid: 0,
      address: '',
      nft_image: ''
    }
  });
  const { list } = state;

  useEffect(() => {
    getManList();
  }, []);

  const getCurrentState = async () => {
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
        console.log(followTemp);
        setState(p => {
          p.list = followTemp;
          p.cancelFollow = false;
        });
      }
    } catch (error) {}
  };

  const getManList = async () => {
    try {
      const res = await Api.UserApi.referrerMans({ num: 3 });
      if (Api.isSuccess(res)) {
        setIsInit(true);
        setState(p => {
          p.list = res.data || [];
        });
      }
    } catch (error) {}
  };

  // 关注用户
  const followRequest = async (focus_uid: number, index: number) => {
    const res = await Api.AttentionApi.onAttentionFocus(focus_uid);
    if (Api.isSuccess(res)) {
      getCurrentState();
      toastSuccess(t('commonMsgFollowSuccess') || res.data);
    } else {
      toastError(res.data);
    }
  };

  // 取消关注
  const unFollowRequest = async item => {
    try {
      const res = await Api.MeApi.unFollowUser(item.uid);
      if (Api.isSuccess(res)) {
        getCurrentState();
        toastSuccess(t('commonMsgFollowError') || res.data);
      } else {
        toastError(t('commonMsgUnFollowError') || res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    isInit &&
    state.list.length > 0 && (
      <RecommendPeopleBox isBoxShadow isRadius>
        <Flex justifyContent="space-between" alignItems="center">
          <TitleText>{t('recommendPeopleTitle')}</TitleText>
          <MoreBtn onClick={getManList}>{t('moreText')}</MoreBtn>
        </Flex>
        {state.list.map((item, index) => (
          <Flex
            key={`${item.uid}_${index}`}
            alignItems="center"
            justifyContent="space-between"
            mt="17px"
          >
            <Flex
              as={Link}
              to={`/me/profile/${item.uid}`}
              style={{ flex: 1, alignItems: 'center' }}
            >
              <Avatar src={item.nft_image} scale="sm" />
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
          </Flex>
        ))}

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
