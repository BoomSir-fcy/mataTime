import React, { useEffect } from 'react';
import { Box, Button, Card, Flex, Text } from 'uikit';
import styled from 'styled-components';
import { Api } from 'apis';
import { toast } from 'react-toastify';

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
padding:29px 19px;
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

const Collect = () => {
  // 收藏列表
  const getCollectList = async () => {
    try {
      const res = await Api.MeApi.collectList()
      console.log('收藏列表', res);
    } catch (error) {
      console.log(error);
    }
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
    getCollectList()
  }, [])
  return (
    <Box>
      <Header>
        <div className="title">个人主页</div>
        <div>
          <span className="myFollow">我的收藏</span>
          <span className="msg">138人</span>
        </div>
      </Header>
      <Content>
        <Button onClick={() => cancelCollect(1)}>按钮</Button>
      </Content>
    </Box >
  )
}

export default Collect;