import React,{ useState, useEffect} from 'react';
import styled from "styled-components";
import {Flex,Box,Button} from 'uikit'
import { Avatar,Icon } from 'components';
import {Api} from 'apis'
import { toast } from 'react-toastify';
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
flex:1;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
font-size: 16px;
color: #7393FF;
cursor: pointer;
:hover{
  text-decoration: underline;
  transition:all 0.3s;
}
`
const HotCount = styled.span`
font-size: 16px;
min-width:80px;
color: #B5B5B5;
`
const HotItem = styled(Flex)`
margin-top:20px;
`
export  const HotTopic:React.FC = ()=>{
  const [page,setPage]= useState(1)
  const [hotTopicList,setHotTopicList]= useState([])
  useEffect(()=>{
    getList(false)
  },[])
  const getList = (isToast)=>{
    Api.HomeApi.queryHotTopic({page}).then(res=>{
      if(Api.isSuccess(res)){
        setHotTopicList(res.data.List)
        if(isToast){
          toast.success('刷新成功')
        }
      }
    })
  }
  return (
    <HotTopicBox>
      <Flex justifyContent="space-between">
        <TitleText>热门话题</TitleText>
        <Icon cur onClick={getList.bind(this,true)} name="icon-jiazai_shuaxin" margin="0"color="#7393FF"></Icon>
      </Flex>
      <Box>
        {
         hotTopicList.map((item,index)=>(
            <HotItem key={item.tid} justifyContent="space-between">
              <Hot>#{item.topic_name}#</Hot>
              <HotCount>{item.post_num>50?50:item.post_num}+条内容</HotCount>
            </HotItem>
          ))
        }
      </Box>
    </HotTopicBox>
  )
}