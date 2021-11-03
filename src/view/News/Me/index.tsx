import React, { useState } from 'react';
import MentionItem from '../components/MentionItem';
import MentionOperator from '../components/MentionOperator';

import {
  NewsMeWrapper,
  MeItemWrapper
} from './style';



const NewsMe: React.FC = (props) => {
  const [list, setList] = useState<any[]>([{}, {}, {}]);
  return (
    <NewsMeWrapper>
      {
        list.map((item: any, index: number) => {
          return (
            <MeItemWrapper key={index}>
              <MentionItem itemData={new Object()} {...props}>
              </MentionItem>
                <MentionOperator itemData={new Object()} />
            </MeItemWrapper>
          )
        })
      }
    </NewsMeWrapper>
  )
}

export default NewsMe;