import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Icon } from 'components';
import { CommentList } from 'src/components/Layout/ArticleDetilsLayout/CommentList';
import { Box, Button, Flex } from 'uikit';
import { Api } from 'apis';

const Title = styled(Box)`
color:#fff;
font-weight:bold;
`
const Content = styled(Box)`
width:100%;
height:715px;
padding:29px 19px;
background:#191F2D;
border-radius: 10px;
margin-top:10px;
overflow:hidden;
/* overflow-y:scroll; */
`
const Header = styled(Flex)`
justify-content: space-between;
height:60px;
line-height: 60px;
padding:0 16px;
background:#191F2D;
border-radius:10px;
`
const FloatR = styled(Box)`
float:right;
`

const Praise = React.memo(() => {
  // 点赞列表
  const getPraiseList = async () => {
    try {
      const res = await Api.MeApi.praiseList()
      console.log('点赞列表', res);
    } catch (error) {
      console.log(error);
    }
  }
  // 点赞用户
  const praiseUser = async (post_id: number) => {
    try {
      const res = await Api.MeApi.praiseUser(post_id)
      console.log('点赞用户', res)
    } catch (error) {
      console.log(error)
    }
  }

  // 取消点赞
  const unPraiseUser = async (post_id: number) => {
    try {
      const res = await Api.MeApi.unPraiseUser(post_id)
      console.log('取消点赞', res)
    } catch (error) {
      console.log(error)
    }
  }

  // 帖子详情
  const getContentDetail = async (id: number) => {
    try {
      const res = await Api.MeApi.getContentDetail(1)
      console.log('帖子详情', res);
    } catch (error) {
      console.log(error);
    }
  }

  // 添加评论
  const addContentDetail = async (params: Api.Me.addContentDetail) => {
    try {
      const res = await Api.MeApi.addContentDetail({
        pid: 1,
        comment: 123123,
        comment_id: 11
      })
      console.log('添加评论', res)
    } catch (error) {
      console.log(error)
    }
  }

  // 删除评论
  const removeContentDetail = async (id: number) => {
    try {
      const res = await Api.MeApi.removeContentDetail(id)
      console.log('删除评论', res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPraiseList()
    getContentDetail(1)
  }, [])
  return (
    <Box>
      <Header>
        <Title>个人主页</Title>
        <div>
          <Button style={{ marginRight: '11px' }}>全部点赞</Button>
          <Button>今日新增</Button>
        </div>
      </Header>

      <Content>
        <Button onClick={() => praiseUser(9)}>点赞</Button>
      </Content>
    </Box>
  )
})

export default Praise;