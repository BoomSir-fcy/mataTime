import React, { useState, useRef, useMemo, useCallback, useEffect, FormEvent } from 'react';
import styled from "styled-components";
import debounce from 'lodash/debounce'
import uniqueId from 'lodash/uniqueId'
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Card, Input, Text, BoxProps } from 'uikit';
import { useSearchResultLength } from 'store/search/hooks';
import SearchUserItem from './SearchUserItem';
import SearchTopicItem from './SearchTopicItem';
import SearchTextItem from './SearchTextItem';
import { useHistory, useLocation } from 'react-router-dom';
import { getDecodeValue, getEncodeValue } from 'utils/urlQueryPath';
import CircleLoader from 'components/Loader/CircleLoader';
import { BASE_USER_PROFILE_URL } from 'config';
import { HoverLink } from '../Layout/HoverLink'
import { Icon } from '../Icon'
import { UserFlowItem } from '../Profile/UserFlowItem'
import useParsedQueryString from 'hooks/useParsedQueryString';
import { SearchHistiryType } from 'store/search/types';
import ClearModal from './ClearModal'


const SearchBox = styled(Card) <{ focus?: boolean, result?: boolean }>`
  position: relative;
  padding: 0 16px;
  height: 50px;
  border-radius: 20px;
  /* border-radius: ${({ result }) => result ? '20px 20px 0px 0px' : '20px 20px 20px 20px'}; */
  border: 1px solid ${({ focus, theme }) => focus ? theme.colors.primary : 'transparent'};
  transition: all 0.3s;
  &:hover{
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`

const ButtonStyled = styled(Button) <{ focus?: boolean }>`
  font-weight: 400;
  opacity: ${({ focus }) => focus ? 1 : 0};
  height: auto;

`
const ButtonStyledLine = styled(ButtonStyled)`
  &:focus{
    outline: 3px solid ${({ theme }) => theme.colors.textPrimary};
  }
`

const InputStyled = styled(Input)`
  background: transparent;
  border: none;
  box-shadow: none;

`
const ResultBox = styled(Box)`
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  max-height: 571px;
  position: absolute;
  width: 100%;
  overflow: auto;
  z-index: 99;
  top: 15px;
  right: 0;
  min-width: 300px;
`

const BlurInput = styled.input`
  position: fixed;
  height: 0;
  top: -1000px;
  right: -1000px;
  opacity: 0;
`

interface SearchInputProps extends BoxProps {

}


const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(null)
  const dispatch = useDispatch();
  const { historyList } = useStore(p => p.search);
  const [visibility, setVisibility] = useState(false)

  return (
    <Box>

      {
        historyList.length
          ?
          <>
            <Flex justifyContent='space-between' alignItems='center' padding='8px 18px'>
              <Text fontSize='18px' bold>{t('Recent')}</Text>
              <Button variant='text' onClick={() => {
                setVisibility(true)
              }} padding='0'>
                <Text fontSize='14px' color='textPrimary'>{t('Clear all')}</Text>
              </Button>
            </Flex>
            {
              historyList.map(item => (
                <Box key={item.searchId}>
                  {
                    item.type === SearchHistiryType.USER && (
                      <SearchUserItem
                        uid={item.uid}
                        user_avator_url={item.nft_image}
                        nick_name={item.nick_name}
                        address={item.address}
                        isHistory
                        searchId={item.searchId}
                        avatarCallback={undefined}
                        key={`u_${item.uid}`}
                        onClick={() => {
                          dispatch(storeAction.addSearchHistoryData({
                            ...item,
                            searchId: uniqueId('search_'),
                            type: SearchHistiryType.USER
                          }))
                        }}
                      />
                    )
                  }
                  {
                    item.type === SearchHistiryType.TOPIC && (
                      <SearchTopicItem
                        post_num={item.post_num}
                        id={item.topic_id}
                        key={`t_${item.topic_id}`}
                        isHistory
                        searchId={item.searchId}
                        onClick={() => {
                          dispatch(storeAction.addSearchHistoryData({
                            ...item,
                            searchId: uniqueId('search_'),
                            type: SearchHistiryType.TOPIC
                          }))
                        }}
                        name={item.topic_name} />
                    )
                  }
                  {
                    (item.type === SearchHistiryType.TEXT) && (
                      <SearchTextItem
                        key={`t_${item.searchId}`}
                        text={item.text}
                        isHistory
                        searchId={item.searchId}
                        onClick={() => {
                          dispatch(storeAction.addSearchHistoryData({
                            ...item,
                            searchId: uniqueId('search_'),
                            type: SearchHistiryType.TEXT
                          }))
                        }} />
                    )
                  }
                </Box>
              ))
            }
            <ClearModal show={visibility} onClose={() => setVisibility(false)} />
          </>
          :
          <Box padding='8px 18px'>
            <Text fontSize='14px' color="textTips">{t('Search for people,topics')}</Text>
          </Box>
      }

    </Box >
  )
}

export default SearchInput
