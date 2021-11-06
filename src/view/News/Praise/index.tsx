import React, { useState } from 'react';
import MentionItem, { MentionItemUser } from '../components/MentionItem';
import MentionOperator from '../components/MentionOperator';
import { Icon } from 'components';
import { List } from 'components';
import { Api } from 'apis';
import loveIcn from 'assets/images/social/at.png';

import {
  NewsPraiseWrapper,
  PraiseItemWrapper
} from './style';



const NewsPraise: React.FC = (props) => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)

  // 更新列表
  const updateList = (newItem: any) => {
    listData.map((item: any) => {
      if (item.id === newItem.id) {
        const obj = item
        obj.post = newItem.post
      }
      return item
    })
    setListData([...listData])
  }

  return (
    <NewsPraiseWrapper>
      <List marginTop={410} renderList={() => {
        if (loading || page > totalPage) return false
        setLoading(true)
        Api.NewsApi.getMessageList(3, page, 20).then(res => {
          setLoading(false)
          if (Api.isSuccess(res)) {
            setPage(page + 1)
            setListData([...listData, ...res.data.list])
            setTotalPage(res.data.total_page)
          }
        })
      }}>
        {listData.map(item => (
          <PraiseItemWrapper key={item.id}>
            <MentionItemUser more={false} itemData={{
              ...item,
              ...item.post,
              ...item.comment,
              user_name: item.send_name,
              user_avator_url: item.send_image
            }} callback={(data) => {
              updateList(data)
            }} />
            <div className="reply-wrapper">
              <Icon name={'icon-aixin1'} color={'#EC612B'}></Icon> 赞了你的内容
            </div>
            <div className="comment-content">
              <MentionItem itemData={{
                ...item,
                ...item.comment,
                ...item.post,
                user_name: item.post.nick_name,
                user_avator_url: item.post.nft_image
              }} {...props} more={false} size={'small'}></MentionItem>
            </div>
            <MentionOperator hasLike={false} itemData={{
              ...item,
              ...item.post
            }} callback={(item: any) => {
              updateList(item)
            }} />
          </PraiseItemWrapper>
        ))}
      </List>
    </NewsPraiseWrapper>
  )
}

export default NewsPraise;