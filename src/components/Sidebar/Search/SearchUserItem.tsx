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

const FlexStyled = styled(Flex)`
  height: 69px;
  /* background: ${({ theme }) => theme.colors.backgroundCard}; */
  padding: 0 18px;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => theme.colors.hoverList};
  }
`

interface SearchUserItemProps {
  uid?: number
  user_avator_url?: string
  nick_name?: string
  avatarCallback?: (type: string) => void
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({ uid, user_avator_url, avatarCallback, nick_name, ...props }) => {
  const { t } = useTranslation()


  return (
    <Link to="/aaa">
      <SearchItem alignItems="center" justifyContent="space-between">
        <Flex>
          <Avatar
            uid={uid}
            className='avatar'
            src={user_avator_url}
            callback={avatarCallback}
            scale='md'
          />
          <Box ml="8px">
            <Text maxWidth="120px" ellipsis>{nick_name}</Text>
            <Text maxWidth="120px" ellipsis color='textTips'>@TODO: ADDRESS</Text>
            {/* <span>@{shortenAddress(itemData.user_address)}</span> */}
          </Box>
        </Flex>
        <Button padding="0" style={{ fontWeight: 400 }} variant='text'>
          <Text style={{
            transform: 'rotateZ(45deg)'
          }} fontSize='24px'>+</Text>
        </Button>
      </SearchItem>
    </Link>
  )
}

export default SearchUserItem
