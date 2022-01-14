import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { Flex, Box, Button, Text, Input, CardProps } from 'uikit';
import { useSearchResultLength } from 'store/search/hooks';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { HoverLink } from '../Layout';
import { SearchItem } from './styles';
import { getEncodeValue, getSearchPath } from 'utils/urlQueryPath';
import RemoveHistoryBtn from './RemoveHistoryBtn';

interface SearchPostLenProps {
  post_num?: number;
  text?: string;
  pathname?: string;
  onClick?: () => void;
}

const SearchPostLen: React.FC<SearchPostLenProps> = ({
  post_num,
  text,
  pathname,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <HoverLink
      replace={pathname === '/search'}
      to={getSearchPath({
        q: text,
      })}
    >
      <SearchItem alignItems='center' justifyContent='space-between'>
        <Box width='100%'>
          <Text bold ellipsis width='100%'>
            {text}
          </Text>
          {typeof post_num === 'number' && (
            <Text fontSize='14px' color='textTips'>
              {t('HotTopicUnit', {
                value: post_num > 999 ? '999+' : post_num,
                s: post_num > 1 ? 's' : '',
              })}
            </Text>
          )}
        </Box>
      </SearchItem>
    </HoverLink>
  );
};

export default SearchPostLen;
