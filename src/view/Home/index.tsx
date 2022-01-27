import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter, useHistory, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToast } from 'hooks';
import { Editor, Crumbs, Icon, SendPost, VerifyCode } from 'components';
import { Flex, Box, Button } from 'uikit';
import { isApp } from 'utils/client';
import { storeAction, useStore } from 'store';
import { Api } from 'apis';

import { useTag } from './hook';

import useParsedQueryString from 'hooks/useParsedQueryString';
import { useTranslation } from 'contexts/Localization';

import { Tabs, ArticleList } from './center';

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
  const { toastError } = useToast();
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
  // 用户输入验证码
  const verifyRef = React.useRef(null);
  const [verifyState, setVerifyState] = useState({
    verifyVisible: false,
    id: '',
    verify: '',
    post: {
      content: '',
      image_urls: [],
      remind_user: '',
    } as any,
  });

  // useReadArticle(nonce);
  const sendArticle = async (
    content,
    image_urls,
    remind_user,
    reset,
    id,
    verify,
  ) => {
    if (!content) return false;
    try {
      const res = await Api.HomeApi.createV2Article({
        content: content,
        image_urls: image_urls,
        remind_user,
        id,
        verify,
      });
      if (Api.isSuccess(res)) {
        reset && reset();
        articleRefs?.current?.reload(1);
        setVerifyState({
          ...verifyState,
          verifyVisible: false,
        });
      } else if (res.code === 30004019) {
        setVerifyState({
          ...verifyState,
          verifyVisible: true,
          post: {
            content: content,
            image_urls: image_urls,
            remind_user,
            reset,
          },
        });
      } else if (res.code === 30004020) {
        toastError('验证码错误');
        verifyRef.current?.reload();
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

  React.useEffect(() => {
    const getTags = async () => {
      try {
        const res = await getUserTag();
        // setUserTags(res);
        dispatch(storeAction.postSetUserTags(res));
      } catch (error) {
        console.error(error);
      } finally {
        setGetTab(false);
      }
    };
    getTags();
  }, [dispatch, getUserTag, setGetTab]);

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
          >
            <Flex>
              <Link className='hide-media-md' to='/swap'>
                <Button variant='text'>
                  <Icon
                    name='icon-duihuan1'
                    size={20}
                    color='white_black'
                  ></Icon>
                </Button>
              </Link>
              <Link className='hide-media-md' to='/search'>
                <Button variant='text'>
                  <Icon name='icon-sousuo' size={20} color='white_black'></Icon>
                </Button>
              </Link>
            </Flex>
          </Crumbs>
          {!isApp() && <Editor type='post' sendArticle={sendArticle} />}
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
              isFollowing={Number(filterVal.attention) === 2}
              {...props}
            />
          )}
        </CenterCard>
      </Flex>
      {verifyState.verifyVisible && (
        <VerifyCode
          ref={verifyRef}
          visible={verifyState.verifyVisible}
          onClose={() =>
            setVerifyState({
              ...verifyState,
              verifyVisible: false,
            })
          }
          onSubmit={data =>
            sendArticle(
              verifyState.post.content,
              verifyState.post.image_urls,
              verifyState.post.remind_user,
              verifyState.post.reset,
              data.id,
              data.verify,
            )
          }
        />
      )}
      {isApp() && <SendPost />}
    </PageContainer>
  );
};

export default withRouter(Home);
