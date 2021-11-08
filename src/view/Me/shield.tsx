import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Avatar, Icon } from 'components';
import { Box, Button, Flex } from 'uikit';
import { Api } from 'apis';

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
  background:#4D535F;
  float:right;
  margin-top:15px;
}
`

const Shield = React.memo(() => {
  const people = [
    { uname: '满克斯', dunpai: true, present: '@0x32...9239', isFollow: '取消屏蔽' },
    { uname: '乔布斯', dunpai: false, present: '巴里拉里', isFollow: '取消屏蔽' },
    { uname: '马克思', dunpai: true, present: '个人主页的介绍', isFollow: '取消屏蔽' }
  ]
  const [peopleState, setPeopleState] = useState(people)

  // 屏蔽列表
  const ShieldList = () => {

    // 屏蔽
    const shieldUser = async (pid: number) => {
      try {
        const res = await Api.MeApi.shieldUser(pid)
        console.log('屏蔽', res)
      } catch (error) {
        console.log(error)
      }
    }

    // 取消屏蔽
    const unShieldUser = async (pid: number) => {
      try {
        const res = await Api.MeApi.shieldUser(pid)
        console.log('取消屏蔽', res);

      } catch (error) {
        console.log(error);
      }
    }

    const setPeople = useCallback((index) => {
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
            <Column style={{ float: 'left' }}>
              <div><span className="username">{item.uname}</span> <Icon name={item.dunpai ? 'icon-dunpai' : null} margin="0 5px 0 5px" size={15} color="#699a4d" /> <span className="msg">@0x32...9239</span></div>
              <Msg>{item.present}</Msg>
            </Column>
            <Button onClick={() => shieldUser(1)}>取消屏蔽</Button>
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
          <span className="myFollow">屏蔽人数</span>
          <span className="msg">138人</span>
        </div>
      </Header>

      <Content>
        {ShieldList()}
      </Content>
    </Box>
  )
})

export default Shield;