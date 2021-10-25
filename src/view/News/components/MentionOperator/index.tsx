import React from 'react';
import commentIcon from 'assets/images/social/comment.png';
import { 
  MentionOperatorWrapper
} from './style';



type IProps = {

}

const MentionOperator: React.FC<IProps> = () => {
    return (
        <MentionOperatorWrapper>
          <div className="mention-operator">
            <div className="operator-item">
              <img src={commentIcon} alt="icon" />
              36
            </div>
            <div className="operator-item">
              <img src={commentIcon} alt="icon" />
              36
            </div>
            <div className="operator-item">
              <img src={commentIcon} alt="icon" />
              36
            </div>
          </div>
        </MentionOperatorWrapper>
    )
}

export default MentionOperator