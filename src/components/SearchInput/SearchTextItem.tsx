import React from 'react';
import { BASE_USER_PROFILE_URL } from 'config';
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Text } from 'uikit';
import {
  Avatar,
} from 'components';
import { SearchItem } from './styles'
import { HoverLink } from '../Layout'
import { shortenAddress } from 'utils/contract';
import { getSearchPath } from 'utils/urlQueryPath';
import { useLocation } from 'react-router-dom';
import SearchIcon from './SearchIcon'
import RemoveHistoryBtn from './RemoveHistoryBtn';


interface SearchTextItemProps {
  text: string
  searchId?: string
  isHistory?: boolean
  onClick?: () => void
}

const SearchTextItem: React.FC<SearchTextItemProps> = ({
  text,
  searchId,
  isHistory,
  ...props }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <HoverLink replace={pathname === '/search'} to={getSearchPath({
      q: text,
    })} {...props}>
      <SearchItem alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <SearchIcon />
          <Box ml="8px">
            <Text bold maxWidth="120px" ellipsis>{text}</Text>
          </Box>
        </Flex>
        {
          isHistory && (
            <RemoveHistoryBtn searchId={searchId} />
          )
        }
      </SearchItem>
    </HoverLink>
  )
}

export default SearchTextItem
