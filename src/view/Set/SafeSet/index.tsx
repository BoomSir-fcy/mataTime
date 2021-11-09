import React from 'react'
import styled from "styled-components";
import { Flex, Box, Text, Button } from 'uikit';
import { useWeb3React } from '@web3-react/core';
import { Api } from 'apis';

const SafeSetBox = styled.div`
height: 707px;
background: #191F2D;
margin-top: 16px;
padding: 27px 29px;
border-radius: 10px;
`
const Rows = styled(Flex)`
justify-content: space-between;
padding-bottom:23px;
margin-bottom:22px;
border-bottom: 1px solid #4D535F;
`
const Title = styled.div`
color:#fff;
font-weight: bold;
`
const Address = styled.div`
color:#fff;
font-weight: bold;
`
const Column = styled(Flex)`
flex-direction:column;
justify-content: space-around;
`
const Msg = styled(Text)`
color:#B5B5B5;
font-size:16px;
`


const SafeSet = () => {
  // 更新邮箱
  const updateEmail = async (email: string) => {
    try {
      const res = await Api.SetApi.updateEmail(email)
      console.log('更新邮箱', res);
    } catch (error) {
      console.log(error)
    }
  }
  console.log('钱包地址', useWeb3React());

  return (
    <SafeSetBox>
      <Rows>
        <Column>
          <Title>钱包地址</Title>
          <Msg>登录该账号的钱包地址，无法更改</Msg>
        </Column>
        <Address>0x27B0FC6C…………9a5bde61214d2</Address>
      </Rows>
      <Rows>
        <Column>
          <Title>邮箱设置</Title>
          <Msg>平台最新消息将发送至该邮箱</Msg>
        </Column>
        <Button onClick={() => updateEmail('liujiaqi@qgx.com')}>立即绑定</Button>
      </Rows>
    </SafeSetBox>
  )
}

export default SafeSet;