import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Crumbs, Avatar, Certification, Icon } from 'components';
import { Box, Button, Card, Flex, Text } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';

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
        <ContentBox>
          <Avatar scale="md" style={{ float: 'left' }} />
          <Column>
            <div><span className="username">满克斯</span> <Icon name="icon-dunpai" margin="0 5px 0 5px" size={15} color="#699a4d" /> <span className="msg">@0x32...9239</span></div>
            <Msg>个人主页的介绍</Msg>
          </Column>
          <Button>关注</Button>
        </ContentBox>
        <ContentBox>
          <Avatar scale="md" style={{ float: 'left' }} />
          <Column style={{ float: 'left' }}>
            <div><span className="username">满克斯</span> <Icon name="icon-dunpai" margin="0 5px 0 5px" size={15} color="#699a4d" /> <span className="msg">@0x32...9239</span></div>
            <Msg>个人主页的介绍</Msg>
          </Column>
          <Button>关注</Button>
        </ContentBox>
        <ContentBox>
          <Avatar scale="md" style={{ float: 'left' }} />
          <Column style={{ float: 'left' }}>
            <div><span className="username">满克斯</span> <Icon name="icon-dunpai" margin="0 5px 0 5px" size={15} color="#699a4d" /> <span className="msg">@0x32...9239</span></div>
            <Msg>个人主页的介绍</Msg>
          </Column>
          <Button>关注</Button>
        </ContentBox>
      </Content>

    </Box>
  )
})

export default Follow;