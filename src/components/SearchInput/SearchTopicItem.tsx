import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import styled from "styled-components";
import debounce from 'lodash/debounce'
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Text, Input, CardProps } from 'uikit';
import { useSearchResultLength } from 'store/search/hooks';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { HoverLink } from '../Layout'
import { SearchItem } from './styles'
import { getEncodeValue } from 'utils/urlQueryPath';
import RemoveHistoryBtn from './RemoveHistoryBtn';



interface SearchTopicItemProps {
  post_num?: number
  name?: string
  id?: number
  isHistory?: boolean
  searchId?: string
  onTab?: (id: number) => void
  onClick?: () => void
}

const SearchTopicItem: React.FC<SearchTopicItemProps> = ({
  id,
  post_num,
  onTab,
  name,
  searchId,
  isHistory,
  ...props
}) => {
  const { t } = useTranslation()

  return (
    <HoverLink onFocus={() => onTab && onTab(id)} to={`/topicList/${id}/${getEncodeValue(name)}`} {...props}>
      <SearchItem alignItems="center" justifyContent="space-between">
        <Box width="100%">
          <Text bold ellipsis width="100%">#{name}</Text>
          {
            typeof post_num === 'number' && (
              <Text fontSize='14px' color='textTips'>
                {t('HotTopicUnit', {
                  value: post_num > 999 ? '999+' : post_num,
                  s: post_num > 1 ? 's' : '',
                })}</Text>
            )
          }
        </Box>
        {
          isHistory && (
            <RemoveHistoryBtn searchId={searchId} />
          )
        }
      </SearchItem>
    </HoverLink>
  )
}

export default SearchTopicItem
