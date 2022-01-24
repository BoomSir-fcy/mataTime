import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import Popup from 'reactjs-popup';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  FollowPopup,
  MorePopup,
  Icon,
  Avatar,
  MoreOperatorEnum,
  ImgList,
  // FollowPopupD,
  ContentParsing,
  MorePostPopup,
  ShiledUserModal,
} from 'components';
import { Box, Flex, Text, Button } from 'uikit';
import { shortenAddress } from 'utils/contract';
import { displayTime } from 'utils';

import { useTranslation } from 'contexts/Localization';

import { MentionItemWrapper, MentionItemUserWrapper } from './style';

import moreIcon from 'assets/images/social/more.png';
import { useStore } from 'store';
import dayjs from 'dayjs';

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;

type IProps = {
  more?: boolean;
  size?: string;
  dontShowPic?: boolean;
  postUid?: string;
  itemData: any;
  [propName: string]: any;
  callback?: Function;
};

const MentionItem: React.FC<IProps> = props => {
  const {
    children,
    dontShowPic,
    postUid,
    size = 'nomal',
    itemData = {},
    callback = () => {},
  } = props;
  const mentionRef: any = useRef();
  const { push } = useHistory();
  const { pathname, ...location } = useLocation();

  const [position, setPosition] = useState([-999, -999]);
  const [uid, setUid] = useState<string | number>(0);

  /**
   * @review
   * 没看到有实际作用(除了浪费性能)
   * 我没删，因为懒
   */
  useEffect(() => {
    handleUserHover();
  }, []);

  // 用户hover
  const handleUserHover = () => {
    const user: any[] = mentionRef.current.getElementsByClassName('user-dom');
    Array.from(user).forEach((dom: any) => {
      dom.addEventListener('mouseenter', (e: any) => {
        const uid = dom.getAttribute('data-uid');
        if (uid) {
          setUid(Math.random());
          setPosition([e.clientX, e.clientY]);
        }
      });
    });
  };

  const goDetils = () => {
    // XXX: 总感觉这样写有问题
    if (pathname.includes('articleDetils')) return;
    push(`/articleDetils/${itemData.post_id || itemData.id}`);
  };

  return (
    <MentionItemWrapper ref={mentionRef}>
      <MentionItemUser
        more={props.more}
        size={size}
        itemData={itemData}
        postUid={postUid}
        callback={(data: any, type: MoreOperatorEnum) => {
          callback(data, type);
        }}
      />
      <Box
        className='mention-content'
        onClick={() => {
          goDetils();
        }}
      >
        <ContentParsing
          {...props}
          content={itemData.content}
          callback={(type: MoreOperatorEnum) => {
            callback(itemData, type);
          }}
        />
        {!dontShowPic && (
          <ImgList list={itemData.image_list || itemData.image_url_list} />
        )}
      </Box>
      {children}
      {/* 关注提示 */}
      {/* <FollowPopupD
        uid={uid}
        left={position[0]}
        top={position[1]}
        callback={() => {
          setPosition([-999, -999]);
        }}
      /> */}
    </MentionItemWrapper>
  );
};

type UserProps = {
  more?: boolean;
  size?: string;
  postUid?: string;
  itemData?: any;
  callback?: (event: any, type?: any) => void;
};

export const MentionItemUser: React.FC<UserProps> = ({
  more = true,
  size = 'nomal',
  postUid,
  itemData = {},
  callback,
}) => {
  const popupRef = React.useRef(null);
  const theme = useTheme();
  const { pathname } = useLocation();
  const uid = useStore(p => p.loginReducer.userInfo.uid);
  const { t } = useTranslation();
  const [isShileUser, setIsShileUser] = React.useState(false);

  const relativeTime = useCallback(() => {
    const time = itemData.add_time || itemData.post_time;
    if (pathname.includes('articleDetils')) {
      return dayjs(time).format('YY-MM-DD HH:mm');
    }
    return displayTime(time);
  }, [itemData, pathname]);
  return (
    <MentionItemUserWrapper>
      <div className={`user-wrapper ${size}-user`}>
        <div className='user-left-wrapper'>
          <Box minWidth='50px'>
            <Link to={'/me/profile/' + (itemData.uid || itemData.user_id)}>
              <Avatar
                uid={itemData.uid || itemData.user_id}
                className='avatar'
                src={itemData.user_avator_url}
                callback={type => {
                  callback(
                    {
                      ...itemData,
                      is_attention: type === 'CANCEL_FOLLOW' ? 0 : 1,
                    },
                    type,
                  );
                }}
                scale='md'
              />
            </Link>
          </Box>
          <div className='user-info'>
            <div>
              <Text ellipsis className='user-name'>
                {itemData.user_name || itemData.nick_name}
              </Text>
              <Text color='textTips' className='time'>
                <span>@{shortenAddress(itemData.user_address)}</span>
                {relativeTime()}
              </Text>
            </div>
          </div>
        </div>
        {more && (
          <div className='user-right-wrapper'>
            {/* <MorePopup
              data={itemData}
              callback={(data: any, type: MoreOperatorEnum) => {
                callback(data, type);
              }}
            >
              <img src={moreIcon} alt="more" />
            </MorePopup> */}
            {itemData.uid !== uid && itemData.user_id !== uid && (
              <Button
                onClick={() => setIsShileUser(!isShileUser)}
                variant='text'
                className='icon-shield'
                mr='18px'
                padding='0'
                title={t('popupShieldUser')}
              >
                <Icon color='white_black' name='icon-pingbi2' />
              </Button>
            )}
            <Popup
              ref={popupRef}
              trigger={
                <PopupButton title={t('popupMore')}>
                  {/* <img src={moreIcon} alt='more' /> */}
                  <Icon name='icon-gengduo' size={20} color='white_black' />
                </PopupButton>
              }
              nested
              position='bottom right'
              closeOnDocumentClick
              contentStyle={{
                width: '150px',
                height: 'auto',
                borderRadius: '10px',
                padding: 0,
                border: '0',
                backgroundColor: 'transparent',
                zIndex: 99,
              }}
              overlayStyle={{
                zIndex: 98,
              }}
              arrowStyle={{
                color: theme.colors.tertiary,
                stroke: theme.colors.tertiary,
              }}
            >
              <MorePostPopup
                postUid={postUid}
                data={itemData}
                callback={(data: any, type) => {
                  if (type === MoreOperatorEnum.BLOCKUSER) {
                    setIsShileUser(!isShileUser);
                    return;
                  }
                  popupRef?.current?.close();
                  callback(data, type);
                }}
              />
            </Popup>
          </div>
        )}
      </div>
      <ShiledUserModal
        userinfo={itemData}
        visible={isShileUser}
        callback={(data, type) => callback(data, type)}
        onClose={() => setIsShileUser(!isShileUser)}
      />
    </MentionItemUserWrapper>
  );
};

export default MentionItem;
