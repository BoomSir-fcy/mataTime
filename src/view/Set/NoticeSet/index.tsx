import React from 'react'
import styled from "styled-components";
import { Flex, Box, Text, Button, Toggle } from 'uikit';
import { useImmer } from 'use-immer';

const NoticeSetBox = styled.div`
height: 707px;
background: #191F2D;
margin-top: 16px;
padding: 27px 29px;
border-radius: 10px;
`
const Title = styled.div`
color:#fff;
font-weight: bold;
`
const Msg = styled(Text)`
color:#B5B5B5;
font-size:16px;
`
const Rows = styled(Flex)`
justify-content: space-between;
`
const Column = styled(Flex)`
flex-direction: column;
justify-content: space-around;
padding-bottom:23px;
margin-bottom:22px;
border-bottom: 1px solid #4D535F;
`

const NoticeSet = () => {
  const [state, setState] = useImmer({
    isFilted: true,
    isNews: false,
    isEmail: false
  })

  // 质量过滤
  const filter = () => {
    setState(p => {
      p.isFilted = !p.isFilted
    })
  }
  // 消息通知
  const newsNotice = () => {
    setState(p => {
      p.isNews = !p.isNews
    })
  }
  // 邮箱通知
  const emailNotice = () => {
    setState(p => {
      p.isEmail = !p.isEmail
    })
  }

  return (
    <NoticeSetBox>
      <Column>
        <Rows>
          <Title>质量过滤</Title>
          <Toggle checked={state.isFilted} onClick={filter} />
        </Rows>
        <Msg>选择过滤重复或自动发送的文章等内容，将只会展示您喜欢的文章</Msg>
      </Column>
      <Column>
        <Rows>
          <Title>消息通知</Title>
          <Toggle checked={state.isNews} onClick={newsNotice} />
        </Rows>
        <Msg>开启或关闭来自浏览器的授权消息通知，开启后将会通过浏览器的消息提醒您</Msg>
      </Column>
      <Column>
        <Rows>
          <Title>电子邮件通知</Title>
          <Toggle checked={state.isEmail} onClick={emailNotice} />
        </Rows>
        <Msg>开启或关闭来自邮件的消息通知，但在这之前，您需绑定您的邮箱账号</Msg>
      </Column>
    </NoticeSetBox>
  )
}

export default NoticeSet;