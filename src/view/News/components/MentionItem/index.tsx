import React, { useState } from 'react';
import commentIcon from 'assets/images/social/comment.png';
import moreIcon from 'assets/images/social/more.png';
import { relativeTime } from 'utils'
import { toast } from 'react-toastify';
import { FollowPopup, MorePopup, Icon, Avatar } from 'components'
import {
  MentionItemWrapper,
  MentionItemUserWrapper,
  FollowBtn
} from './style';

import { Api } from 'apis';

type IProps = {
  more?: boolean;
  size?: string;
  itemData: any;
  [propName: string]: any;
  callback?: Function;
}


const MentionItem: React.FC<IProps> = (props) => {
  const { children, size = 'nomal', itemData = {}, callback = () => { } } = props
  const goDetils = (e) => {
    if (props.match.path === '/articleDetils/:id') return
    props.history.push('/articleDetils/' + itemData.id)
  }
  return (
    <MentionItemWrapper>
      <MentionItemUser more={props.more} size={size} itemData={itemData} callback={(data: any) => {
        callback(data)
      }} />
      <div className="mention-content" onClick={(e) => { goDetils(e) }}>
        {/* <p><a>#Dinosaur Eggs#</a></p> */}
        <div dangerouslySetInnerHTML={{ __html: itemData.content }}></div>
        {/* <p>
          <FollowPopup>
            <a>@Baby fuck me</a>
          </FollowPopup>
        </p> */}
      </div>
      {children}
    </MentionItemWrapper>
  )
}

type UserProps = {
  more?: boolean;
  size?: string;
  itemData?: any;
  callback?: Function;
}

export const MentionItemUser: React.FC<UserProps> = ({ more = true, size = 'nomal', itemData = {}, callback = () => { } }) => {
  const [followShow, setFollowShow] = useState(false);

  // 关注用户
  const onAttentionFocusRequest = async (focus_uid: number) => {
    const res = await Api.AttentionApi.onAttentionFocus(focus_uid);
    if (Api.isSuccess(res)) {
      toast.success(res.data)
      callback({
        ...itemData,
        post: {
          ...itemData.post,
          is_attention: 0
        }
      })
    } else {
      toast.error(res.data)
    }

  }
  return (
    <MentionItemUserWrapper>
      <div className={`user-wrapper ${size}-user`}>
        <div className="user-left-wrapper">
          <Avatar className="avatar" src={itemData.user_avator_url} scale="md" />
          <div className="user-info">
            <div>
              <div className="user-name">{itemData.user_name}</div>
              <div className="time">{itemData.add_time_desc}</div>
            </div>
            {/* <div className="topic">
              <Icon name="icon-xingqiu" margin="0 10px 0 0" color="#7393FF"></Icon>
              老表的吃货天堂
            </div> */}
          </div>
        </div>
        {
          more ? (
            <div className="user-right-wrapper">
              {
                itemData.is_attention === 0 ? (
                  <FollowBtn onClick={() => {
                    onAttentionFocusRequest(itemData.uid)
                  }}>+关注</FollowBtn>
                ) : null
              }

              <MorePopup data={itemData}>
                <img src={moreIcon} onClick={() => { setFollowShow(true) }} alt="more" />
              </MorePopup>
            </div>
          ) : null
        }
      </div>
    </MentionItemUserWrapper>
  )

}

export default MentionItem