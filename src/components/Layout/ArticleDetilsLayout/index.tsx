import React from 'react';
import { About, Avatar, Editor, ModalWrapper } from 'components';
import {Route} from 'react-router-dom'
import { Flex ,Box} from 'uikit';
import {Menu}  from 'view/Home/left';
import {Header ,Tabs,ArticleList}  from 'view/Home/center';
import {Search,Swap,RecommendPeople,HotTopic,FooterCopyright}  from 'view/Home/right';
import {CommentList}  from './CommentList';
import {
  PageContainer,
  LeftCard,
  CenterCard,
  RightCard
} from './style'

export const ArticleDetilsLayout : React.FC = (props) => {
  return (
    <PageContainer>
      <Flex justifyContent="space-between">
        <LeftCard>
          <Menu></Menu>
        </LeftCard>
        <CenterCard>
          <Header title="返回" {...props}></Header>
          <ArticleList data={[{}]} {...props} style={{marginBottom:'15px'}}></ArticleList>
          <Editor></Editor>
          <CommentList></CommentList>
        </CenterCard>
        <RightCard>
          <Search></Search>
          <Swap></Swap>
          <RecommendPeople></RecommendPeople>
          <HotTopic></HotTopic>
          <FooterCopyright></FooterCopyright>
        </RightCard>
      </Flex>
    </PageContainer>
  )
}
