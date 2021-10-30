import React from 'react'
import styled from "styled-components";
import { Flex, Button } from 'uikit';
import { Api } from 'apis';

export const HeaderBox = styled(Flex)`
justify-content: space-between;
padding: 22px 16px;
background: #191F2D;
border-radius: 10px;
margin-bottom:12px;
font-size: 18px;
font-weight: bold;
color: #FFFFFF;
`

const userInfoParams = {
  UID: null,
  nick_name: null,
  display_format: null,
  introduction: null,
  location: null,
  background_image: null
}
export const Header = (props: { title: string, clickTitle?: () => void }) => {
  const updateUserInfo = async (userInfoParams: Api.User.userInfoParams) => {
    try {
      const res = await Api.UserApi.updateUserInfo(userInfoParams);
      console.log('updateUserInfo', res);
    } catch (error) {
      console.log(error);
    }
  }

  const { title } = props
  const clickTitle = (e) => {
    console.log(e);

  }
  return (
    <HeaderBox>
      <span onClick={clickTitle.bind(this)}>{title || '账号资料编辑'}</span>
      <Button onClick={() => updateUserInfo(userInfoParams)}>保存最新修改</Button>
    </HeaderBox>
  )
}
