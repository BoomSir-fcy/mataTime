import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { About, Avatar, Editor, ModalWrapper,Affix } from 'components';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import { ToastContainer, toast } from 'react-toastify';
import { Flex, Box } from 'uikit';
import { Menu } from './left';
import { Header, Tabs, ArticleList } from './center';
import {
  Search,
  Swap,
  RecommendPeople,
  HotTopic,
  FooterCopyright
} from './right';
import { mediaQueries, mediaQueriesSize } from 'uikit/theme/base';
// const NewsMe = React.lazy(() => import('view/News/Me'));
import { Api } from 'apis';

const PageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 35px;
  display: flex;
  justify-content: center;
`;
const LeftCard = styled(Flex)`
  // width: 375px;
`;
const CenterCard = styled(Box)`
  // flex: 1;
  ${mediaQueriesSize.marginLRmd}
  width:670px;
`;
const RightCard = styled.div`
  // width: 375px;
`;

const Home: React.FC = (props: any) => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  const [filterVal, setFilterVal] = useState({});
  // const  editorRef = useRef()
  const sendArticle = (
    content: string,
    resetInput: () => void,
    image_urls,
    remind_user
  ) => {
    if (!content) return false;
    Api.HomeApi.createArticle({
      content: content,
      image_urls: image_urls,
      remind_user
    }).then(res => {
      if (Api.isSuccess(res)) {
        setRefresh(!refresh);
        resetInput();
      }else{
        // toast.error(res.msg, {
        //   position: toast.POSITION.TOP_RIGHT
        // })
      }
    });
  };
  const tabsChange = (item)=>{
    console.log(item);
    
    const temp = {
      ...filterVal
    }
    temp[item.paramsName] = item.value
    setFilterVal(temp)
    setRefresh(!refresh)
  }
  const { match } = props;
  return (
    <PageContainer>
      <Flex justifyContent="space-between">
        <LeftCard>
          {/* <About /> */}
          <Affix offsetTop={100} positionObj={{
              top:'10px',
              left:'390px'
            }}>
            <Menu />
          </Affix>
        </LeftCard>
        <CenterCard>
          <Header
            {...props}
            back={match.path === '/topicList/:id/:name'}
            align={match.path === '/topicList/:id/:name' ? 'center' : null}
            title={
              match.path === '/topicList/:id/:name'
                ? '#' + match.params.name + '#'
                : t('homeHeaderTitle')
            }
          />
          {match.path === '/' ? (
            <>
              <Editor type="post" sendArticle={sendArticle}></Editor>
              <Tabs tabsChange={tabsChange}></Tabs>
            </>
          ) : null}
          {/* <NewsMe {...props}></NewsMe> */}
          <ArticleList key={refresh} filterValObj={filterVal} {...props}></ArticleList>
        </CenterCard>
        <RightCard>
        <Affix offsetTop={100} positionObj={{
              top:'10px',
              right:'280px'
            }}>
              <>
              <Search />
              {/* 代办,从这监听搜索,然后参数传给ArticleList,进行搜索 */}
              <Swap />
              <RecommendPeople />
              <HotTopic {...props} />
              <FooterCopyright />
          </>
          </Affix>
        </RightCard>
      </Flex>
      {/* <ModalWrapper>
          <button>Open Modal</button>
        <CancelFollow />
      </ModalWrapper> */}
    </PageContainer>
  );
};

export default withRouter(Home);
