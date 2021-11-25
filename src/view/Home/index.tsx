import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor, Affix } from 'components';
import { withRouter } from 'react-router-dom';
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
      } else {
        // toast.error(res.msg, {
        //   position: toast.POSITION.TOP_RIGHT
        // })
      }
    });
  };

  const tabsChange = item => {
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
          <ArticleList key={refresh} filterValObj={filterVal} {...props} />
        </CenterCard>
        <RightCard>
          <Affix offsetTop={100} positionObj={{}}>
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
