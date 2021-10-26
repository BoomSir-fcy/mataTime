import React from 'react';
import { Avatar, Icon } from 'components';
import { Flex, Button, Box } from 'uikit'
import { relativeTime } from 'utils'
import { SortIcon } from './SortIcon'

import {
  CommentListBox,
  CommentTitle,
  CommentItem,
  CommentHeader,
  CommentContent,
  CommentFooter,
  CommentListFooter
} from './style'

export const CommentList: React.FC = () => {
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
      {Array(3).fill(null).map(item => (
        <CommentItem key={item}>
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
                    回复 <span>@曼克斯</span> 和 <span>@others</span>
                  </div>
                </Flex>
                <Flex>
                  <Icon name="icon-gengduo" margin="8px 15px 0 0" color="#7E7E7E"></Icon>
                </Flex>
              </CommentHeader>
              <CommentContent >
                #New project# We recently passed 10,000 followers  As a thank y#New project# We recently passed 10,000 followers  As a thank y
              </CommentContent>
            </div>
          </Flex>
          <CommentFooter>
            <div> <Icon name="icon-retweet" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
            <div><Icon name="icon-pinglun" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
            <div><Icon name="icon-aixin" margin="5px 10px 0 0" size={18} color="#7E7E7E"></Icon>36</div>
          </CommentFooter>
        </CommentItem>
      ))}
      <CommentListFooter>没有更多内容了</CommentListFooter>
    </CommentListBox>
  )
}