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
  FollowPopupD,
  ContentParsing,
  MorePostPopup
} from 'components';
import { Box, Flex, Text } from 'uikit';
import { shortenAddress } from 'utils/contract';
import { relativeTime } from 'utils';

import { MentionItemWrapper, MentionItemUserWrapper } from './style';

import commentIcon from 'assets/images/social/comment.png';
import moreIcon from 'assets/images/social/more.png';

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;

type IProps = {
  more?: boolean;
  size?: string;
  dontShowPic?: boolean;
  itemData: any;
  [propName: string]: any;
  callback?: Function;
};

const MentionItem: React.FC<IProps> = props => {
  const {
    children,
    dontShowPic,
    size = 'nomal',
    itemData = {},
    callback = () => { }
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
        console.log('mouseenter:', dom);
        console.log('e:', e);
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
        callback={(data: any, type: MoreOperatorEnum) => {
          callback(data, type);
        }}
      />
      <Box
        className="mention-content"
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
      <FollowPopupD
        uid={uid}
        left={position[0]}
        top={position[1]}
        callback={() => {
          setPosition([-999, -999]);
        }}
      />
    </MentionItemWrapper>
  );
};

type UserProps = {
  more?: boolean;
  size?: string;
  itemData?: any;
  callback?: (event: any, type?: any) => void;
};

export const MentionItemUser: React.FC<UserProps> = ({
  more = true,
  size = 'nomal',
  itemData = {},
  callback
}) => {
  const popupRef = React.useRef(null);
  const theme = useTheme();

  return (
    <MentionItemUserWrapper>
      <div className={`user-wrapper ${size}-user`}>
        <div className="user-left-wrapper">
          <Link to={'/me/profile/' + (itemData.uid || itemData.user_id)}>
            <Avatar
              className="avatar"
              src={itemData.user_avator_url}
              scale="md"
            />
          </Link>
          <div className="user-info">
            <div>
              <Text className="user-name">
                {itemData.user_name || itemData.nick_name}
              </Text>
              <Text color="textTips" className="time">
                <span>@{shortenAddress(itemData.user_address)}</span>
                {relativeTime(itemData.add_time || itemData.post_time)}
              </Text>
            </div>
          </div>
        </div>
        {more && (
          <div className="user-right-wrapper">
            {/* <MorePopup
              data={itemData}
              callback={(data: any, type: MoreOperatorEnum) => {
                callback(data, type);
              }}
            >
              <img src={moreIcon} alt="more" />
            </MorePopup> */}
            <Popup
              ref={popupRef}
              trigger={
                <PopupButton>
                  <img src={moreIcon} alt="more" />
                </PopupButton>
              }
              nested
              position="bottom center"
              closeOnDocumentClick
              contentStyle={{
                width: '150px',
                height: 'auto',
                borderRadius: '10px',
                padding: 0,
                border: '0',
                backgroundColor: 'transparent',
                zIndex: 99
              }}
              overlayStyle={{
                zIndex: 98
              }}
              arrowStyle={{
                color: theme.colors.tertiary,
                stroke: theme.colors.tertiary
              }}
            >
              <MorePostPopup
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
