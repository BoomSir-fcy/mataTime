import React, { useState, useEffect,useRef } from 'react'
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
  const listRef:any = useRef()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)

  // 获取列表
  const getList = (current = 0) => {
    if ((loading || page > totalPage) && !current) return false
    setLoading(true)
    if (props.match.path === '/topicList/:id/:name') {
      Api.HomeApi.findByHotTopicIdList({
        page: current || page,
        per_page: 10,
        topic_id: 9
      }).then(res => {
        setLoading(false)
        if (Api.isSuccess(res)) {
          setLoading(false)
          setTotalPage(res.data.total_page)
          if (current === 1 || page === 1) {
            setListData([...res.data.List])
            setPage(2)
          } else {
            setListData([...listData, ...res.data.List])
            setPage(page + 1)
          }
        }
      })
    } else {
      Api.HomeApi.getArticleList({
        attention: 1,
        page: current || page,
        per_page: 50
      }).then(res => {
        setLoading(false)
        if (Api.isSuccess(res)) {
          setLoading(false)
          setTotalPage(res.data.total_page)
          if (current === 1 || page === 1) {
            setListData([...res.data.List])
            setPage(2)
          } else {
            setListData([...listData, ...res.data.List])
            setPage(page + 1)
          }
        }
      })
    }
  }

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    if (type === MoreOperatorEnum.FOLLOW ||
      type === MoreOperatorEnum.CANCEL_FOLLOW ||
      type === MoreOperatorEnum.SETTOP ||
      type === MoreOperatorEnum.CANCEL_SETTOP ||
      type === MoreOperatorEnum.COMMONT
    ) {
      setPage(1)
      getList(1)
      return
    }

    let arr = []
    listData.forEach((item: any) => {
      let obj = item
      if (item.id === newItem.id) {
        obj = { ...newItem.post }
      }
      if (item.id === newItem.id && (type === MoreOperatorEnum.SHIELD || type === MoreOperatorEnum.DELPOST)) {
        // 屏蔽、删除
      } else {
        arr.push(obj)
      }
    })
    setListData([...arr])
  }
  useEffect(() => {
    setLoading(false)
    setPage(1)
    setTotalPage(1)
    listRef.current.loadList()
    setListData([])
  },[props.match.params.id,props.match.params.name])
  return (
    <ArticleListBox>
      <List ref={listRef} marginTop={320} loading={page <= totalPage} renderList={() => {
        console.log(loading ,page ,totalPage);
        if (loading || page > totalPage) return false
        setLoading(true)
        if(props.match.path==='/topicList/:id/:name'){
          Api.HomeApi.findByHotTopicIdList({
            page: page,
            per_page: 10,
            topic_id:props.match.params.id==='empty'?null:props.match.params.id,
            topic_name:props.match.params.name
          }).then(res=>{
               setLoading(false)
            if (Api.isSuccess(res)) {
              setLoading(false)
              setPage(page + 1)
              setTotalPage(res.data.total_page)
              setListData([...listData, ...res.data.List])
            }
          })
        }else{
          Api.HomeApi.getArticleList({
            attention:1,
            page: page,
            per_page: 10,
            ...props.filterValObj
          }).then(res => {
            setLoading(false)
            if (Api.isSuccess(res)) {
              setLoading(false)
              setPage(page + 1)
              setTotalPage(res.data.total_page)
              setListData([...listData, ...res.data.List])
            }
          })
        }
      }}>
        {listData.map((item, index) => (
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
            <MentionOperator
              {...props}
              replyType="twitter"
              postId={item.id}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id
                }
              }}
              callback={(item: any, type?: MoreOperatorEnum) => {
                updateList(item, type)
              }}
            />
          </MeItemWrapper>
        ))}
      </List>
    </ArticleListBox>
  )
}
ArticleList.defaultProps = {
  filterValObj:{}
}