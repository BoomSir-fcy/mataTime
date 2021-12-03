import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FollowPopup,
  MorePopup,
  Icon,
  Avatar,
  MoreOperatorEnum,
  ImgList,
  FollowPopupD,
  ContentParsing
} from 'components';
import { Box, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { shortenAddress } from 'utils/contract';
import { relativeTime } from 'utils/timeFormat';

import { Api } from 'apis';

import { MentionItemWrapper, MentionItemUserWrapper, FollowBtn } from './style';

import commentIcon from 'assets/images/social/comment.png';
import moreIcon from 'assets/images/social/more.png';

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
    callback = () => {}
  } = props;
  const mentionRef: any = useRef();

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
    if (props?.match?.path === '/articleDetils/:id') return;
    props.history.push('/articleDetils/' + itemData.post_id || itemData.id);
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
  callback?: Function;
};

export const MentionItemUser: React.FC<UserProps> = ({
  more = true,
  size = 'nomal',
  itemData = {},
  callback = () => {}
}) => {
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
                {itemData.add_time_desc || itemData.post_time_desc}
              </Text>
            </div>
          </div>
        </div>
        {more && (
          <div className="user-right-wrapper">
            <MorePopup
              data={itemData}
              callback={(data: any, type: MoreOperatorEnum) => {
                callback(data, type);
              }}
            >
              <img src={moreIcon} alt="more" />
            </MorePopup>
          </div>
        )}
      </div>
    </MentionItemUserWrapper>
  );
};

export default MentionItem;
