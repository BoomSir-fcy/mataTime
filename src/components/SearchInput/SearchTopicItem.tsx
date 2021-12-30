import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import styled from "styled-components";
import debounce from 'lodash/debounce'
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Text, Input, CardProps } from 'uikit';
import { useSearchResultLength } from 'store/search/hooks';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  FollowPopup,
  MorePopup,
  Icon,
  Avatar,
  MoreOperatorEnum,
  ImgList,
  // FollowPopupD,
  ContentParsing,
  MorePostPopup,
} from 'components';
import { SearchItem, LinkItem } from './styles'
import { getEncodeValue } from 'utils/urlQueryPath';

interface SearchTopicItemProps {
  post_num?: number
  name?: string
  id?: number
  onTab?: (id: number) => void
}

const SearchTopicItem: React.FC<SearchTopicItemProps> = ({ id, post_num, onTab, name, ...props }) => {
  const { t } = useTranslation()

  return (
    <LinkItem onFocus={() => onTab && onTab(id)} to={`/topicList/${id}/${getEncodeValue(name)}`}>
      <SearchItem alignItems="center" justifyContent="space-between">
        <Box width="100%">
          <Text bold ellipsis width="100%">#{name}</Text>
          <Text fontSize='14px' color='textTips'>
            {t('HotTopicUnit', {
              value: post_num > 999 ? '999+' : post_num,
              s: post_num > 1 ? 's' : '',
            })}</Text>
        </Box>
      </SearchItem>
    </LinkItem>
  )
}

export default SearchTopicItem
