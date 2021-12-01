import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor, Affix } from 'components';
import { withRouter } from 'react-router-dom';
import useReadArticle from 'contexts/ImContext/hooks/useReadArticle';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts/Localization';
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

import { Api } from 'apis';


const PageContainer = styled(Box)`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  display: flex;
`;
const LeftCard = styled(Flex)`
  width: 200px;
  height: 100vh;
  overflow: auto;
`;
const CenterCard = styled(Box)`
  width: 670px;
  flex: 1;
  margin: 0 15px;
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
const RightCard = styled(Flex)`
  width: 300px;
  height: 100vh;
  position: relative;
  overflow: auto;
`;

const Home: React.FC = (props: any) => {
  const { t } = useTranslation();
  useReadArticle()

  /**
   * @review
   * 看着想刷新 但在ArticleList传值是用的key
   */
  const [refresh, setRefresh] = useState(false);
  const [filterVal, setFilterVal] = useState({});
  const { toastError } = useToast();
  // const  editorRef = useRef();

  const sendArticle = async (
    content: string,
    image_urls,
    remind_user,
    resetInput: () => void
  ) => {
    if (!content) return false;
    try {
      const res = await Api.HomeApi.createArticle({
        content: content,
        image_urls: image_urls,
        remind_user
      });
      if (Api.isSuccess(res)) {
        setRefresh(!refresh);
        resetInput();
      } else {
        toastError(t('commonContactAdmin') || res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @review
   *
   * 1.未使用 useCallback
   * 2.写法不规范
   * @bug 未节流处理
   */
  const tabsChange = item => {
    console.log(item);
    const temp = {
      ...filterVal
    };
    temp[item.paramsName] = item.value;
    setFilterVal(temp);
    setRefresh(!refresh);
  };

  const { match } = props;

  return (
    <PageContainer>
      <Flex justifyContent="space-between" width="100%">
        <LeftCard>
          <Affix offsetTop={0} positionObj={{}}>
            <Menu />
          </Affix>
        </LeftCard>
        <CenterCard>
          {/**
           * @review
           * 1.代码分离不清晰
           * 2.同一页面使用差异性路由
           * 3.Header 组件应该为公共组件
           * 4.字符串拼接
           */}
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
          {/**
           * @review
           * 1.应该使用Route组件
           * 2.不应该在页面用这样的逻辑判断进行渲染 代码设计不合理
           */}
          {match.path === '/' ? (
            <>
              <Editor type="post" sendArticle={sendArticle}></Editor>
              <Tabs tabsChange={tabsChange}></Tabs>
            </>
          ) : null}
          {/* <NewsMe {...props}></NewsMe> */}
          <ArticleList
            key={refresh}
            topicName={match.params.name}
            filterValObj={filterVal}
            {...props}
          />
        </CenterCard>
        <RightCard>
          <Affix offsetTop={0} positionObj={{}}>
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
    </PageContainer>
  );
};

export default withRouter(Home);
