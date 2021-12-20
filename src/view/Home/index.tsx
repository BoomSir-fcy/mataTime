import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor, Crumbs } from 'components';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts/Localization';
import { Flex, Box } from 'uikit';
import { Header, Tabs, ArticleList } from './center';

import { Api } from 'apis';

const PageContainer = styled(Box)`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  background: ${({ theme }) => theme.colors.primaryDark};
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
  const { replace } = useHistory()
  const { path } = useLocation()
  const parsedQs = useParsedQueryString()
  const [refresh, setRefresh] = useState(false);
  const [filterVal, setFilterVal] = useState({
    attention: parsedQs.attention || 2,
  });
  const { toastError } = useToast();
  // const  editorRef = useRef();

  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);

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
      }
    } catch (error) {
      console.error(error);
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
    const temp = {
      ...filterVal
    };

    replace(`${path || ''}?attention=${item.value}`)
    temp[item.paramsName] = item.value;
    setFilterVal(temp);
    setRefresh(!refresh);
  };

  const { match } = props;

  return (
    <PageContainer>
      <Flex justifyContent="space-between" width="100%">
        <CenterCard>
          <Crumbs zIndex={1005} title={t('homeHeaderTitle')} />
          <Editor type="post" sendArticle={sendArticle} />
          <Tabs tabsChange={tabsChange} defCurrentLeft={Number(parsedQs.attention || 2) - 1} />
          <ArticleList
            setNonce={setNonce}
            nonce={nonce}
            key={refresh}
            topicName={match.params.name}
            filterValObj={filterVal}
            {...props}
          />
        </CenterCard>
      </Flex>
    </PageContainer>
  );
};

export default withRouter(Home);
