import React, { useState } from 'react';
import MentionItem, { MentionItemUser } from '../components/MentionItem';
import MentionOperator from '../components/MentionOperator';
import { useTranslation } from 'contexts/Localization'
import { List, ContentParsing, MoreOperatorEnum } from 'components';
import { Api } from 'apis';
import {
  NewsCommentWrapper,
  CommentItemWrapper
} from './style';



const NewsComment: React.FC = (props) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)

  // 获取列表
  const getList = (current = 0) => {
    if ((loading || page > totalPage) && !current) {
      return false
    }
    setLoading(true)
    Api.NewsApi.getMessageList(2, current || page, 50).then(res => {
      setLoading(false)
      if (Api.isSuccess(res)) {
        setTotalPage(res.data.total_page)
        if (current === 1 || page === 1) {
          setListData([...(res.data.list || [])])
          setPage(2)
        } else {
          setListData([...listData, ...(res.data.list || [])])
          setPage(page + 1)
        }
      }
    })
  }

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    if (type === MoreOperatorEnum.COMMONT) {
      setPage(1)
      getList(1)
      return
    }
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
    <NewsCommentWrapper>
      <List marginTop={410} loading={page <= totalPage} renderList={() => {
        getList()
      }}>
        {listData.map(item => {
          if (item?.post?.content_status === 1) {
            return (
              <CommentItemWrapper key={item.id}>
                <MentionItemUser more={false} itemData={{
                  ...item,
                  ...item.post,
                  ...item.comment,
                  user_name: item.send_name,
                  user_avator_url: item.send_image
                }} callback={(data) => {
                  updateList(data)
                }} />

                {item.comment.user_name ?
                  <div className="reply-wrapper">
                    {t('newsCommentReply')}
                    <a>@{item.comment.user_name}</a>
                    <div>
                      <ContentParsing content={item.comment.comment}></ContentParsing>
                    </div>
                  </div>
                  : null
                }

                <div className="comment-content">
                  <MentionItem itemData={{
                    ...item,
                    ...item.comment,
                    ...item.post,
                    user_name: item.post.nick_name,
                    user_avator_url: item.post.nft_image
                  }} {...props} more={false} size={'small'}></MentionItem>
                </div>
                <MentionOperator
                  hasLike={false}
                  replyType={'comment'}
                  postId={item.post.post_id}
                  commentId={item.id}
                  itemData={{
                    ...item,
                    ...item.post,
                    comment: {
                      ...item.comment,
                      content: item.comment.comment
                    }
                  }}
                  callback={(item: any, type?: MoreOperatorEnum) => {
                    updateList(item, type)
                  }}
                />
              </CommentItemWrapper>
            )
          }
        })}
      </List>
    </NewsCommentWrapper>
  )
}

export default NewsComment;