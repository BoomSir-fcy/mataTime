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
        {
          list.map((item: any, index: number) => {
            return <NoticeItem key={index} />
          })
        }
      </div>
    </NoticeWrapper>
  )
}

const NoticeItem: React.FC = () => {
  return (
    <NoticeItemWrapper>
       <div className={`notice-wrapper`}>
       <div className="avatar"></div>
        <div className="notice-info">
          <div className="notice-name">
            <h3>Dinosaur Sofi</h3>
            <span>12:55</span>
          </div>
          <div className="notice-des"><span>平台通知：</span>2021年10月14日，新增opensea NFT</div>
        </div>
      </div>
    </NoticeItemWrapper>
  )
}

export default NewsNotice;