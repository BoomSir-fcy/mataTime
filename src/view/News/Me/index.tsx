import React, { useState } from 'react';
import MentionItem from '../components/MentionItem';
import MentionOperator from '../components/MentionOperator';

import {
  NewsMeWrapper,
  MeItemWrapper
} from './style';



const NewsMe: React.FC = () => {
  const [list, setList] = useState<any[]>([{}, {}, {}]);
  return (
    <NewsMeWrapper>
      {
        list.map((item: any, index: number) => {
          return (
            <MeItemWrapper key={index}>
              <MentionItem>
                <MentionOperator />
              </MentionItem>
            </MeItemWrapper>

          )
        })
      }
    </NewsMeWrapper>
  )
}

export default NewsMe;