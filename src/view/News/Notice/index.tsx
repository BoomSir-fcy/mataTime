import React, { useState } from 'react';
import { Header } from 'view/Home/center';
import { List } from 'components';
import { Api } from 'apis';
import {
  NoticeWrapper,
  NoticeItemWrapper
} from './style';



const NewsNotice: React.FC = () => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)
  return (
    <NoticeWrapper>
      <Header title={'消息'} />
      <div className="notice-content-wrapper">
        <List marginTop={410} loading={page <= totalPage} renderList={() => {
          if (loading || page > totalPage) return false
          setLoading(true)
          Api.NewsApi.getMessageList(5, page, 20).then(res => {
            setLoading(false)
            if (Api.isSuccess(res)) {
              setPage(page + 1)
              setListData([...listData, ...(res.data.list || [])])
              setTotalPage(res.data.total_page)
            }
          })
        }}>
          {listData.map(item => (
            <NoticeItem key={item.id} itemData={item} />
          ))}
        </List>
      </div>
    </NoticeWrapper>
  )
}

type IProps = {
  itemData: any;
}

const NoticeItem: React.FC<IProps> = ({ itemData }) => {
  return (
    <NoticeItemWrapper>
      <div className={`notice-wrapper`}>
        <div className="avatar">
          <img src={itemData.send_image} alt="send_image" />
        </div>
        <div className="notice-info">
          <div className="notice-name">
            <h3>{itemData.send_name}</h3>
            <span>{itemData.add_time}</span>
          </div>
          <div className="notice-des"><span>平台通知：</span>{itemData.msg_content}</div>
        </div>
      </div>
    </NoticeItemWrapper>
  )
}

export default NewsNotice;