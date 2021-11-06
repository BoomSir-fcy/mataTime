import React, { useState } from 'react';
import MentionItem from '../components/MentionItem';
import MentionOperator from '../components/MentionOperator';
import { List, MoreOperatorEnum } from 'components';
import { Api } from 'apis';
import {
  NewsMeWrapper,
  MeItemWrapper
} from './style';

const NewsMe: React.FC = (props) => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    // listData.map((item: any) => {
    //   if (item.id === newItem.id) {
    //     const obj = item
    //     obj.post = newItem.post
    //   }
    //   return item
    // })
    // setListData([...listData])

    let arr = []
    listData.forEach((item: any) => {
      let obj = item
      if (item.id === newItem.id) {
        obj.post = { ...newItem.post }
      }
      if (type === MoreOperatorEnum.SHIELD) {
        // 屏蔽
      } else {
        arr.push(obj)
      }

    })
    console.log('arr:', arr)
    setListData([...arr])
  }


  return (
    <NewsMeWrapper>
      <List marginTop={410} loading={page <= totalPage} renderList={() => {
        if (loading || page > totalPage) return false
        setLoading(true)
        Api.NewsApi.getMessageList(1, page, 20).then(res => {
          setLoading(false)
          if (Api.isSuccess(res)) {
            setPage(page + 1)
            setListData([...listData, ...res.data.list])
            setTotalPage(res.data.total_page)
          }
        })
      }}>
        {listData.map(item => (
          <MeItemWrapper key={item.id} >
            <MentionItem more={false} itemData={{
              ...item,
              ...item.comment,
              ...item.post,
              user_name: item.send_name,
              user_avator_url: item.send_image
            }} {...props} callback={(data, type: MoreOperatorEnum) => {
              updateList(data, type)
            }} />
            <MentionOperator hasLike={false} itemData={{
              ...item,
              ...item.post
            }} callback={(item: any) => {
              updateList(item)
            }} />
          </MeItemWrapper>
        ))}
      </List>
    </NewsMeWrapper>
  )
}

export default NewsMe;