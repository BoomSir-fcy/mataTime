import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Editor, Crumbs } from 'components';
import { Flex, Box } from 'uikit';
import { useToast } from 'hooks';
import { storeAction, useStore } from 'store';
import { Api } from 'apis';

import { useTag } from './hook';

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
  const { match } = props;
  const { t } = useTranslation();
  const { replace } = useHistory();
  const { pathname } = useLocation();
  const { getUserTag } = useTag();
  const parsedQs = useParsedQueryString();
  const dispatch = useDispatch();
  const attention = useStore(p => p.post.attention);
  const userTags = useStore(p => p.post.userTags);
  const userTag = useStore(p => p.post);
  const { user_tags1, user_tags2 } = userTag;
  const [refresh, setRefresh] = useState(false);
  const [getTab, setGetTab] = useState(!userTags.length);
  const [filterVal, setFilterVal] = useState({
    attention: parsedQs.attention || attention || 2,
  });
  // const [userTags, setUserTags] = useState([]);
  const articleRefs = React.useRef(null);
  const tabsRefs = React.useRef(null);
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
    const params = item?.tabs ? `&type=${item.tabs}` : '';
    replace(`${pathname || ''}?attention=${item.value}${params}`);
    dispatch(
      storeAction.postUpdateArticleParams({
        attention: item.value,
        user_tags1: [...user_tags1],
        user_tags2: [...user_tags2],
        page: 1,
      }),
    );
    temp[item.paramsName] = item.value;
    setFilterVal(temp);
    setRefresh(!refresh);
  };

  const getTags = async () => {
    try {
      const res = await getUserTag();
      // setUserTags(res);
      dispatch(storeAction.postSetUserTags(res))
    } catch (error) {
      console.log(error);
    } finally {
      setGetTab(false);
    }
  };

  React.useEffect(() => {
    getTags();
  }, []);

  const toTop = () => {
    articleRefs?.current?.reload(1);
  };

  return (
    <PageContainer>
      <Flex justifyContent='space-between' width='100%'>
        <CenterCard>
          <Crumbs
            top
            zIndex={1005}
            callBack={() => toTop()}
            title={t('homeHeaderTitle')}
          />
          <Editor type='post' sendArticle={sendArticle} />
          <Tabs
            ref={tabsRefs}
            tags={userTags}
            tabsChange={tabsChange}
            params={parsedQs.type}
            defCurrentLeft={Number(parsedQs.attention) || attention || 2}
          />
          {/* {( */}
          {!getTab && (
            <ArticleList
              key={refresh}
              ref={articleRefs}
              setNonce={setNonce}
              nonce={nonce}
              topicName={match.params.name}
              filterValObj={filterVal}
              {...props}
            />
          )}
        </CenterCard>
      </Flex>
    </PageContainer>
  );
};

export default withRouter(Home);
