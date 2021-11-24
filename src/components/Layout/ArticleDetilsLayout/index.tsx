import React, { useState, useEffect } from 'react';
import { About, Avatar, Editor, ModalWrapper, Affix } from 'components';
import { useTranslation } from 'contexts/Localization'
import { Route } from 'react-router-dom'
import { Flex, Box } from 'uikit';
import { Menu } from 'view/Home/left';
import { Header, Tabs, ArticleList } from 'view/Home/center';
import { Search, Swap, RecommendPeople, HotTopic, FooterCopyright } from 'view/Home/right';
import { CommentList } from './CommentList';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import { toast } from 'react-toastify'

import {
  NewsMeWrapper,
  MeItemWrapper
} from 'view/News/Me/style';
import { Api } from 'apis'
import {
  PageContainer,
  LeftCard,
  CenterCard,
  RightCard
} from './style'
type Iprops = {
  [name: string]: any
}
export const ArticleDetilsLayout: React.FC = (props: Iprops) => {
  const { t } = useTranslation()
  const [itemData, setItemData] = useState<any>({})
  const [refresh, setRefresh] = useState(1)
  const sendArticle = (res, resetInput: () => void) => {
    console.log(res);
    if (!res) return
    Api.CommentApi.createComment({
      pid: itemData.id,
      comment: res,
    }).then(res => {
      if (res.code === 1) {
        toast.success(res.data)
        setRefresh(refresh === 1 ? 2 : 1)
        resetInput()
      }
    })
  }
  useEffect(() => {
    Api.HomeApi.articleFindById({ id: props.match.params.id }).then(res => {
      if (Api.isSuccess(res)) {
        setItemData(res.data)
        setRefresh(refresh === 1 ? 2 : 1)
      }
    })
  }, [])
  return (
    <PageContainer>
      <Flex justifyContent="space-between">
        <Affix offsetTop={100} positionObj={{
          top: '10px',
          left: '50%',
          marginLeft: '-550px'
        }}>
          <LeftCard>
            <Menu></Menu>
          </LeftCard>
        </Affix>
        <CenterCard>
          <Header back title={t('newsBack')} {...props}></Header>
          <MeItemWrapper>
            <MentionItem {...props} itemData={{
              ...itemData,
              post_id: itemData.id,
              post: {
                ...itemData,
                post_id: itemData.id
              }
            }} more={false} />
            <MentionOperator
              replyType="twitter"
              postId={itemData.id}
              itemData={{
                ...itemData, post_id: itemData.id, post: {
                  ...itemData
                }
              }} callback={(data) => {
                console.log(data);
                setItemData(data)
              }} />
          </MeItemWrapper>
          {/* <ArticleList data={[{}]} {...props} style={{marginBottom:'15px'}}></ArticleList> */}
          <Editor type="comment" sendArticle={sendArticle}></Editor>
          <CommentList key={refresh} itemData={itemData}></CommentList>
        </CenterCard>
        <Affix offsetTop={100} positionObj={{
          top: '10px',
          right: '50%',
          marginRight: '-660px'
        }}>
          <RightCard style={{
            marginTop: '-15px'
          }}>
            {/* <Search></Search> */}
            {/* <Swap></Swap> */}
            <RecommendPeople></RecommendPeople>
            <HotTopic {...props}></HotTopic>
            <FooterCopyright></FooterCopyright>
          </RightCard>
        </Affix>
      </Flex>
    </PageContainer>
  )
}
export default ArticleDetilsLayout