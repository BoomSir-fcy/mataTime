import React from 'react';
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Text } from 'uikit';
import {
  Avatar,
} from 'components';
import { SearchItem, LinkItem } from './styles'
import { BASE_USER_PROFILE_URL } from 'config';

interface SearchUserItemProps {
  uid?: number
  user_avator_url?: string
  nick_name?: string
  onTab?: (uid: number) => void
  avatarCallback?: (type: string) => void
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({ uid, user_avator_url, onTab, avatarCallback, nick_name, ...props }) => {
  const { t } = useTranslation()


  return (
    <LinkItem onFocus={() => onTab && onTab(uid)} to={`${BASE_USER_PROFILE_URL}${uid}`}>
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
        <Button tabIndex={-1} padding="0" style={{ fontWeight: 400 }} variant='text'>
          <Text style={{
            transform: 'rotateZ(45deg)'
          }} fontSize='24px'>+</Text>
        </Button>
      </SearchItem>
    </LinkItem>
  )
}

export default SearchUserItem
