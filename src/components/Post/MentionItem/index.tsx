import React, { useState, useEffect, useRef } from 'react';
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
} from 'components';
import { Box, Flex, Text } from 'uikit';
import { shortenAddress } from 'utils/contract';
import { relativeTime } from 'utils';

import { MentionItemWrapper, MentionItemUserWrapper } from './style';

import moreIcon from 'assets/images/social/more.png';

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;

type MentionItemProps = {
  more?: boolean;
  size?: string;
  dontShowPic?: boolean;
  postUid?: string;
  itemData: any;
  [propName: string]: any;
  callback?: Function;
};

const MentionItem: React.FC<MentionItemProps> = ({
  children,
  dontShowPic,
  postUid,
  more,
  size = 'nomal',
  itemData = {},
  callback = () => {},
}) => {
  const mentionRef: any = useRef();
  const { push } = useHistory();
  const { pathname } = useLocation();

  const goDetils = () => {
    // XXX: 总感觉这样写有问题
    if (pathname.includes('articleDetils')) return;
    push(`/articleDetils/${itemData.post_id || itemData.id}`);
  };

  return (
    <MentionItemWrapper ref={mentionRef}>
      <MentionItemUser
        more={more}
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
                {relativeTime(itemData.add_time || itemData.post_time)}
              </Text>
            </div>
          </div>
        </div>
        {more && (
          <div className='user-right-wrapper'>
            <Popup
              ref={popupRef}
              trigger={
                <PopupButton>
                  <img src={moreIcon} alt='more' />
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
                  popupRef?.current?.close();
                  callback(data, type);
                }}
              />
            </Popup>
          </div>
        )}
      </div>
    </MentionItemUserWrapper>
  );
};

export default MentionItem;
