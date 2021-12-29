import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Editor, Crumbs } from 'components';
import { Flex, Box } from 'uikit';
import { useToast } from 'hooks';
import { storeAction, useStore } from 'store';
import { Api } from 'apis';

import useIm from 'hooks/imHooks/useIm';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useTranslation } from 'contexts/Localization';

import { Header, Tabs, ArticleList } from './center';

const PageContainer = styled(Box)`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
`;
const CenterCard = styled(Box)`
  width: 100%;
  flex: 1;
`;

const Home: React.FC = (props: any) => {
  const { t } = useTranslation();
  const { replace } = useHistory();
  const { pathname } = useLocation();
  const parsedQs = useParsedQueryString();
  const dispatch = useDispatch();
  const attention = useStore(p => p.post.attention);
  const [refresh, setRefresh] = useState(false);
  const [filterVal, setFilterVal] = useState({
    attention: parsedQs.attention || attention || 2,
  });
  const articleRefs = React.useRef(null);

  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);

  const sendArticle = async (content: string, image_urls, remind_user) => {
    if (!content) return false;
    try {
      const res = await Api.HomeApi.createArticle({
        content: content,
        image_urls: image_urls,
        remind_user,
      });
      if (Api.isSuccess(res)) {
        // setRefresh(!refresh);
        articleRefs?.current?.reload(1);
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
      ...filterVal,
    };
    // setArticleIds({})
    replace(`${pathname || ''}?attention=${item.value}`);
    temp[item.paramsName] = item.value;
    dispatch(
      storeAction.postUpdateArticleParams({ attention: item.value, page: 1 }),
    );
    setFilterVal(temp);
    setRefresh(!refresh);
  };

  const { match } = props;

  return (
    <PageContainer>
      <Flex justifyContent='space-between' width='100%'>
        <CenterCard>
          <Crumbs zIndex={1005} title={t('homeHeaderTitle')} />
          <Editor type='post' sendArticle={sendArticle} />
          <Tabs
            tabsChange={tabsChange}
            defCurrentLeft={Number(parsedQs.attention) || attention || 2}
          />
          <ArticleList
            key={refresh}
            ref={articleRefs}
            setNonce={setNonce}
            nonce={nonce}
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
