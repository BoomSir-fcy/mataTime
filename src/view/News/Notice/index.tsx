import React, { useState } from 'react';
import { Header } from 'view/Home/center';

import {
  NoticeWrapper,
  NoticeItemWrapper
} from './style';



const NewsNotice: React.FC = () => {
  const [list, setList] = useState<any []>([{}, {}, {}]);
  return (
    <NoticeWrapper>
      <Header title={'消息'} />
      <div className="notice-content-wrapper">
        
      </div>
    </NoticeWrapper>
  )
}

const NoticeItem: React.FC = () => {
  return (
    <NoticeItemWrapper>

    </NoticeItemWrapper>
  )
}

export default NewsNotice;