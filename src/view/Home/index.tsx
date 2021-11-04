import React,{ useState, useRef} from 'react';
import styled from "styled-components";
import { About, Avatar, Editor, ModalWrapper } from 'components';
import {Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Flex ,Box} from 'uikit';
import {Menu}  from './left';
import {Header ,Tabs,ArticleList}  from './center';
import {Search,Swap,RecommendPeople,HotTopic,FooterCopyright}  from './right';
import { mediaQueries, mediaQueriesSize } from "uikit/theme/base";
// const NewsMe = React.lazy(() => import('view/News/Me'));
import {Api} from 'apis'

const PageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 35px;
  display:flex;
justify-content:center;
`
const LeftCard = styled(Flex)`
  // width: 375px;
`
const CenterCard = styled(Box)`
  // flex: 1;
  ${mediaQueriesSize.marginLRmd}
  width:670px;
`
const RightCard = styled.div`
  // width: 375px;
`

const FollowContainer = styled.div`
  padding: 36px;
`

const FollowTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF;
`

const FollowBody = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #FFFFFF;
  margin: 25px 0 38px;
  line-height: 1.5;
  a {
    color: rgba(65, 104, 237, 1);
  }
`

const CancelFollow = () => {
  return (
    <FollowContainer>
      <FollowTitle>是否取消关注Ta?</FollowTitle>
      <FollowBody>
        <Avatar src="" />
        屏蔽用户<a>@0x5...684</a>，将无法获取查看Ta的最 新动态、信息，屏蔽后可在“个人主页”取消 屏蔽
      </FollowBody>
      <div className="button">
        <button>确认</button>
        <button>取消</button>
      </div>
    </FollowContainer>
  )
}
const Home: React.FC = (props) => {
  const [refresh,setRefresh] = useState(false)
  // const  editorRef = useRef()
  const  sendArticle=(content:string,resetInput:() => void,image_urls)=>{
    if(!content)return false
    Api.HomeApi.createArticle({
      content:content,
      image_urls: image_urls
    }).then(res=>{
      if(res.code === 1){
        setRefresh(!refresh)
        resetInput()
      }
      if(res.code ===0){
        toast.error(res.msg, {
          position: toast.POSITION.TOP_RIGHT
        })    
      }
    })
  }
  return (
    <PageContainer>
      <Flex justifyContent="space-between">
        <LeftCard>
          {/* <About /> */}
          <Menu></Menu>
        </LeftCard>
        <CenterCard>
          <Header {...props}></Header>
          <Editor type="post" sendArticle={sendArticle}></Editor>
          <Tabs></Tabs>
          {/* <NewsMe {...props}></NewsMe> */}
          <ArticleList key={refresh} {...props}></ArticleList>
        </CenterCard>
        <RightCard>
          <Search></Search>
          <Swap></Swap>
          <RecommendPeople></RecommendPeople>
          <HotTopic></HotTopic>
          <FooterCopyright></FooterCopyright>
        </RightCard>
      </Flex>
      {/* <ModalWrapper>
          <button>Open Modal</button>
        <CancelFollow />
      </ModalWrapper> */}
    </PageContainer>
  )
}

export default Home;