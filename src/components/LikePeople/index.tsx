import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components';
import { Desc, Name, Rows, Decoration, AboutWarpper } from '../Profile/about'
import {HotWords} from '../HotWords'
import { Avatar } from '..';
import { Box, Flex, Text, Button } from 'uikit';
import { mediaQueriesSize } from "uikit/theme/base";
import { Certification } from '../Profile/certification';

const FaceRows = styled(Flex)`
  justify-content: space-between;
  ${mediaQueriesSize.margint}
`

export const Title = styled(Box)`
  color: white;
`
export const Use = styled(Box)`
  color: #4168ED;
`

const PeopleMsg = (() => {
  const peopleRef = useRef()
  const people = [
    { avatar:'#', name: '曼克斯', allow: true, isFollow: true, msg: '@0x32...9239'},
    { avatar:'#', name: '曼克斯', allow: false, isFollow: false, msg: '@0x32...9239'},
    { avatar:'#', name: '曼克斯', allow: true, isFollow: false, msg: '@0x32...9239'}
  ]
  const [peopleState, setPeopleState ] = useState(people)
  // 关注
  const setPeople = useCallback((index) => {
    const res = peopleState.map((item, subIndex) => {
      if (index === subIndex) {
        return {
          ...item,
          isFollow: !item.isFollow
        }
      }
      return {
        ...item
      }
    })
    setPeopleState(res)
  }, [peopleState])
  return (<>
    {
      peopleState.map((item,index) => {
        return (
          <div ref={peopleRef}>
            <FaceRows>
              <Avatar src={item.avatar} scale="md" />
              <Desc>
                <Rows justifyContent="space-between">
                  <div>
                    <Rows>
                      <Name>{item.name}</Name>
                      {
                        item.allow === true ? (<Certification/>) : null
                      }
                    </Rows>
                    <Decoration>{item.msg}</Decoration>
                  </div>
                  <Button style={{background:(!item.isFollow)?'#4D535F':null}} onClick={()=>setPeople(index)}>{item.isFollow?'已关注':'取消关注'}</Button>
                </Rows>
              </Desc>
            </FaceRows>
          </div>
        )
      })
    }
  </>)
})

export const LikePeople = (() => {
  return (
    <div>
      <AboutWarpper style={{height:'380px',width:'330px'}}>
        <Rows justifyContent="space-between">
          <Title>可能感兴趣的人</Title>
          <Use><a href="#">更多</a></Use>
        </Rows>
        <PeopleMsg />
      </AboutWarpper>
      <div style={{marginTop:'24px'}}><HotWords/></div>
    </div>
  )
})

