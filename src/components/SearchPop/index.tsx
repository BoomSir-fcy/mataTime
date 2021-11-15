import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Avatar } from 'components';
import { SearchPopBox } from './style'
import { Flex } from 'uikit'
import { UserTitle, UserDesc } from 'view/Home/right/recommendPeople'
import { Api } from 'apis'
type Iprops = {
  show: boolean
  callback?: (data, type) => void
  type: 'user' | 'topic'
}
export const SearchPop = (props: Iprops) => {
  const [nicKName, setNickName] = useState('')
  const [nicKNameTimeId, setNicKNameTimeId] = useState(null)
  const [userList, setUserList] = useState([])
  const [topicValue, setTopicValue] = useState('')
  const [topicList, setTopicList] = useState([])
  const [topicTimeId, setTopicTimeId] = useState(null)
  const [isInit, setIsInit] = useState(true)
  const { show, type, callback } = props
  useEffect(() => {
    if (isInit) return setIsInit(false)
    if (nicKNameTimeId) { clearTimeout(nicKNameTimeId) }
    setNicKNameTimeId(setTimeout(() => {
      Api.UserApi.searchUser(nicKName).then(res => {
        if (Api.isSuccess(res)) {
          res.data && setUserList(res.data)
        }
      })
    }, 400))
  }, [nicKName])
  useEffect(() => {
    if (isInit) return setIsInit(false)
    if (topicTimeId) { clearTimeout(topicTimeId) }
    setTopicTimeId(setTimeout(() => {
      // Api.UserApi.searchUser(nicKName).then(res => {
      //   if (Api.isSuccess(res)) {
      //     res.data && setUserList(res.data)
      //   }
      // })
    }, 400))
  }, [topicValue])
  return (
    show ?
      <SearchPopBox>
        {
          type === 'user' ?
            <div className="search-box">
              <div className="title">
                <Icon name="icon-sousuo" margin="15px 0" size={20} color="#7393FF"></Icon>
                {
                  !!nicKName ?
                    <Icon cur name="icon-guanbi2fill" margin="15px 0" size={20} color="#4168ED" onClick={() => setNickName('')}></Icon>
                    : null
                }
                <input placeholder="昵称搜索" value={nicKName} onChange={(e) => setNickName(e.target.value)} type="text" />
              </div>
              <div className="search-res-list">
                {
                  userList.map((item, index) => (
                    <Flex key={item.uid} className="search-res-list-item" onClick={(e) => callback(item, type)}>
                      <Avatar src={item.nft_image} style={{ width: '50px', height: '50px' }} scale="md" />
                      <div style={{ flex: 1 }}>
                        <Flex >
                          <UserTitle style={{ flex: 1 }} title={item.nick_name}>{item.nick_name}</UserTitle>
                          <Icon name="icon-dunpai" margin="5px 0px 0px -10px" size={15} color="#699a4d"></Icon>
                        </Flex>
                        <UserDesc title={item.introduction}>{item.introduction}</UserDesc>
                      </div>
                    </Flex>
                  ))
                }
              </div>
            </div>
            : null
        }
        {
          type === 'topic' ?
            <div className="search-box">
              <div className="title">
                <Icon name="icon-sousuo" margin="15px 0" size={20} color="#7393FF"></Icon>
                {
                  !!topicValue ?
                    <Icon cur name="icon-guanbi2fill" margin="15px 0" size={20} color="#4168ED" onClick={() => setTopicValue('')}></Icon>
                    : null
                }
                <input type="text" placeholder="话题搜索" value={topicValue} onChange={(e) => setTopicValue(e.target.value)} />
              </div>
              <div className="search-res-list">
                {
                  Array(13).fill(null).map((item, index) => (
                    <Flex key={index} className="search-res-list-item" onClick={(e) => callback({}, type)}>
                      <Avatar src={'https://avatars.githubusercontent.com/u/8140841?v=4'} style={{ width: '50px', height: '50px' }} scale="md" />
                      <div style={{ flex: 1 }}>
                        <Flex >
                          <UserTitle style={{ flex: 1 }} title={index + '我是名字'}>{index + '我是名1111111111111111111111111111111111111111字'}</UserTitle>
                          <Icon name="icon-dunpai" margin="5px 0px 0px -10px" size={15} color="#699a4d"></Icon>
                        </Flex>
                        <UserDesc title={index + '我是desc'}>{index + '我是desc'}</UserDesc>
                      </div>
                    </Flex>
                  ))
                }
              </div>
            </div>
            : null}
      </SearchPopBox>
      : null
  )
}

