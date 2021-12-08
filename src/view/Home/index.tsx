import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor, Crumbs } from 'components';
import { withRouter } from 'react-router-dom';
import useReadArticle from 'contexts/ImContext/hooks/useReadArticle';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts/Localization';
import { Flex, Box } from 'uikit';
import { Menu } from './left';
import { Header, Tabs, ArticleList } from './center';

import { Api } from 'apis';

const PageContainer = styled(Box)`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
`;
const LeftCard = styled(Flex)`
  width: 200px;
  height: 100vh;
  overflow: auto;
`;
const CenterCard = styled(Box)`
  /* width: 670px; */
  width: 100%;
  flex: 1;
  /* margin: 0 15px; */
  /* border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor}; */
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
  const { toastError } = useToast();
  // const  editorRef = useRef();

  // 阅读文章扣费
  const [readFlag, setReadFlag] = useState(0)
  useReadArticle(readFlag);

  const sendArticle = async (content: string, image_urls, remind_user) => {
    if (!content) return false;
    try {
      const res = await Api.HomeApi.createArticle({
        content: content,
        image_urls: image_urls,
        remind_user
      });
      if (Api.isSuccess(res)) {
        setRefresh(!refresh);
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
        {/* <LeftCard>
          <Affix offsetTop={0} positionObj={{}}>
            <Menu />
          </Affix>
        </LeftCard> */}
        <CenterCard>
          {/**
           * @review
           * 1.代码分离不清晰
           * 2.同一页面使用差异性路由
           * 3.Header 组件应该为公共组件
           * 4.字符串拼接
           */}
          {/* <Header {...props} title={t('homeHeaderTitle')} /> */}
          <Crumbs title={t('homeHeaderTitle')} />
          <Editor type="post" sendArticle={sendArticle} />
          <Tabs tabsChange={tabsChange} />
          {/* <NewsMe {...props}></NewsMe> */}
          <ArticleList
            setReadFlag={setReadFlag}
            readFlag={readFlag}
            key={refresh}
            topicName={match.params.name}
            filterValObj={filterVal}
            {...props}
          />
        </CenterCard>
        {/* <RightCard>
          <Affix offsetTop={0} positionObj={{}}>
            <>
              <Search />
              <Swap />
              <RecommendPeople />
              <HotTopic {...props} />
              <FooterCopyright />
            </>
          </Affix>
        </RightCard> */}
      </Flex>
    </PageContainer>
  );
};

export default withRouter(Home);
