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

const LikeSet = () => {
  const [state, setState] = useImmer({
    isDeep: true,
    isRemind: true,
    isTranslation: false
  })
  // 深色模式
  const setDeep = () => {
    let bgImg = document.getElementById("bg")
    setState(p => {
      p.isDeep = !p.isDeep
      if (state.isDeep) {
        bgImg.style.backgroundImage = "url(../../../assets/images/background_images.jpg)"
        bgImg.style.backgroundColor = "skyblue"
      } else {
        bgImg.style.backgroundColor = "skyblue"
        bgImg.style.backgroundImage = ""
      }
    })
  }
  // 红点提醒
  const setRemind = () => {
    setState(p => {
      p.isRemind = !p.isRemind
    })
  }
  // 默认语言
  // 自动翻译
  const setTranslation = () => {
    setState(p => {
      p.isTranslation = !p.isTranslation
    })
  }

  return (
    <NoticeSetBox>
      <Column>
        <Rows>
          <Title>深色模式</Title>
          <Toggle checked={state.isDeep} onClick={setDeep} />
        </Rows>
        <Msg>可切换为深色模式，夜间浏览更舒服</Msg>
      </Column>
      <Column>
        <Rows>
          <Title>消息红点提醒</Title>
          <Toggle checked={state.isRemind} onClick={setRemind} />
        </Rows>
        <Msg>有新消息时通过红点提醒</Msg>
      </Column>
      <Column>
        <Rows>
          <Title>默认显示语言</Title>
          <div>简体中文（CN）</div>
        </Rows>
        <Msg>显示更符合你的语言</Msg>
      </Column>
      <Column>
        <Rows>
          <Title>信息自动翻译</Title>
          <Toggle checked={state.isTranslation} onClick={setTranslation} />
        </Rows>
        <Msg>浏览其他人的内容时，自动翻译成你选择的默认显示语言 </Msg>
      </Column>
    </NoticeSetBox>
  )
}

export default LikeSet;