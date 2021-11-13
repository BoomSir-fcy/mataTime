import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Crumbs, Avatar, Certification, Icon } from 'components';
import { Box, Button, Card, Flex, Text } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useImmer } from 'use-immer';
import { Api } from 'apis';
import { MeApi } from 'src/apis/Me';
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
const Msg = styled(Box)`
color:#B5B5B5;
font-size:14px;
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
const Column = styled(Flex)`
flex-direction: column;
justify-content: space-around;
height:60px;
float: left;
margin-left:22px;
`
const Rows = styled(Flex)`
justify-content: space-between;
`
const ContentBox = styled(Box)`
float: left;
width:100%;
height:60px;
margin-bottom:28px;
button {
  float:right;
  margin-top:15px;
}
`

const Follow = React.memo(() => {
  const [followAry, setFollowAry] = useState([])
  const FollowList = () => {
    console.log('关注列表', followAry);
    // 关注列表
    const getFollowList = async () => {
      try {
        const res = await Api.MeApi.followList()
        setFollowAry(res.data.list)
      } catch (error) {
        console.log(error);
      }
    }

    // 关注用户
    const followUser = async (focus_uid: number) => {
      try {
        const res = await Api.MeApi.followUser(focus_uid)
        console.log('关注用户', res);
        if (res.code === 1) {
          getFollowList()
          toast.success(res.data)
        } else {
          toast.warning(res.data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    // 取消关注
    const unFollowUser = async (focus_uid: number) => {
      try {
        const res = await Api.MeApi.unFollowUser(focus_uid)
        console.log('取消关注', res);
        if (res.code === 1) {
          getFollowList()
          toast.success(res.data)
        } else {
          toast.warning(res.data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getFollowList()
    }, [])
    return (
      <div>
        {
          followAry.map(item => {
            return (
              <ContentBox key={item.uid}>
                <Avatar src={item.nft_image} scale="md" style={{ float: 'left' }} />
                <Column>
                  <div><span className="username">{item.nick_name}</span> <Icon name={item.dunpai ? 'icon-dunpai' : null} margin="0 5px 0 5px" size={15} color="#699a4d" /> <span className="msg">    @0x32...9239</span></div>
                  <Msg>{item.introduction}</Msg>
                </Column>
                {
                  item.attention_status_name === "已关注" && <Button onClick={() => unFollowUser(item.uid)} style={{ background: '#4168ED' }}>{item.attention_status_name}</Button>
                }
                {
                  item.attention_status_name !== "已关注" && <Button onClick={() => followUser(item.uid)} style={{ background: '#4168ED' }}>{item.attention_status_name}</Button>
                }
              </ContentBox>
            )
          })
        }
      </div>
    )
  }
  return (
    <Box>
      <Header>
        <div className="title">个人主页</div>
        <div>
          <span className="myFollow">我的关注</span>
          <span className="msg">{followAry.length}人</span>
        </div>
      </Header>

      <Content>
        {FollowList()}
      </Content>

    </Box>
  )
})

export default Follow;