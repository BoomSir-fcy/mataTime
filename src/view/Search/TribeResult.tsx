import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Box, Text, Flex, Empty, Spinner } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Crumbs, UserFlowItem, HoverLink, List, LoadType } from 'components';
import SearchInput from 'components/SearchInput';
import SearchTopicItem from 'components/SearchInput/SearchTopicItem';
import SearchUserItem from 'components/SearchInput/SearchUserItem';
import Tabs from 'components/Tabs';
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux';
import { BASE_USER_PROFILE_URL } from 'config';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { Link, useHistory } from 'react-router-dom';
import { getSearchPath } from 'utils/urlQueryPath';
import PostList from 'components/Post/PostList';
import { fetchSearchPostDetailAsync, fetchSearchTribeAsync } from 'store/search/reducer';
import TradeCard from 'view/Tribe/components/TradeCard';

interface TribeResultProps {
  list: any[];
  loading: boolean;
  isEnd: boolean;
}

const TribeResult: React.FC<TribeResultProps> = ({
  list,
  loading,
  isEnd,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getList = useCallback(() => {
    dispatch(fetchSearchTribeAsync());
  }, [dispatch]);

  return (
    <Box>
      <List loading={loading}
        renderList={type => {
          if (
            (type === LoadType.INIT && list?.length !== 0) ||
            loading ||
            isEnd
          ) {
            return;
          }
          getList();
        }}>
        {list.map((item, index) => (
          <Link key={item.id} to={`/tribe/detail?id=${item.id}`}>
            {item.id && <TradeCard info={item} />}
          </Link>
        ))}
      </List>
      {
        !Boolean(list.length) && <Empty />
      }
    </Box>
  );
};

export default TribeResult;

