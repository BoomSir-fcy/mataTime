import React, { useState } from 'react';
import commentIcon from 'assets/images/social/comment.png';
import moreIcon from 'assets/images/social/more.png';
import { FollowPopup, MorePopup } from 'components'
import {
  MentionItemWrapper,
  MentionItemUserWrapper,
  FollowBtn
} from './style';



type IProps = {
  more?: boolean;
  size?: string;
}

const MentionItem: React.FC<IProps> = ({ children, more = true, size = 'nomal' }) => {
  return (
    <MentionItemWrapper>
      <MentionItemUser more={more} size={size} />
      <div className="mention-content">
        <p><a>#Dinosaur Eggs#</a></p>
        <p>New baby is coming. How about this one? </p>
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
}

export const MentionItemUser: React.FC<UserProps> = ({ more, size = 'nomal' }) => {
  const [followShow, setFollowShow] = useState(false);
  return (
    <MentionItemUserWrapper>
      <div className={`user-wrapper ${size}-user`}>
        <div className="user-left-wrapper">
          <div className="avatar"></div>
          <div className="user-info">
            <div className="user-name">曼克斯</div>
            <div className="time">5小时前</div>
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