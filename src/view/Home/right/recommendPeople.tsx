import React,{ useState, useRef} from 'react';
import styled from "styled-components";
import {Flex,Box,Button} from 'uikit'
import { Avatar,Icon } from 'components';

const RecommendPeopleBox = styled.div`
margin-top: 15px;
  padding:20px 18px;
  width: 298px;
  background: #191F2D;
  border-radius: 10px;
`
const TitleText = styled.span`
font-weight: bold;
color: #FFFFFF;
font-size: 18px;
`
const MoreBtn = styled.span`
font-size: 14px;
color: #7393FF;
`
const UserTitle  = styled.div`
margin:0 12px;
  font-weight:700;
  font-size:18px;
  color:#fff;
}
`
const UserDesc  = styled.div`
margin:0 12px;
font-size: 16px;
font-weight: 400;
color: #B5B5B5;
`
const FollowBtn  = styled(Button)`
margin-left:22px;
font-size: 14px;
font-weight: bold;
`
export  const RecommendPeople:React.FC = ()=>{
  return (
    <RecommendPeopleBox>
      <Flex justifyContent="space-between">
        <TitleText>可能感兴趣的人</TitleText>
        <MoreBtn>更多</MoreBtn>
      </Flex>
      {
        Array(3).fill(null).map((item,index)=>(
          <Flex key={index} alignItems="center" style={{marginTop:'17px'}}>
            <Avatar src="" style={{width:'50px',height:'50px'}} scale="md"/>
            <Box>
              <UserTitle>
              曼克斯
                    <Icon name="icon-dunpai" margin="0 0 0 5px" size={15} color="#699a4d"></Icon>
              </UserTitle>
              <UserDesc>@0x3...d39</UserDesc>
            </Box>
            <FollowBtn>+关注</FollowBtn>
          </Flex>
        ))
      }
    </RecommendPeopleBox>
  )
}