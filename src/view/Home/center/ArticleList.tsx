import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Flex, Button, Box } from 'uikit'
import { Avatar, Icon, List, MoreOperatorEnum } from 'components';
// import MentionItem from 'view/News/components/MentionItem';
import { Link } from 'react-router-dom'
import { relativeTime } from 'utils'
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';

import {
  NewsMeWrapper,
  MeItemWrapper
} from 'view/News/Me/style';
import { Api } from 'apis'

const ArticleListBox = styled.div`
color:#fff;
`

export const ArticleList = (props) => {
  const goDetils = (e) => {
    if (props.location.pathname === '/articleDetils') return
    props.history.push('/articleDetils')
  }
  // const [size, setSize] = useState(20)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)


  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    console.log(type)
    let arr = []
    listData.forEach((item: any) => {
      let obj = item
      if (item.id === newItem.id) {
        obj = { ...newItem.post }
      }
      if (item.id === newItem.id && type === MoreOperatorEnum.SHIELD) {
        // 屏蔽
      } else if (item.id === newItem.id && type === MoreOperatorEnum.SETTOP) {
        // 置顶
        arr.unshift(obj)
      } else {
        arr.push(obj)
      }
    })
    setListData([...arr])
  }
  return (
    <ArticleListBox>
      <List marginTop={410} loading={page <= totalPage} renderList={() => {
        if (loading || page > totalPage) return false
        setLoading(true)
        Api.HomeApi.getArticleList({
          attention: 1,
          page: page,
          per_page: 20
        }).then(res => {
          setLoading(false)
          if (res.code === 1) {
            setPage(page + 1)
            setTotalPage(res.data.total_page)
            setListData([...listData, ...res.data.List])
          }
        })
      }}>
        {listData.map(item => (
          <MeItemWrapper key={item.id} >
            <MentionItem {...props} itemData={{
              ...item,
              post_id: item.id,
              post: {
                ...item,
                post_id: item.id,
              }
            }} callback={(item: any, type: MoreOperatorEnum) => {
              updateList(item, type)
            }}>
            </MentionItem>
            <MentionOperator itemData={{
              ...item,
              post_id: item.id,
              post: {
                ...item,
                post_id: item.id
              }
            }} callback={(item: any) => {
              updateList(item)
            }} />
          </MeItemWrapper>
        ))}
      </List>
    </ArticleListBox>
  )
}
ArticleList.defaultProps = {
  data: Array(6).fill(null)
}