import React, { useState } from 'react'
import styled from "styled-components";
import { Flex, Button ,Box} from 'uikit'
import { Avatar ,Icon} from 'components';
// import MentionItem from 'view/News/components/MentionItem';
import {Link} from 'react-router-dom'
import {relativeTime} from 'utils'
const ArticleListBox  = styled.div`
color:#fff;
`
const ArticleListItem  = styled(Box)`
margin-top:12px;
background-color:#191F2D;
border-radius:10px;
padding-top:30px;
:hover{
  background-color: #1F2534;
  transition:all 0.3s;
}
img{ 
  margin-left:30px;
}
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
const ArticleContent = styled(Box)`
padding-right:30px;
margin:20px 0;
`
const ArticleFooter  = styled(Flex)`
margin-left:100px;
align-items:center;
height:60px;
color:#B5B5B5;
& div{
  padding:  10px;
  margin-right:30px;
}
`
const FollowBtn  = styled(Button)`
margin-right:15px;
font-size: 14px;
font-weight: bold;
`
export const ArticleList = (props) => {
  const goDetils=(e)=>{
    if(props.location.pathname==='/articleDetils')return
    props.history.push('/articleDetils')
  }
  return(
    <ArticleListBox>
      {
        props.data.map((item,index)=>(
          // <MentionItem key={index} index={index}></MentionItem>
          <ArticleListItem key={index} style={props.style}>
            <Flex>
              <Avatar src="" style={{width:'50px',height:'50px'}} scale="md"/>
              <div style={{flex:1,marginLeft:'22px'}}>
                <ArticleHeader justifyContent="space-between">
                  <Flex>
                    <div>
                      <div>慢渴死</div>
                      <div className="relative-time">{relativeTime('2020')}</div>
                    </div>
                    {index===0? 
                    <div className="topic">
                      <Icon name="icon-xingqiu" margin="0 10px 0 0" color="#7393FF"></Icon>
                      老表的吃货天堂
                    </div>:''}
                  </Flex>
                  <Flex>
                    <FollowBtn>+关注</FollowBtn>
                    {/* <Popper> */}
                       <Icon name="icon-gengduo" margin="8px 15px 0 0"color="#7E7E7E"></Icon>
                    {/* </Popper> */}
                  </Flex>
                </ArticleHeader>
                <ArticleContent onClick={(e)=>{goDetils(e)}}>
                    #New project# We recently passed 10,000 followers  As a thank y#New project# We recently passed 10,000 followers  As a thank y
                </ArticleContent>
              </div>
            </Flex>
            <ArticleFooter>
                <div> <Icon name="icon-retweet" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
                <div><Icon name="icon-pinglun" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
                <div><Icon name="icon-aixin" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
              </ArticleFooter>
          </ArticleListItem>
        ))
      }
    </ArticleListBox>
  )
}
ArticleList.defaultProps={
  data:Array(6).fill(null)
}