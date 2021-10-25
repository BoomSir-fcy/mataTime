import React, { useState } from 'react';
import MentionItem, { MentionItemUser } from '../components/MentionItem';
import MentionOperator from '../components/MentionOperator';

import {
  NewsCommentWrapper,
  CommentItemWrapper
} from './style';



const NewsComment: React.FC = () => {
  const [list, setList] = useState<any []>([{}, {}, {}]);
  return (
    <NewsCommentWrapper>
      {
        list.map((item: any, index: number) => {
          return (
            <CommentItemWrapper key={index}>
              <MentionItemUser more={true} />
              <div className="reply-wrapper">
              回复<a>@曼克斯</a><p>这句话是我回复他的</p>
              </div>
              <div className="comment-content">
                <MentionItem more={false} size={'small'}></MentionItem>
              </div>
              <MentionOperator />
            </CommentItemWrapper>
          )
        })
      }
    </NewsCommentWrapper>
  )
}

export default NewsComment;