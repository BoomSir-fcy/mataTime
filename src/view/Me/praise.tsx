import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { List, MoreOperatorEnum, TopicEmpty } from 'components';
import { Box, Button, Text, Card, Flex } from 'uikit';

import { Api } from 'apis';

import { CrumbsHead } from './components';
import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts/Localization';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import { useStore } from 'store';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import { useMapModule } from 'store/mapModule/hooks';
import PostList from 'components/Post/PostList';
import checkTranslateIds from 'utils/checkTranslateIds';
import { Tabs, Popup } from './components';
import {
  addCommentTranslateIds,
  addTranslateIds,
} from 'store/mapModule/actions';
import { useDispatch } from 'react-redux';
import useParsedQueryString from 'hooks/useParsedQueryString';
import TribePostList from 'view/Tribe/Detail/postList';

const Praise = React.memo(props => {
  const parseQs = useParsedQueryString();

  const { t } = useTranslation();
  const currentUid = useStore(p => p.loginReducer.userInfo);

  const perpage = MAX_SPEND_TIME_PAGE_TATOL;

  const [state, setState] = useImmer({
    loading: false,
    list: [],
    page: 1,
    totalPage: 1,
    tribeList: [],
    tribePage: 1,
    tribeTotalPage: 1,
  });
  const {
    loading,
    page,
    totalPage,
    list,
    tribePage,
    tribeList,
    tribeTotalPage,
  } = state;

  const dispatch = useDispatch();

  const isTribe = useMemo(() => {
    return parseQs.v === '1';
  }, [parseQs.v]);

  const praiseList = offset => {
    return Api.MeApi.praiseList(offset || page, perpage);
  };

  const getTribeLikeList = offset => {
    return Api.TribeApi.getTribeLikeList({
      page: offset || tribePage,
      perpage,
    });
  };

  const init = async (offset?: number) => {
    setState(p => {
      p.loading = true;
    });
    try {
      const fetch = isTribe ? getTribeLikeList : praiseList;
      const res = await fetch(offset);
      if (Api.isSuccess(res)) {
        setState(p => {
          p.loading = false;
        });
        if (Api.isSuccess(res)) {
          if (isTribe) {
            setState(p => {
              p.tribeTotalPage = res.data.total_page;
              p.tribePage = (offset || tribePage) + 1;
              p.tribeList = offset
                ? [...(res.data.list || [])]
                : [...tribeList, ...(res.data.list || [])];
            });
          } else {
            setState(p => {
              p.totalPage = res.data.total_page;
              p.page = (offset || page) + 1;
              p.list = offset
                ? [...(res.data.list || [])]
                : [...list, ...(res.data.list || [])];
            });
          }
          // const ids = checkTranslateIds(res.data.list || [], 'post_id');
          // dispatch(addTranslateIds(ids));
          const { postIds, commentIds } = checkTranslateIds(
            res.data.list || [],
            'post_id',
          );
          dispatch(addTranslateIds(postIds));
          dispatch(addCommentTranslateIds(commentIds));
        }
        return;
      }
      throw new Error('');
    } catch (error) {
      setState(p => {
        p.loading = false;
      });
    }
  };

  const {
    postMap,
    blockUsersIds,
    tribePostMap,
    deletePostIds,
    unFollowUsersIds,
  } = useMapModule();

  const renderList = useMemo(() => {
    const resPost = list.filter(item => {
      return !deletePostIds.includes(item.id);
    });
    return resPost;
  }, [list, deletePostIds]);

  const renderTribeList = useMemo(() => {
    const resPost = tribeList.filter(item => {
      return !deletePostIds.includes(item.id);
    });
    return resPost;
  }, [tribeList, deletePostIds]);

  React.useEffect(() => {
    init(1);
  }, [isTribe]);

  return (
    <Box>
      {/* <CrumbsHead>
        <Box>
          <Button style={{ marginRight: '11px' }}>全部点赞</Button>
          <Button>今日新增</Button>
        </Box>
      </CrumbsHead> */}
      <Crumbs title={t('meHome')} />
      <Tabs />
      <Box mt='13px'>
        {isTribe ? (
          <TribePostList
            list={renderTribeList}
            map={tribePostMap}
            loading={loading}
            isEnd={tribePage > tribeTotalPage}
            getList={() => {
              init();
            }}
            updateList={() => {
              // console.debug('updateList');
            }}
          />
        ) : (
          <PostList
            list={renderList}
            map={postMap}
            loading={loading}
            isEnd={page > totalPage}
            getList={() => {
              init();
            }}
            updateList={() => {
              console.debug('updateList');
            }}
          />
        )}
        {/* <PostList
          list={renderList}
          map={postMap}
          loading={loading}
          postIdKey='post_id'
          isEnd={page > totalPage}
          getList={() => {
            init();
          }}
          updateList={() => {
            console.debug('updateList');
          }}
        /> */}
      </Box>
    </Box>
  );
});

export default Praise;
