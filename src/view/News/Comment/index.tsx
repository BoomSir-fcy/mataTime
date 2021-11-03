import React, { useState } from 'react';
import MentionItem, { MentionItemUser } from '../components/MentionItem';
import MentionOperator from '../components/MentionOperator';
import { List } from 'components';
import { Api } from 'apis';
import {
  NewsCommentWrapper,
  CommentItemWrapper
} from './style';



const NewsComment: React.FC = (props) => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)
  return (
    <NewsCommentWrapper>
      <List marginTop={410} renderList={() => {
        if (loading || page > totalPage) return false
        setLoading(true)
        Api.NewsApi.getMessageList(2, page, 20).then(res => {
          setLoading(false)
          if (res.code === 1) {
            setPage(page + 1)
            setListData([...listData, ...res.data.list])
            setTotalPage(res.data.total_page)
          }
        })
      }}>
        {listData.map(item => (
          <CommentItemWrapper key={item.id}>
            <MentionItemUser more={true} itemData={{
              ...item,
              ...item.post,
              ...item.comment,
              user_name: item.send_name,
              user_avator_url: item.send_image
            }} />
            <div className="reply-wrapper">
              回复<a>@{item.comment.comment_user_name}</a><p>{item.comment.comment}</p>
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
            <MentionOperator itemData={item.post} />
          </CommentItemWrapper>
        ))}
      </List>
    </NewsCommentWrapper>
  )
}

export default NewsComment;