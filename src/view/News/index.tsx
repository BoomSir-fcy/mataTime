import React, { useState } from 'react';
import MentionItem from './MentionItem';

import {
  NewsWrapper
} from './style';



const News: React.FC = () => {
  const [list, setList] = useState<any []>([{}, {}, {}]);
  return (
    <NewsWrapper>
      {
        list.map((item: any, index: number) => <MentionItem key={index} />)
      }
    </NewsWrapper>
  )
}

export default News;