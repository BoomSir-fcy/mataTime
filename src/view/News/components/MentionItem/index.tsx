import React, { useState, useEffect, useRef } from 'react';
import commentIcon from 'assets/images/social/comment.png';
import moreIcon from 'assets/images/social/more.png';
import { relativeTime } from 'utils';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
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
import { MentionItemWrapper, MentionItemUserWrapper, FollowBtn } from './style';
import { useTranslation } from 'contexts/Localization';

import { Api } from 'apis';

type IProps = {
  more?: boolean;
  size?: string;
  itemData: any;
  [propName: string]: any;
  callback?: Function;
};

const MentionItem: React.FC<IProps> = props => {
  const {
    children,
    size = 'nomal',
    itemData = {},
    callback = () => { }
  } = props;
  const mentionRef: any = useRef();

  const [position, setPosition] = useState([-999, -999]);
  const [uid, setUid] = useState<string | number>(0);

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

  const goDetils = e => {
    if (props.match.path === '/articleDetils/:id') return;
    props.history.push('/articleDetils/' + itemData.id);
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
      <div
        className="mention-content"
        onClick={e => {
          goDetils(e);
        }}
      >
        <ContentParsing content={itemData.content} callback={(type: MoreOperatorEnum) => {
          callback(itemData, type);
        }}></ContentParsing>
        <ImgList
          list={itemData.image_list || itemData.image_url_list}
        ></ImgList>
      </div>
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
  callback = () => { }
}) => {
  const UID = useSelector((state: any) => state.loginReducer.userInfo.uid);
  const [isOwn, setIsOwn] = useState<boolean>(false);
  const [followShow, setFollowShow] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    init();
  }, []);

  //  初始化
  const init = () => {
    UID === itemData.user_id ? setIsOwn(true) : setIsOwn(false);
  };

  // 关注用户
  const onAttentionFocusRequest = async (focus_uid: number) => {
    const res = await Api.AttentionApi.onAttentionFocus(focus_uid);
    if (Api.isSuccess(res)) {
      toast.success(res.data);
      // callback({
      //   ...itemData,
      //   post: {
      //     ...itemData.post,
      //     is_attention: 0
      //   }
      // });
      // callback()
      callback(itemData, MoreOperatorEnum.FOLLOW)
    } else {
      toast.error(res.data);
    }
  };
  return (
    <MentionItemUserWrapper>
      <div className={`user-wrapper ${size}-user`}>
        <div className="user-left-wrapper">
          <Avatar
            className="avatar"
            src={itemData.user_avator_url}
            scale="md"
          />
          <div className="user-info">
            <div>
              <div className="user-name">
                {itemData.user_name || itemData.nick_name}
              </div>
              <div className="time">
                <span>@{(itemData.user_address || '').slice(0, 3) + '...' + (itemData.user_address || '').slice(35)}</span>
                {itemData.add_time_desc || itemData.post_time_desc}
              </div>
            </div>
            {/* <div className="topic">
              <Icon name="icon-xingqiu" margin="0 10px 0 0" color="#7393FF"></Icon>
              老表的吃货天堂
            </div> */}
          </div>
        </div>
        {more ? (
          <div className="user-right-wrapper">
            {!isOwn && itemData.is_attention === 0 ? (
              <FollowBtn
                onClick={() => {
                  onAttentionFocusRequest(itemData.user_id);
                }}
              >
                +{t('followText')}
              </FollowBtn>
            ) : null}

            <MorePopup
              data={itemData}
              callback={(data: any, type: MoreOperatorEnum) => {
                callback(data, type);
              }}
            >
              <img
                src={moreIcon}
                onClick={() => {
                  setFollowShow(true);
                }}
                alt="more"
              />
            </MorePopup>
          </div>
        ) : null}
      </div>
    </MentionItemUserWrapper>
  );
};

export default MentionItem;
