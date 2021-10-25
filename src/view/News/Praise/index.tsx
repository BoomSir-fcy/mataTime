import React, { useState } from 'react';
import MentionItem, { MentionItemUser } from '../components/MentionItem';
import MentionOperator from '../components/MentionOperator';
import { Icon } from 'components';
import loveIcn from 'assets/images/social/at.png';

import {
  NewsPraiseWrapper,
  PraiseItemWrapper
} from './style';



const NewsPraise: React.FC = () => {
  const [list, setList] = useState<any []>([{}, {}, {}]);
  return (
    <NewsPraiseWrapper>
      {
        list.map((item: any, index: number) => {
          return (
            <PraiseItemWrapper key={index}>
              <MentionItemUser more={true} />
              <div className="reply-wrapper">
                <Icon name={'icon-aixin1'} color={'#EC612B'}></Icon> 赞了你的内容
              </div>
              <div className="comment-content">
                <MentionItem more={false} size={'small'}></MentionItem>
              </div>
              <MentionOperator />
            </PraiseItemWrapper>
          )
        })
      }
    </NewsPraiseWrapper>
  )
}

export default NewsPraise;