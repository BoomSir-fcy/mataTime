import React,{ useState, useRef} from 'react';
import styled from "styled-components";
import {Flex,Box,Button} from 'uikit'
import { Avatar } from 'components/Avatar';

const HotTopicBox = styled.div`
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
const Hot = styled.span`
font-size: 16px;
color: #7393FF;
`
const HotCount = styled.span`
font-size: 16px;
color: #B5B5B5;
`
const HotItem = styled(Flex)`
margin-top:20px;
`
export  const HotTopic:React.FC = ()=>{
  return (
    <HotTopicBox>
      <Flex justifyContent="space-between">
        <TitleText>热门话题</TitleText>
        <span>刷新icon</span>
      </Flex>
      <Box>
        {
          Array(5).fill(null).map((item,index)=>(
            <HotItem key={index} justifyContent="space-between">
              <Hot>#比特币突破10万...#</Hot>
              <HotCount>50+条内容</HotCount>
            </HotItem>
          ))
        }
      </Box>
    </HotTopicBox>
  )
}