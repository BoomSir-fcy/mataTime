import React, { useState } from 'react'
import styled from "styled-components";
import { Flex, Button ,Box} from 'uikit'
import { Avatar } from 'components/Avatar';

const ArticleListBox  = styled.div`
width:670px;
color:#fff;
`
const ArticleListItem  = styled(Flex)`
margin-top:12px;
background-color:#191F2D;
border-radius:10px;
padding:30px 0 0 30px;
`
const ArticleHeader  = styled(Flex)`
.relative-time{
  margin-top:8px;
  font-size: 14px;
  color: #B5B5B5;
}
.topic{
  display:flex;
  align-items: center;
  margin-left:27px;
  padding:0 10px;
  height:35px;
  font-size: 14px;
  color: #FFFFFF;
  border: 2px solid #4168ED;
  border-radius: 10px;
}
`
const ArticleContent  = styled(Box)`
margin:20px 0;
`
const ArticleFooter  = styled(Flex)`
align-items:center;
height:60px;
color:#B5B5B5;
& div{
  padding:  10px;
}
`
const FollowBtn  = styled(Button)`
margin-right:26px;
font-size: 14px;
font-weight: bold;
`
export const ArticleList = () => {
  return(
    <ArticleListBox>
      {
        Array(6).fill(null).map((item,index)=>(
          <ArticleListItem key={index}>
            <Avatar src="" style={{width:'50px',height:'50px'}} scale="md"/>
            <div style={{flex:1,marginLeft:'22px'}}>
              <ArticleHeader justifyContent="space-between">
                <Flex>
                  <div>
                    <div>慢渴死</div>
                    <div className="relative-time">5小时前</div>
                  </div>
                 {index===0? 
                 <div className="topic">
                    icon
                    老表的吃货天堂
                  </div>:''}
                </Flex>
                <Flex>
                  <FollowBtn>+关注</FollowBtn>
                </Flex>
              </ArticleHeader>
              <ArticleContent>#New project# We recently passed 10,000 followers  As a thank y#New project# We recently passed 10,000 followers  As a thank y</ArticleContent>
              <ArticleFooter>
                <div>评论36</div>
                <div>转发36</div>
                <div>喜欢36</div>
              </ArticleFooter>
            </div>
          </ArticleListItem>
        ))
      }
    </ArticleListBox>
  )
}