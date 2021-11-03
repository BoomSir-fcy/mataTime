import React, { useState } from 'react';
import commentIcon from 'assets/images/social/comment.png';
import moreIcon from 'assets/images/social/more.png';
import { relativeTime } from 'utils'
import { FollowPopup, MorePopup, Icon ,Avatar} from 'components'
import {
  MentionItemWrapper,
  MentionItemUserWrapper,
  FollowBtn
} from './style';



type IProps = {
  more?: boolean;
  size?: string;
  itemData:any;
  [propName: string]: any;
}

const MentionItem: React.FC<IProps> = (props) => {
  const { children, size = 'nomal' ,itemData={}}= props
  const goDetils = (e) => {
    if (props.match.path === '/articleDetils/:id') return
    props.history.push('/articleDetils/'+itemData.id)
  }
  return (
    <MentionItemWrapper>
      <MentionItemUser more={props.more} size={size} itemData={itemData} />
      <div className="mention-content" onClick={(e) => { goDetils(e) }}>
        <p><a>#Dinosaur Eggs#</a></p>
        <div dangerouslySetInnerHTML={{ __html:itemData.content}}></div>
        <p>
          <FollowPopup>
            <a>@Baby fuck me</a>
          </FollowPopup>
        </p>
      </div>
      {children}
    </MentionItemWrapper>
  )
}

type UserProps = {
  more?: boolean;
  size?: string;
  itemData?:any;
}

export const MentionItemUser: React.FC<UserProps> = ({ more = true, size = 'nomal', itemData={}}) => {
  const [followShow, setFollowShow] = useState(false);
  return (
    <MentionItemUserWrapper>
      <div className={`user-wrapper ${size}-user`}>
        <div className="user-left-wrapper">
          <Avatar className="avatar" src={itemData.user_avator_url} scale="md" />
          <div className="user-info">
            <div>
              <div className="user-name">{itemData.user_name}</div>
              <div className="time">{relativeTime(itemData.add_time)}</div>
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
              <FollowBtn>+关注</FollowBtn>
              <MorePopup>
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