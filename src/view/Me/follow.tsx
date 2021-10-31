import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Crumbs, Avatar, Certification, Icon } from 'components';
import { Box, Button, Card, Flex, Text } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useImmer } from 'use-immer';

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
  const people = [
    { uname: '满克斯', dunpai: true, present: '@0x32...9239', isFollow: '取消关注' },
    { uname: '乔布斯', dunpai: false, present: '巴里拉里', isFollow: '取消关注' },
    { uname: '马克思', dunpai: true, present: '个人主页的介绍', isFollow: '取消关注' }
  ]
  const [peopleState, setPeopleState] = useState(people)

  // 头部

  // 关注列表
  const FollowBox = () => {
    const setPeople = useCallback((index) => {
      console.log(peopleState[index]);
      if (peopleState[index].isFollow) {
        peopleState.splice(index, 1)
      }
      const res = peopleState.map((item, subIndex) => {
        if (index === subIndex) {
          return {
            ...item,
          }
        }
        return {
          ...item
        }
      })
      setPeopleState(res)
    }, [peopleState])

    return (
      peopleState.map((item, index) => {
        return (
          <ContentBox>
            <Avatar scale="md" style={{ float: 'left' }} />
            <Column>
              <div><span className="username">{item.uname}</span> <Icon name={item.dunpai ? 'icon-dunpai' : null} margin="0 5px 0 5px" size={15} color="#699a4d" /> <span className="msg">{item.present}</span></div>
              <Msg>个人主页的介绍</Msg>
            </Column>
            <Button onClick={() => setPeople(index)} style={{ background: '#4D535F' }}>{item.isFollow}</Button>
          </ContentBox>
        )
      })
    )
  }
  return (
    <Box>
      <Header>
        <div className="title">个人主页</div>
        <div>
          <span className="myFollow">我的关注</span>
          <span className="msg">138人</span>
        </div>
      </Header>

      <Content>
        {FollowBox()}
      </Content>

    </Box>
  )
})

export default Follow;