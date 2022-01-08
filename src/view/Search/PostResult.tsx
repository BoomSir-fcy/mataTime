import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Box, Text, Flex, Empty, Spinner } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Crumbs, UserFlowItem, HoverLink } from 'components';
import SearchInput from 'components/SearchInput';
import SearchTopicItem from 'components/SearchInput/SearchTopicItem';
import SearchUserItem from 'components/SearchInput/SearchUserItem';
import Tabs from 'components/Tabs';
import { storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux';
import { BASE_USER_PROFILE_URL } from 'config';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useHistory } from 'react-router-dom';
import { getSearchPath } from 'utils/urlQueryPath';

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
  list: [];
}

const PostResult = () => {
  const { t } = useTranslation();

  return (
    <Box>
      {/* {
        list
      } */}
      <Text>PostResult</Text>
    </Box>
  );
};

export default PostResult;
