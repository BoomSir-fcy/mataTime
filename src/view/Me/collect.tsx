import React, { useMemo, useState } from 'react';
import { Box, Flex, Text, Card } from 'uikit';
import { List, MoreOperatorEnum, TopicEmpty } from 'components';
import { useTranslation } from 'contexts/Localization';

import { CrumbsHead } from './components';

import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import { Crumbs } from 'components';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import { useStore } from 'store';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import { Tabs, Popup } from './components';

import { Api } from 'apis';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import { useMapModule } from 'store/mapModule/hooks';
import PostList from 'components/Post/PostList';
import checkTranslateIds from 'utils/checkTranslateIds';
import TribePostList from 'view/Tribe/Detail/postList';
import {
  addCommentTranslateIds,
  addTranslateIds,
} from 'store/mapModule/actions';
import { useDispatch } from 'react-redux';
import useParsedQueryString from 'hooks/useParsedQueryString';

// enum MoreOperatorEnum {
//   SHIELD = 'SHIELD', // 屏蔽
//   SETTOP = 'SETTOP',
//   DELPOST = 'DELPOST',
// }

const Collect = props => {
  const parseQs = useParsedQueryString();

  const [page, setPage] = useState(1);
  const [tribePage, setTribePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [tribeListData, setTribeListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);
  const [total, setTotal] = useState(0);
  const [tribeTotalPage, setTribeTotalPage] = useState(2);
  const [tribeTotal, setTribeTotal] = useState(0);
  const { t } = useTranslation();
  const currentUid = useStore(p => p.loginReducer.userInfo);

  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  // useReadArticle(nonce);
  const perpage = MAX_SPEND_TIME_PAGE_TATOL;

  const dispatch = useDispatch();

  const isTribe = useMemo(() => {
    return parseQs.v === '1';
  }, [parseQs.v]);

  const collectList = current => {
    return Api.MeApi.collectList(current || page, perpage);
  };

  const getTribeFavList = current => {
    return Api.TribeApi.getTribeFavList({
      page: current || tribePage,
      perpage,
    });
  };

  const init = async (current?: number) => {
    setLoading(true);
    try {
      const fetch = isTribe ? getTribeFavList : collectList;

      const res = await fetch(current);
      setLoading(false);
      if (Api.isSuccess(res)) {
        if (isTribe) {
          setTribePage((current || tribePage) + 1);
          setTribeTotalPage(res.data.total_page);
          setTribeTotal(res.data.total_num);
          setTribeListData(
            current
              ? [...(res.data?.list || [])]
              : [...tribeListData, ...(res.data?.list || [])],
          );
        } else {
          setPage((current || page) + 1);
          setTotalPage(res.data.total_page);
          setTotal(res.data.total_num);
          setListData(
            current
              ? [...(res.data?.list || [])]
              : [...listData, ...(res.data?.list || [])],
          );
        }
        // const ids = checkTranslateIds(res.data?.list || [], 'post_id');
        // dispatch(addTranslateIds(ids));
        const { postIds, commentIds } = checkTranslateIds(
          res.data?.list || [],
          'post_id',
        );
        dispatch(addTranslateIds(postIds));
        dispatch(addCommentTranslateIds(commentIds));
      }
    } catch (error) {
    } finally {
      setLoading(false);
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
    const resPost = listData.filter(item => {
      return !deletePostIds.includes(item.id);
    });
    return resPost;
  }, [listData, deletePostIds]);

  const renderTribeList = useMemo(() => {
    const resPost = tribeListData.filter(item => {
      return !deletePostIds.includes(item.id);
    });
    return resPost;
  }, [tribeListData, deletePostIds]);

  React.useEffect(() => {
    init(1);
  }, [isTribe]);

  return (
    <Box>
      <Crumbs title={t('meHome')}>
        <Flex>
          <Text fontWeight='bold' mr='10px' fontSize='14px'>
            {t('meHeaderMyCollection')}
          </Text>
          <Text fontSize='14px'>
            {t('meHeaderNum%value%', { value: total })}
          </Text>
        </Flex>
      </Crumbs>
      <Tabs />
      <Box mt='14px'>
        {isTribe ? (
          <TribePostList
            flag={false}
            list={renderTribeList}
            map={tribePostMap}
            loading={loading}
            isEnd={tribePage > tribeTotalPage}
            postIdKey='post_id'
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
            postIdKey='post_id'
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
          postIdKey='post_id'
          loading={loading}
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
};

export default Collect;
