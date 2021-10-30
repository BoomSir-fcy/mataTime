import React from 'react';
import styled from 'styled-components';
import { Avatar, Icon } from 'components';
import { Box, Button, Flex } from 'uikit';
import { ArticleList } from '../Home/center/ArticleList'

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
overflow-y:scroll;
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
        <ArticleList />
      </Content>
    </Box>
  )
})

export default Praise;