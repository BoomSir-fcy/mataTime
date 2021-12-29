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
import { SearchItem } from './styled'

interface SearchTopicItemProps {
  length?: number
  name?: string
}

const SearchTopicItem: React.FC<SearchTopicItemProps> = ({ length, name, ...props }) => {
  const { t } = useTranslation()


  return (
    <Link to="/aaa">
      <SearchItem alignItems="center" justifyContent="space-between">
        <Box width="100%">
          <Text bold ellipsis width="100%">#{name}54awwasedwdsajdsahdbasbdaskbndsajkasd </Text>
          <Text fontSize='14px' color='textTips'>{length} items </Text>
        </Box>
      </SearchItem>
    </Link>
  )
}

export default SearchTopicItem
