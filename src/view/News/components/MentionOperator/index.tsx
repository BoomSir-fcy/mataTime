import React from 'react';
import { Icon } from 'components';
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
              <Icon name={'icon-pinglun'} color={'#B5B5B5'}></Icon>
              36
            </div>
            <div className="operator-item">
              <Icon name={'icon-retweet'} color={'#B5B5B5'}></Icon>
              36
            </div>
            <div className="operator-item">
              <Icon name={'icon-aixin'} color={'#B5B5B5'}></Icon>
              {/* <Icon name={'icon-aixin1'} color={'#EC612B'}></Icon> */}
              36
            </div>
          </div>
        </MentionOperatorWrapper>
    )
}

export default MentionOperator