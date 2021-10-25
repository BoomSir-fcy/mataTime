import React from 'react';
import commentIcon from 'assets/images/social/comment.png';
import moreIcon from 'assets/images/social/more.png';
import { 
  MentionItemWrapper
} from './style';



type IProps = {

}

const MentionItem: React.FC<IProps> = ({ children }) => {
    return (
        <MentionItemWrapper>
          <div className="user-wrapper">
            <div className="user-left-wrapper">
              <div className="avatar"></div>
              <div className="user-info">
                <div className="user-name">曼克斯</div>
                <div className="time">5小时前</div>
              </div>
            </div>
            <div className="user-right-wrapper">
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