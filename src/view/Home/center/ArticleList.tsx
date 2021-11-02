import React, { useState ,useEffect} from 'react'
import styled from "styled-components";
import { Flex, Button, Box } from 'uikit'
import { Avatar, Icon ,List} from 'components';
// import MentionItem from 'view/News/components/MentionItem';
import { Link } from 'react-router-dom'
import { relativeTime } from 'utils'
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';

import {
  NewsMeWrapper,
  MeItemWrapper
} from 'view/News/Me/style';
import {Api} from 'apis'

const ArticleListBox = styled.div`
color:#fff;
`

export const ArticleList = (props) => {
  const goDetils = (e) => {
    if (props.location.pathname === '/articleDetils') return
    props.history.push('/articleDetils')
  }
  const [size,setSize] = useState(20)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [listData,setListData] = useState([])
  useEffect(() => {
    Api.HomeApi.getArticleList().then(res=>{
      console.log(res);
    })
  })
  return (
    <ArticleListBox>
      <List renderList={()=>{
        if(loading)return false
        console.log('哈哈');
      }}>
        <MeItemWrapper >
          <MentionItem {...props}>
          </MentionItem>
            <MentionOperator />
        </MeItemWrapper>
      {/* {
        props.data.map((item, index) => (
          // <MentionItem key={index} index={index}></MentionItem>
          <ArticleListItem key={index} style={props.style}>
            <Flex>
              <Avatar src="" style={{ width: '50px', height: '50px' }} scale="md" />
              <div style={{ flex: 1, marginLeft: '22px' }}>
                <ArticleHeader justifyContent="space-between">
                  <Flex>
                    <div>
                      <div>慢渴死</div>
                      <div className="relative-time">{relativeTime('2020')}</div>
                    </div>
                    {index === 0 ?
                      <div className="topic">
                        <Icon name="icon-xingqiu" margin="0 10px 0 0" color="#7393FF"></Icon>
                        老表的吃货天堂
                      </div> : ''}
                  </Flex>
                  <Flex>
                    <FollowBtn>+关注</FollowBtn>
                    <Icon name="icon-gengduo" margin="8px 15px 0 0" color="#7E7E7E"></Icon>
                  </Flex>
                </ArticleHeader>
                <ArticleContent onClick={(e) => { goDetils(e) }}>
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
      } */}
      </List>
    </ArticleListBox>
  )
}
ArticleList.defaultProps = {
  data: Array(6).fill(null)
}