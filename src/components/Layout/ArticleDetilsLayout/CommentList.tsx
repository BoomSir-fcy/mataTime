import React,{ useState,useEffect} from 'react';
import { Avatar, Icon } from 'components';
import { Flex, Button, Box } from 'uikit'
import { relativeTime } from 'utils'
import { SortIcon } from './SortIcon'
import MentionOperator from 'view/News/components/MentionOperator';
import { FollowPopup, MorePopup } from 'components'
import {Api} from 'apis'
import {
  CommentListBox,
  CommentTitle,
  CommentItem,
  CommentHeader,
  CommentContent,
  // CommentFooter,
  CommentListFooter
} from './style'
type Iprops = {
  itemData:any
}
export const CommentList: React.FC<Iprops> = (props:Iprops) => {
  useEffect(()=>{
    // Api.CommentApi.getCommentList().then(res=>{
    //   console.log(res);
    // })
  },[])
  return (
    <CommentListBox>
      <CommentTitle justifyContent="space-between" alignItems="center">
        <span>评论</span>
        <div className="sort-box">
          <div>
            热度 <SortIcon></SortIcon>
          </div>
          <div>
            时间 <SortIcon></SortIcon>
          </div>
        </div>
      </CommentTitle>
      {Array(3).fill(null).map((item,index) => (
        <CommentItem key={index}>
          <Flex>
            <Avatar src="" style={{ width: '50px', height: '50px' }} scale="md" />
            <div style={{ flex: 1, marginLeft: '22px' }}>
              <CommentHeader justifyContent="space-between">
                <Flex>
                  <div>
                    <div>慢渴死</div>
                    <div className="relative-time">{relativeTime('2020')}</div>
                  </div>
                  <div className="reply">
                    回复 和 
                    <FollowPopup>
                      <span>@曼克斯</span>
                    </FollowPopup>
                    <FollowPopup>
                      <span>@others</span>
                    </FollowPopup>
                  </div>
                </Flex>
                <Flex>
                <MorePopup>
                  <Icon name="icon-gengduo" margin="8px 15px 0 0" color="#7E7E7E"></Icon>
              </MorePopup>
                </Flex>
              </CommentHeader>
              <CommentContent >
                #New project# We recently passed 10,000 followers  As a thank y#New project# We recently passed 10,000 followers  As a thank y
              </CommentContent>
            </div>
          </Flex>
          <MentionOperator itemData={new Object()} ></MentionOperator>
          {/* <CommentFooter>
            <div> <Icon name="icon-retweet" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
            <div><Icon name="icon-pinglun" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
            <div><Icon name="icon-aixin" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
          </CommentFooter> */}
        </CommentItem>
      ))}
      <CommentListFooter>没有更多内容了</CommentListFooter>
    </CommentListBox>
  )
}