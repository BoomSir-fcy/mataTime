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
import PostList from 'components/Post/PostList';

const ArticleListBox = styled.div`
  color: #fff;
`;

/**
 *
 * @review
 * props 未声明类型
 */
const ArticleComponents = (props, ref) => {
  const article = useStore(p => p.post);
  const dispatch = useDispatch();
  const userTag = useStore(p => p.post);
  const { user_tags1, user_tags2 } = userTag;
  const [isEnd, setIsEnd] = useState(false);
  const { list, lastList, page, addListNum, loading } = article;
  const { postMap, blockUsersIds, deletePostIds, unFollowUsersIds } =
    useMapModule();
  const pageSize = MAX_SPEND_TIME_PAGE_TATOL;

  const {
    isFollowing,
    nonce,
    setNonce = () => {
      console.error('setNonce is null or undefined, and not refresh ');
    },
  } = props || {};

  const Getlist = React.useCallback(
    (current = 0) => {
      if ((loading || isEnd) && !current) return false;
      // setLoading(true);
      dispatch(
        fetchThunk.fetchPostAsync({
          attention: 1,
          page: current || page,
          per_page: pageSize,
          user_tags1,
          user_tags2,
          ...props.filterValObj,
        }),
      );
      setIsEnd(true);
      // setLoading(false);
      setNonce(prep => prep + 1);
    },
    [
      isEnd,
      dispatch,
      loading,
      page,
      pageSize,
      props.filterValObj,
      setNonce,
      user_tags1,
      user_tags2,
    ],
  );

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (Number(props.filterValObj.attention) === 3) {
      setIsEnd(false);
      Getlist(1);
    }
  }, [user_tags1, user_tags2, props.filterValObj.attention]);

  React.useImperativeHandle(ref, () => ({
    reload(page: number) {
      return Getlist(page);
    },
  }));

  const renderList = useMemo(() => {
    const resPost = list.filter(item => {
      if (!isFollowing)
        return (
          !blockUsersIds.includes(item.user_id) &&
          !deletePostIds.includes(item.id)
        );
      return (
        !blockUsersIds.includes(item.user_id) &&
        !unFollowUsersIds.includes(item.user_id) &&
        !deletePostIds.includes(item.id)
      );
    });
    // if (!isFollowing) return filterBlockUserPost
    // return filterBlockUserPost.filter(item => !blockUsersIds.includes(item.user_id))
    return resPost;
  }, [list, blockUsersIds, unFollowUsersIds, isFollowing, deletePostIds]);

  const getList = useCallback(
    (type?: LoadType) => {
      // Getlist(Math.floor(renderList.length / MAX_SPEND_TIME_PAGE_TATOL) + 1);
      if (type === LoadType.REFRESH || type === LoadType.INIT) {
        Getlist(1);
        return
      }
      Getlist(page);
    },
    [Getlist, page],
  );

  return (
    <ArticleListBox>
      <PostList
        map={postMap}
        list={renderList}
        loading={loading}
        isEnd={isEnd}
        getList={getList}
        updateList={() => { }}
      />
    </ArticleListBox>
  );
};

export const ArticleList = React.forwardRef(ArticleComponents);
