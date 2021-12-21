import React, { useState, useEffect, useRef } from 'react';
import { Icon, Avatar, MoreOperatorEnum } from 'components';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStore } from 'store';
import { Flex, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { shortenAddress } from 'utils/contract';

import { PopupWrapper, PopupContentWrapper } from './style';

import { FollowBtn } from 'view/News/components/MentionItem/style';

import { Api } from 'apis';

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
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    if (uid) {
      visible && getUserInfo();
    }
  }, [visible]);

  // 获取个人信息
  const getUserInfo = async () => {
    const res = await Api.UserApi.getUserInfoByUID(uid);
    if (Api.isSuccess(res)) {
      setUserInfo(res.data);
    }
  };

  // 关注用户
  const onAttentionFocusRequest = async () => {
    const res = await Api.AttentionApi.onAttentionFocus(uid);
    if (Api.isSuccess(res)) {
      toast.success(res.data);
      getUserInfo();
      callback(MoreOperatorEnum.CANCEL_FOLLOW);
    } else {
      toast.error(res.data);
    }
  };

  // 取消关注用户
  const cancelAttentionFocusRequest = async () => {
    const res = await Api.AttentionApi.cancelAttentionFocus(uid);
    if (Api.isSuccess(res)) {
      toast.success(res.data);
      getUserInfo();
      callback(MoreOperatorEnum.CANCEL_FOLLOW);
    } else {
      toast.error(res.data);
    }
  };

  // const [timer, setTimer] = useState(null)
  let timer = null;

  return (
    <PopupWrapper
      onClick={e => e.stopPropagation()}
      onMouseOver={(e: any) => {
        if (timer) {
          clearTimeout(timer);
        }
        e.nativeEvent.stopImmediatePropagation(); //阻止冒泡
        setVisible(true);
      }}
      onMouseLeave={(e: any) => {
        e.nativeEvent.stopImmediatePropagation(); //阻止冒泡
        timer = setTimeout(() => {
          setVisible(false);
        }, 300);
      }}
    >
      {children}
      {visible ? (
        <PopupContentWrapper>
          <Link className='content' to={`/me/profile/${userInfo.uid}`}>
            <div className='left-box'>
              <div className='img-box'>
                <Avatar
                  className='avatar'
                  src={userInfo.nft_image || userInfo.NftImage || '  '}
                  scale='md'
                />
              </div>
            </div>
            <div className='right-box'>
              <Text className='name' ellipsis>
                {userInfo.NickName || userInfo.nick_name || '  '}
              </Text>
              <div className='des'>{shortenAddress(userInfo.address)}</div>
              <div className='number'>
                <Flex className='cloums'>
                  {t('followFans')}
                  <Text
                    fontWeight='bold'
                    color='white'
                    ml='10px'
                    maxWidth='30px'
                    ellipsis
                  >
                    {userInfo.fans_num || 0}
                  </Text>
                </Flex>
                <Flex className='cloums'>
                  {t('followText')}
                  <Text
                    fontWeight='bold'
                    color='white'
                    ml='10px'
                    maxWidth='30px'
                    ellipsis
                  >
                    {userInfo.attention_num || 0}
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
                  userInfo.is_attention === 1
                    ? cancelAttentionFocusRequest()
                    : onAttentionFocusRequest();
                }}
              >
                {userInfo.is_attention === 1
                  ? t('followCancelText')
                  : '+' + t('followText')}
              </FollowBtn>
            </div>
          )}
        </PopupContentWrapper>
      ) : null}
    </PopupWrapper>
  );
});

type IDprops = {
  left?: number;
  top?: number;
  uid: number | string;
  callback?: Function;
};

export const FollowPopupD = React.memo((props: IDprops) => {
  const { t } = useTranslation();
  const { left = 100, top = 100, callback = () => {}, uid } = props;
  const popupRef: any = useRef();
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    handleMouseOut();
  }, []);

  useEffect(() => {
    uid && getUserInfo();
  }, [uid]);

  // 获取个人信息
  const getUserInfo = async () => {
    const res = await Api.UserApi.getUserInfoByUID('167004880' || uid);
    if (Api.isSuccess(res)) {
      setUserInfo(res.data);
    }
  };

  // 关注用户
  const onAttentionFocusRequest = async () => {
    const res = await Api.AttentionApi.onAttentionFocus('167004880' || uid);
    if (Api.isSuccess(res)) {
      toast.success(res.data);
      getUserInfo();
    } else {
      toast.error(res.data);
    }
  };

  // 取消关注用户
  const cancelAttentionFocusRequest = async () => {
    const res = await Api.AttentionApi.cancelAttentionFocus('167004880' || uid);
    if (Api.isSuccess(res)) {
      toast.success(res.data);
      getUserInfo();
    } else {
      toast.error(res.data);
    }
  };

  // 鼠标移开
  const handleMouseOut = () => {
    popupRef.current.addEventListener('mouseleave', (e: any) => {
      callback();
    });
  };

  return (
    <PopupContentWrapper
      id={'pop-content-box'}
      ref={popupRef}
      style={{
        left: left + 'px',
        top: top + 'px',
        boxShadow: 'none',
        position: 'fixed'
      }}
    >
      <div className='content'>
        <div className='left-box'>
          <div className='img-box'>
            <Avatar
              className='avatar'
              src={userInfo.NftImage || '  '}
              scale='md'
            />
          </div>
        </div>
        <div className='right-box'>
          <div className='name'>{userInfo.NickName || '  '}</div>
          <div className='des'>
            <Icon name={'icon-dunpai'} color={'#85C558'}></Icon> @0x32...9239
          </div>
          <div className='number'>
            <p>
              {t('followFans')}
              <strong>{userInfo.FansNum || 0}</strong>
            </p>
            <p>
              {t('followText')}
              <strong>{userInfo.AttentionNum || 0}</strong>
            </p>
          </div>
        </div>
      </div>
      <div className='btn'>
        <FollowBtn
          onClick={() => {
            userInfo.IsAttention === 1
              ? cancelAttentionFocusRequest()
              : onAttentionFocusRequest();
          }}
        >
          {userInfo.IsAttention === 1
            ? t('followCancelText')
            : '+' + t('followText')}
        </FollowBtn>
      </div>
    </PopupContentWrapper>
  );
});
