import React, { useState } from 'react';
import { Header } from 'view/Home/center';
import { useTranslation } from 'contexts/Localization'
import { List } from 'components';
import { Api } from 'apis';
import {
  NoticeWrapper,
  NoticeItemWrapper,
  NoticeContentWrapper
} from './style';



const NewsNotice: React.FC = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)
  return (
    <NoticeWrapper>
      <NoticeContentWrapper len={listData.length}>
        <List marginTop={410} loading={page <= totalPage} renderList={() => {
          if (loading || page > totalPage) return false
          setLoading(true)
          Api.NewsApi.getMessageList(5, page, 50).then(res => {
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
      </NoticeContentWrapper>
    </NoticeWrapper>
  )
}

type IProps = {
  itemData: any;
}

const NoticeItem: React.FC<IProps> = ({ itemData }) => {
  const { t } = useTranslation()
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
          <div className="notice-des"><span>{t('newsNoticeTip')}：</span>{itemData.msg_content}</div>
        </div>
      </div>
    </NoticeItemWrapper>
  )
}

export default NewsNotice;