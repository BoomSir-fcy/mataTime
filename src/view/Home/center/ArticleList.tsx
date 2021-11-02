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
  const [size, setSize] = useState(20)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)
  return (
    <ArticleListBox>
      <List marginTop={410} renderList={() => {
        if (loading || page > totalPage) return false
        setLoading(true)
        Api.HomeApi.getArticleList({
          attention: 1,
          page: page,
          per_page: size
        }).then(res => {
          setLoading(false)
          if (res.code === 1) {
            setPage(page + 1)
            setListData([...listData])
            // setListData([...listData, ...res.data.List])
            setTotalPage(res.data.total_page)
          }
        })
      }}>
        {listData.map(item => (
          <MeItemWrapper key={item.id} >
            <MentionItem {...props}>
            </MentionItem>
            <MentionOperator />
          </MeItemWrapper>
        ))}
      </List>
    </ArticleListBox>
  )
}
ArticleList.defaultProps = {
  data: Array(6).fill(null)
}