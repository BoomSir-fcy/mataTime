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
import { FollowBtn } from 'components/Profile/FollowBtn';
import { storeAction } from 'store';
import { useDispatch } from 'react-redux';
import RemoveHistoryBtn from './RemoveHistoryBtn';

interface SearchUserItemProps {
  uid?: number
  mineUserId?: number
  user_avator_url?: string
  nick_name?: string
  address?: string
  isHistory?: boolean
  searchId?: string
  is_attention?: boolean
  onTab?: (uid: number) => void
  onClick?: () => void
  avatarCallback?: (type: string) => void
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({
  uid,
  user_avator_url,
  onTab,
  avatarCallback,
  nick_name,
  address,
  is_attention,
  isHistory,
  searchId,
  mineUserId,
  ...props }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch();

  return (
    <HoverLink onFocus={() => onTab && onTab(uid)} to={`${BASE_USER_PROFILE_URL}${uid}`} {...props}>
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
            <Text bold maxWidth="120px" ellipsis>{nick_name}</Text>
            <Text maxWidth="120px" ellipsis color='textTips'>@{shortenAddress(address)}</Text>
          </Box>
        </Flex>
        {
          isHistory
            ?
            <RemoveHistoryBtn searchId={searchId} />
            :
            (
              <Box onClick={(event) => {
                event.stopPropagation()
                event.preventDefault()
              }}>
                {mineUserId !== uid && (
                  <FollowBtn
                    ml="8px"
                    padding="0"
                    width='auto'
                    minWidth='auto'
                    variant='text'
                    uid={uid}
                    attention={is_attention}
                    onChanges={(is_attention) => {
                      dispatch(storeAction.updatePeopleState({
                        uid: uid,
                        is_attention
                      }))
                    }}
                    address={address}
                    nft_image={user_avator_url}
                  />
                )}
              </Box>
            )
        }
      </SearchItem>
    </HoverLink>
  )
}

export default SearchUserItem
