import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Flex, Text } from 'uikit';
import styled from 'styled-components';
import { Api } from 'apis';
import { toast } from 'react-toastify';
import { List } from 'components';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import {
  NewsMeWrapper,
  MeItemWrapper
} from 'view/News/Me/style';

const Header = styled(Flex)`
  width:100%;
  height:70px;
  padding:0 16px;
  line-height: 70px;
  background:#191F2D;
  justify-content: space-between;
  border-radius:10px;
  .title {
    color:#fff;
    font-weight: bold;
  }
  .myFollow {
    margin-right:10px;
    font-size:14px;
    color:#fff;
  }
  .msg {
    font-size:14px;
    color:#B5B5B5;
  }
`
const Content = styled(Box)`
width:100%;
height:705px;
padding:0 19px;
background:#191F2D;
border-radius: 10px;
margin-top:10px;
overflow:hidden;
.msg {
  color:#B5B5B5;
  font-size:14px;
}
.username {
  color:#fff;
}
`
const ArticleListBox = styled.div`
color:#fff;
`
enum MoreOperatorEnum {
  SHIELD = 'SHIELD', // 屏蔽
  SETTOP = 'SETTOP',
  DELPOST = 'DELPOST'
}
const Collect = (props) => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(2)

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    let arr = []
    listData.forEach((item: any) => {
      let obj = item
      if (item.id === newItem.id) {
        obj = { ...newItem.post }
      }
      if (item.id === newItem.id && (type === MoreOperatorEnum.SHIELD || type === MoreOperatorEnum.DELPOST)) {
        // 屏蔽、删除
      } else if (item.id === newItem.id && type === MoreOperatorEnum.SETTOP) {
        // 置顶
        arr.unshift(obj)
      } else {
        arr.push(obj)
      }
    })
    setListData([...arr])
  }
  const goDetils = (e) => {
    e.preventdefault()
  }
  // 收藏列表
  const ArticleList = () => {
    return (
      <ArticleListBox onClick={() => goDetils}>
        <List marginTop={410} loading={page <= totalPage} renderList={() => {
          if (loading || page > totalPage) return false
          setLoading(true)
          Api.MeApi.collectList().then(res => {
            setLoading(false)
            if (res.msg === 'success') {
              setPage(page + 1)
              setTotalPage(res.data.total_num)
              setListData([...listData, ...res.data.list])
            }
          })
        }}>
          {listData.map((item, index) => {
            return (
              <MeItemWrapper key={index}>
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
            )
          })}
        </List>
      </ArticleListBox >
    )
  }
  ArticleList.defaultProps = {
    data: Array(6).fill(null)
  }
  // 取消收藏
  const cancelCollect = async (post_id: number) => {
    try {
      const res = await Api.MeApi.cancelCollect(post_id)
      console.log('取消收藏', res);
      if (res.code === 1) {
        toast.success(res.data)
      } else {
        toast.warning(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 收藏文章
  const addCollect = async (post_id: number) => {
    try {
      const res = await Api.MeApi.addCollect(post_id)
      console.log('收藏文章', res);
      if (res.code === 1) {
        toast.success(res.data)
      } else {
        toast.warning(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // getCollectList()
  }, [])
  return (
    <Box>
      <Header>
        <div className="title">个人主页</div>
        <div>
          <span className="myFollow">我的收藏</span>
          <span className="msg">{listData.length}条</span>
        </div>
      </Header>
      <Box style={{ marginTop: '14px' }}>
        {ArticleList()}
      </Box>
    </Box >
  )
}

export default Collect;