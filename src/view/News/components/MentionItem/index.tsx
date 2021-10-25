import React from 'react';
import commentIcon from 'assets/images/social/comment.png';
import moreIcon from 'assets/images/social/more.png';
import {Icon} from 'components';
import { 
  MentionItemWrapper,
  FollowBtn
} from './style';



type IProps = {
 index?:number
}
const MentionItem: React.FC<IProps> = ({ children,index }) => {
    return (
        <MentionItemWrapper>
          <div className="user-wrapper">
            <div className="user-left-wrapper">
              <div className="avatar"></div>
              <div className="user-info">
                <div>
                  <div className="user-name">曼克斯</div>
                  <div className="time">5小时前</div>
                </div>
                {index===0? 
                 <div className="topic">
                    <Icon name="icon-xingqiu" margin="0 10px 0 0" color="#7393FF"></Icon>
                    老表的吃货天堂
                  </div>:''}
              </div>
            </div>
            <div className="user-right-wrapper">
              <FollowBtn>+关注</FollowBtn>
              <img src={moreIcon} alt="more" />
            </div>

          </div>
          <div className="mention-content">
            <p><a>#Dinosaur Eggs#</a></p>
            <p>New baby is coming. How about this one? </p>
            <p><a>@Baby fuck me</a></p>
          </div>
          <div className="mention-option">
            <div className="option-item">
              <img src={commentIcon} alt="icon" />
              36
            </div>
            <div className="option-item">
              <img src={commentIcon} alt="icon" />
              36
            </div>
            <div className="option-item">
              <img src={commentIcon} alt="icon" />
              36
            </div>
          </div>
        </MentionItemWrapper>
    )
}

export default MentionItem