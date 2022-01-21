import React from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useStore } from 'store';
import { useToast } from 'hooks';
import { Flex, Text } from 'uikit';
import { Avatar, MoreOperatorEnum } from 'components';
import { Api } from 'apis';

import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';

import { PopupWrapper, FollowContentWrapper } from './FollowPopup/style';

import { FollowBtn } from 'view/News/components/MentionItem/style';
import { useUserInfoById } from 'store/mapModule/hooks';
import { useDispatch } from 'react-redux';
import { fetchUserInfoAsync } from 'store/mapModule/reducer';
import {
  addUnFollowUserId,
  removeUnFollowUserId,
} from 'store/mapModule/actions';

const FollowPopup: React.FC<{
  uid?: number;
  children?: any;
  callback?: (type: string) => void;
}> = React.memo(({ uid, callback }) => {
  const { t } = useTranslation();
  const { toastError, toastSuccess } = useToast();
  // const [userInfo, setUserInfo] = React.useState<any>({});
  const myself = useStore(p => p.loginReducer.userInfo);

  const userInfo = useUserInfoById(uid);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchUserInfoAsync(uid));
  }, [uid, dispatch]);

  // 关注用户
  const onAttentionFocusRequest = async () => {
    const res = await Api.AttentionApi.onAttentionFocus(uid);
    if (Api.isSuccess(res)) {
      dispatch(fetchUserInfoAsync(uid));
      callback(MoreOperatorEnum.CANCEL_FOLLOW);
      dispatch(removeUnFollowUserId(uid));
    } else {
      toastError(res.data);
    }
  };

  // 取消关注用户
  const cancelAttentionFocusRequest = async () => {
    const res = await Api.AttentionApi.cancelAttentionFocus(uid);
    if (Api.isSuccess(res)) {
      dispatch(fetchUserInfoAsync(uid));
      callback(MoreOperatorEnum.CANCEL_FOLLOW);
      dispatch(addUnFollowUserId(uid));
    } else {
      toastError(res.data);
    }
  };

  return (
    <PopupWrapper onClick={evnet => evnet.stopPropagation}>
      <FollowContentWrapper>
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
                  color='text'
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
                  color='text'
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
      </FollowContentWrapper>
    </PopupWrapper>
  );
});

const TooltipWrapRef = (props, ref) => {
  React.useImperativeHandle(ref, () => ({}));

  const changeStatus = (type: string) => {
    props.callback(type);
  };

  return (
    <Popup
      trigger={props.trigger}
      position='bottom left'
      on={['hover']}
      contentStyle={{
        width: '300px',
        height: 'auto',
        borderRadius: '10px',
        padding: 0,
        border: '0',
        backgroundColor: 'transparent',
        zIndex: 99,
      }}
      arrowStyle={{
        opacity: '0',
      }}
    >
      <FollowPopup uid={props.uid} callback={type => changeStatus(type)} />
    </Popup>
  );
};

export const TooltipWraps = React.forwardRef(TooltipWrapRef);
