import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Flex, Button, Box } from 'uikit'
import { Avatar, Icon, List } from 'components';
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
  const updateList = (newItem,index)=>{
      let temp =  listData
      temp[index]=newItem
      setListData(temp)
  }
  return (
    <ArticleListBox>
      <List marginTop={410} renderList={() => {
        if (loading || page > totalPage) return false
        setLoading(true)
        Api.HomeApi.getArticleList({
          attention: 1,
          page: page,
          per_page: 20
        }).then(res => {
          setLoading(false)
          if (Api.isSuccess(res)) {
            setPage(page + 1)
            setTotalPage(res.data.total_page)
            setListData([...listData, ...res.data.List])
          }
        })
      }}>
        {listData.map((item,index) => (
          <MeItemWrapper key={item.id} >
            <MentionItem {...props} itemData={item}>
            </MentionItem>
            <MentionOperator itemData={{...item,post_id:item.id,post:{
              ...item
            }}} callback={(data) => {
              updateList(data,index)
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