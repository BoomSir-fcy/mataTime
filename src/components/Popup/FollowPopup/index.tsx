import React, { useState, useEffect, useRef } from 'react';
import { Icon, Avatar, MoreOperatorEnum } from 'components';
import { Link } from 'react-router-dom';
import useTheme from 'hooks/useTheme';
import { toast } from 'react-toastify';
import { useStore } from 'store';
import { Flex, Text, useTooltip } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { shortenAddress } from 'utils/contract';

import { PopupWrapper, PopupContentWrapper } from './style';

import { FollowBtn } from 'view/News/components/MentionItem/style';

import { Api } from 'apis';
import client from 'utils/client';
import { useUserInfoById } from 'store/mapModule/hooks';
import { useDispatch } from 'react-redux';
import { fetchUserInfoAsync } from 'store/mapModule/reducer';

type Iprops = {
  children: React.ReactElement;
  uid?: number | string;
  callback?: Function;
};

export const FollowPopup = React.memo((props: Iprops) => {
  const { t } = useTranslation();
  const myself = useStore(p => p.loginReducer.userInfo);
  const { children, uid, callback = () => {} } = props;
  const [visible, setVisible] = useState<boolean>(false);
  // const [userInfo, setUserInfo] = useState<any>({});
  const { theme } = useTheme();

  const userInfo = useUserInfoById(uid);

  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(fetchUserInfoAsync(uid));
  // }, [uid, dispatch]);

  // 关注用户
  const onAttentionFocusRequest = async () => {
    const res = await Api.AttentionApi.onAttentionFocus(uid);
    if (Api.isSuccess(res)) {
      toast.success(t('commonMsgFollowSuccess') || res.data);
      // getUserInfo();
      dispatch(fetchUserInfoAsync(uid));
      callback(MoreOperatorEnum.FOLLOW);
    } else {
      toast.error(res.data);
    }
  };

  // 取消关注用户
  const cancelAttentionFocusRequest = async () => {
    const res = await Api.AttentionApi.cancelAttentionFocus(uid);
    if (Api.isSuccess(res)) {
      toast.success(t('commonMsgUnFollowSuccess') || res.data);
      dispatch(fetchUserInfoAsync(uid));
      callback(MoreOperatorEnum.CANCEL_FOLLOW);
    } else {
      toast.error(res.data);
    }
  };

  // const [timer, setTimer] = useState(null)
  let timer = null;

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <PopupContentWrapper>
      <Link
        className='content'
        to={userInfo?.uid ? `/me/profile/${userInfo?.uid}` : undefined}
      >
        <div className='left-box'>
          <div className='img-box'>
            <Avatar
              disableFollow
              className='avatar'
              src={userInfo?.nft_image || userInfo?.NftImage || '  '}
              scale='md'
            />
          </div>
        </div>
        <div className='right-box'>
          <Text className='name' ellipsis>
            {userInfo?.NickName || userInfo?.nick_name || '  '}
          </Text>
          <div className='des'>{shortenAddress(userInfo?.address)}</div>
          <div className='number'>
            <Flex className='cloums'>
              {t('followFans')}
              <Text
                fontWeight='bold'
                color='white'
                ml='10px'
                // maxWidth='30px'
                // ellipsis
              >
                {userInfo?.fans_num || 0}
              </Text>
            </Flex>
            <Flex className='cloums'>
              {t('followText')}
              <Text
                fontWeight='bold'
                color='white'
                ml='10px'
                // maxWidth='30px'
                // ellipsis
              >
                {userInfo?.attention_num || 0}
              </Text>
            </Flex>
          </div>
        </div>
      </Link>
      {myself.uid !== uid && (
        <div className='btn'>
          <FollowBtn
            onClick={(e: any) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation(); //阻止冒泡
              userInfo?.is_attention === 1
                ? cancelAttentionFocusRequest()
                : onAttentionFocusRequest();
            }}
          >
            {userInfo?.is_attention === 1
              ? t('followCancelText')
              : '+' + t('followText')}
          </FollowBtn>
        </div>
      )}
    </PopupContentWrapper>,
    {
      placement: 'top-start',
      trigger: client.isApp ? 'click' : 'hover',
      invert: false,
      stylePadding: '0',
      background: theme.colors.tertiary,
      tooltipPadding: 0,
    },
  );

  useEffect(() => {
    if (uid && tooltipVisible) {
      dispatch(fetchUserInfoAsync(uid));
    }
  }, [dispatch, tooltipVisible, uid]);

  return (
    <PopupWrapper onClick={e => e.stopPropagation()}>
      {tooltipVisible && tooltip}
      <span ref={targetRef}>{children}</span>
    </PopupWrapper>
  );
});

type IDprops = {
  left?: number;
  top?: number;
  uid: number | string;
  callback?: Function;
};
