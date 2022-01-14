import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Box, Text, Flex, Empty, Spinner } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Crumbs, UserFlowItem, HoverLink, MoreOperatorEnum } from 'components';
import SearchInput from 'components/SearchInput';
import SearchTopicItem from 'components/SearchInput/SearchTopicItem';
import SearchUserItem from 'components/SearchInput/SearchUserItem';
import Tabs from 'components/Tabs';
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux';
import { BASE_USER_PROFILE_URL } from 'config';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useHistory } from 'react-router-dom';
import { getSearchPath } from 'utils/urlQueryPath';
import PostList from 'components/Post/PostList';
import { fetchSearchPostDetailAsync } from 'store/search/reducer';

const tabDatas = [
  {
    lable: '综合',
    tLable: '综合',
    type: 'total',
  },
  {
    lable: '最新',
    tLable: '最新',
    type: 'post',
  },
  {
    lable: 'People',
    tLable: 'People',
    type: 'user',
  },
  {
    lable: 'Topic',
    tLable: 'Topic',
    type: 'topic',
  },
];

interface PostResultProps {
  list: Api.Home.post[];
  loading: boolean;
  isEnd: boolean;
  searchVal: string;
  map: {
    [id: string]: Api.Home.post;
  };
  // getList: (type?: number) => void;
  // updateList: (id: number, type: MoreOperatorEnum) => void;
}

const PostResult: React.FC<PostResultProps> = ({
  list,
  loading,
  isEnd,
  searchVal,
  map,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getList = useCallback(() => {
    dispatch(fetchThunk.fetchSearchPostAsync());
  }, [dispatch]);

  const updateList = useCallback(id => {
    console.log(id, 'id');
    dispatch(fetchSearchPostDetailAsync(id));
  }, []);

  return (
    <Box>
      <PostList
        map={map}
        list={list}
        loading={loading}
        isEnd={isEnd}
        getList={getList}
        updateList={updateList}
      />
    </Box>
  );
};

export default PostResult;
