import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Flex, Card, Text, Radio, Input } from 'uikit';
import { useSelector } from 'react-redux'
import { Logo, Icon, Avatar } from 'components';

import { mediaQueriesSize } from "uikit/theme/base";

import { MenuProps } from 'components/Layout/CommonLayout/menuData';

import { Api } from 'apis';

const MenuWarpper = styled(Card)`
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.paddingsm}
`
const LogoWarpper = styled(Box)`
  width: 175px;
  height: 32px;
  margin: 10px auto 20px auto;
`
const BackWarpper = styled(Box)`
  display: flex;
  align-items: center;
  margin: 20px;
  cursor: pointer;
  i{
    font-size: 23px !important;
    font-weight: bold;
  }
  span{
    font-size: 18px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#4168ED'};
    margin-left: 10px;
  }
`

const MenuBody = styled(Box)`
  padding-bottom: 300px;
`

const MenuItems = styled(Box)`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  margin-bottom: 20px;
  &.active {
    width: 140px;
    padding: 5px 15px;
    border-radius: 18px;
    background-color: ${({ theme }) => theme.isDark ? '#232A3D' : '#EAF2FF'};
    div{
      font-weight: bold;
    }
  }
`
const MenuIcon = styled(Box)`
  margin-right: 20px;
  position: relative;
  span{
    position: absolute;
    width: 21px;
    height: 13px;
    background: #EC612B;
    border-radius: 5px;
    font-size: 11px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -10px;
    top: -5px;
  }
`
const MenuText = styled(Text)`
  color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#000000'};
`

const UserTitle = styled.div`
  margin:0 12px;
  font-weight:700;
  font-size:18px;
  color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#000000'};
  ::after{
    position:relative;
    right:-50px;
    content: "";
    display:inline-block;
    width:0px;
    height:0px;
    border-bottom: 7px solid transparent;
    /* border-left: 7px solid #fff; */
    border-left: 7px solid ${({ theme }) => theme.isDark ? '#FFFFFF' : '#000000'};
    border-right: 7px solid transparent;
    border-top: 7px solid transparent;
}
`
const UserDesc = styled.div`
  margin:0 12px;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.isDark ? '#B5B5B5' : '#7A83A0'};
`

type IProps = {
  menu: MenuProps[];
  route: any;
  history: any;
}

export const CommonLeftMenu = React.memo((props: IProps) => {
  const isDark = useSelector((state: any) => state.appReducer.systemCustom.isDark);
  const { pathname } = props.route
  const [msgNum, setMsgNum] = useState<any>({})

  useEffect(() => {
    getMsgNumRequest()
  }, [])

  // 获取未读消息数量
  const getMsgNumRequest = async () => {
    const res = await Api.NewsApi.getUnreadMsgNum();
    if (Api.isSuccess(res)) {
      setMsgNum(res.data);
    }
  }

  // 将消息变为已读
  const getMsgReadRequest = async (alias: string) => {
    let type = 1;
    switch (alias) {
      case 'message_at_me':
        type = 1;
        break;
      case 'message_comment':
        type = 2;
        break;
      case 'message_like':
        type = 3;
        break;
      case 'message_system':
        type = 5;
        break;
    }
    const res = await Api.NewsApi.getMessageRead(type);
    if (Api.isSuccess(res)) {
      getMsgNumRequest();
    }
  }



  return (
    <MenuWarpper>
      <LogoWarpper>
        <Logo url="/" src={require('assets/images/logo.svg').default} />
      </LogoWarpper>
      <BackWarpper onClick={() => {
        props.history.push('/')
      }}>
        <Icon color={isDark ? '#ffffff' : '#4168ED'} name={'icon-fanhui'}></Icon>
        <span>返回</span>
      </BackWarpper>
      <MenuBody>
        {
          props.menu.map((item: any) => {
            return (
              <MenuItems
                key={item.alias}
                className={item.link === pathname ? 'active' : ''}
                as={Link}
                to={item.link}
                onClick={() => {
                  getMsgReadRequest(item.alias)
                }}
              >
                <MenuIcon>
                  <Icon color={isDark ? '#ffffff' : '#7A83A0'} name={item.icon}></Icon>
                  {
                    msgNum[item.alias] ? <span>{msgNum[item.alias]}</span> : null
                  }
                </MenuIcon>
                <MenuText>{item.name}</MenuText>
              </MenuItems>
            )
          })
        }
      </MenuBody>
      <Flex>
        <Avatar src="" scale="sm" />
        <Box>
          <UserTitle>
            OliNe
          </UserTitle>
          <UserDesc>@0x3...d39</UserDesc>
        </Box>
      </Flex>
    </MenuWarpper>
  )
})