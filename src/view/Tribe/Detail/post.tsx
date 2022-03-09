import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { List, LoadType, MoreOperatorEnum } from 'components';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import { fetchThunk, storeAction, useStore } from 'store';
import { MeItemWrapper, NewsMeWrapper } from 'view/News/Me/style';
import MentionItem from 'components/Post/MentionItem';
import MentionOperator from 'components/Post/MentionOperator';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useMapModule } from 'store/mapModule/hooks';
import { fetchTribePostAsync, fetchTribeSearchPostAsync } from 'store/tribe';
import PostList from './postList';
import useParsedQueryString from 'hooks/useParsedQueryString';

const ArticleListBox = styled.div`
  color: #fff;
`;

/**
 *
 * @review
 * props 未声明类型
 */
const PostListComponents = (props, ref) => {
  const article = useStore(p => p.tribe.postList);
  const dispatch = useDispatch();
  const [isEnd, setIsEnd] = useState(false);
  const { list, lastList, page, addListNum, loading, top, start } = article;
  const { tribePostMap, blockUsersIds, deletePostIds, unFollowUsersIds } =
    useMapModule();
  const pageSize = MAX_SPEND_TIME_PAGE_TATOL;
  const parsedQs = useParsedQueryString();

  const {
    nonce,
    setNonce = () => {
      console.error('setNonce is null or undefined, and not refresh ');
    },
    TribeId,
    filterValObj,
    TopicId,
  } = props || {};

  const Getlist = React.useCallback(
    (current = 0, refresh = false, topic_id = null) => {
      if ((loading || isEnd) && !current) return false;
      if (!TribeId) return false;
      if (filterValObj.search) {
        dispatch(
          fetchTribeSearchPostAsync({
            tribe_id: TribeId,
            key: filterValObj.search,
            start: refresh ? 0 : start,
            limit: MAX_SPEND_TIME_PAGE_TATOL,
            type: filterValObj.SearchActiveTitle || 0,
          }),
        );
      } else {
        dispatch(
          fetchTribePostAsync({
            selected: filterValObj.ActiveTitle || 0,
            page: current || page,
            per_page: pageSize,
            top: top,
            tribe_id: TribeId,
            newest_sort: filterValObj.sortTime,
            hot_sort: filterValObj.sortLike,
            topic_id: Number(TopicId),
          }),
        );
      }
      setIsEnd(true);
      setNonce(prep => prep + 1);
    },
    [
      isEnd,
      dispatch,
      TribeId,
      loading,
      page,
      pageSize,
      filterValObj,
      TopicId,
      setNonce,
    ],
  );

  useEffect(() => {
    Getlist(1);
  }, [TopicId]);

  useEffect(() => {
    if (page > 1) {
      if (lastList.length < pageSize) {
        setIsEnd(true);
      } else if (lastList.length >= pageSize) {
        setIsEnd(false);
      }
    }
  }, [loading, page, lastList, pageSize]);

  useEffect(() => {
    if (addListNum === 0) {
      Getlist();
    }
  }, [addListNum, Getlist]);

  useEffect(() => {
    setIsEnd(false);
    if (filterValObj.sortTime || filterValObj.sortLike || filterValObj.search) {
      Getlist(1, true);
    }
  }, [filterValObj]);

  React.useImperativeHandle(ref, () => ({
    reload(page: number) {
      return Getlist(page);
    },
  }));

  const renderList = useMemo(() => {
    const resPost = list.filter(item => {
      return (
        !blockUsersIds.includes(item.user_id) &&
        !deletePostIds.includes(item.id)
      );
    });
    return resPost;
  }, [list, blockUsersIds, unFollowUsersIds, deletePostIds]);

  const getList = useCallback(
    (type?: LoadType, id?) => {
      if (type === LoadType.INIT) {
        return;
      }
      if (type === LoadType.REFRESH) {
        Getlist(1, false, id);
        return;
      }
      Getlist(page);
    },
    [Getlist, page],
  );

  return (
    <ArticleListBox>
      <PostList
        map={tribePostMap}
        list={renderList}
        loading={loading}
        isEnd={isEnd}
        getList={getList}
        updateList={() => {}}
        tribeId={TribeId}
      />
    </ArticleListBox>
  );
};

export const TribePostList = React.forwardRef(PostListComponents);
