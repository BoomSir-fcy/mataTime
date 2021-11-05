import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Crumbs, Avatar, Certification, Icon } from 'components';
import { Box, Button, Card, Flex, Text } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useImmer } from 'use-immer';
import { Api } from 'apis';
import { MeApi } from 'src/apis/Me';

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
  const [state, setState] = useImmer<Api.Me.followParams>({
    uid: 0,
    data: [],
    res: {},
    nick_name: ''
  })

  // 头部

  const FollowList = () => {
    // 关注列表
    console.log('关注列表2', state.data);

    const getFollowList = async () => {
      try {
        const res = await Api.MeApi.followList()
        console.log('关注列表1', res.data.List);
        if (res.data.List) {
          setState(p => {
            p.data = res.data.List
          })
        }
      } catch (error) {
        console.log(error);
      }
    }

    // 关注用户
    const followUser = async (focus_uid) => {
      Api.MeApi.followUser({
        focus_uid
      }).then(res => {
        console.log(res)
      })
    }

    // 取消关注
    const unFollowUser = (res?: number) => {
      Api.MeApi.unFollowUser({
        focus_uid: 1455853291
      }).then(res => {
        console.log('取消关注', res)
      })
    }

    useEffect(() => {
      getFollowList()
    }, [])
    return (
      <div>
        {
          state.data.map(item => {
            return (
              <ContentBox key={item.uid}>
                <Avatar scale="md" style={{ float: 'left' }} />
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
          <span className="msg">{state.data.length}人</span>
        </div>
      </Header>

      <Content>
        {FollowList()}
      </Content>

    </Box>
  )
})

export default Follow;