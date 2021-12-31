import React, { useState, useRef, useMemo, useCallback, useEffect, FormEvent } from 'react';
import styled from "styled-components";
import debounce from 'lodash/debounce'
import uniqueId from 'lodash/uniqueId'
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Card, Input, CardProps, BoxProps } from 'uikit';
import { useSearchResultLength } from 'store/search/hooks';
import SearchUserItem from './SearchUserItem';
import SearchTopicItem from './SearchTopicItem';
import HistoryList from './HistoryList';
import { useHistory, useLocation } from 'react-router-dom';
import { getDecodeValue, getEncodeValue } from 'utils/urlQueryPath';
import CircleLoader from 'components/Loader/CircleLoader';
import { BASE_USER_PROFILE_URL } from 'config';
import { HoverLink } from '../Layout/HoverLink'
import { Icon } from '../Icon'
import { UserFlowItem } from '../Profile/UserFlowItem'
import useParsedQueryString from 'hooks/useParsedQueryString';
import { SearchHistiryType } from 'store/search/types';
import SearchFilter from './SearchFilter';


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
  height: 571px;
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
  const [focus, setFocus] = useState(false)
  const [toFocus, setToFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const blurRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch();
  const { resultListOfPeoples, resultListOfTopic, loading, historyList } = useStore(p => p.search);
  const resultLength = useSearchResultLength()
  const { push, replace } = useHistory()
  const { pathname } = useLocation()
  const parsedQs = useParsedQueryString();

  useEffect(() => {
    const query = getDecodeValue(parsedQs.q)
    if (query && pathname === '/search') {
      setValue(query)
    }
  }, [pathname, parsedQs.q])

  const debouncedOnChange = useMemo(
    () => debounce((e) => dispatch(fetchThunk.fetchSearchAsync({
      search: e
    })), 300),
    [dispatch, value],
  )

  const searchChange = useCallback((e) => {
    setValue(e.target.value)
    debouncedOnChange(e.target.value)
  }, [setValue])

  const startSearch = (e) => {
    if (e.code === 'Enter' && value) {
      console.debug(value)
    }
  }

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!value || value === '#' || value === '@') return
    debouncedOnChange.cancel()
    dispatch(storeAction.setSearchDisplayPeople({ list: [] }))
    dispatch(storeAction.setSearchDisplayTopic({ list: [] }))
    dispatch(fetchThunk.fetchSearchAsync({
      search: value,
      fetchDisplay: true
    }))
    // if (!loading) {
    //   dispatch(storeAction.setSearchDisplayPeople({ list: resultListOfPeoples }))
    //   dispatch(storeAction.setSearchDisplayTopic({ list: resultListOfTopic }))
    // } else {
    //   dispatch(storeAction.setSearchDisplayPeople({ list: [] }))
    //   dispatch(storeAction.setSearchDisplayTopic({ list: [] }))
    //   dispatch(fetchThunk.fetchSearchAsync({
    //     search: value,
    //     fetchDisplay: true
    //   }))
    // }
    if (pathname === '/search') {
      replace(`/search?q=${getEncodeValue(value)}`)
    } else {
      push(`/search?q=${getEncodeValue(value)}`)
    }
    if (blurRef.current) {
      blurRef.current.focus()
    }
    dispatch(storeAction.addSearchHistoryData({
      text: value,
      searchId: uniqueId('search_'),
      type: SearchHistiryType.TEXT
    }))
  }, [value, dispatch, loading, resultListOfPeoples, resultListOfTopic, debouncedOnChange, pathname, push, replace])


  return (
    <Box {...props}>
      <form
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={(e) => {
          if (toFocus) {
            setToFocus(false)
            e.target.focus()
            return
          }
          setFocus(false)
        }}
        onSubmit={handleSubmit}
        action="">
        <label htmlFor="search">
          <SearchBox focus={focus} isBoxShadow result={!!resultLength}>
            <Flex height="100%" alignItems="center" >
              {
                loading
                  ?
                  <CircleLoader />
                  :
                  <ButtonStyled focus padding="0" variant='text'>
                    <Icon name='icon-sousuo' size={16}></Icon>
                  </ButtonStyled>
              }
              <InputStyled
                value={value}
                ref={inputRef}
                autoComplete="off"
                list="ice-cream-flavors"
                onChange={(e) => { searchChange(e) }}
                onKeyDown={startSearch.bind(this)}
                type="search"
                id="search"
                placeholder={t('SearchPlaceholder')}
              />

              <ButtonStyledLine
                // tabIndex={-1}
                onMouseDown={() => setToFocus(true)}
                onClick={() => {
                  dispatch(fetchThunk.fetchSearchAsync({
                    search: ''
                  }))
                  setValue('')
                }}
                focus={focus}
                padding="0"
                variant='text'>
                <Icon name='icon-guanbi2fill' size={19} />
              </ButtonStyledLine>
            </Flex>
          </SearchBox>
        </label>
        <Box onMouseDown={() => setToFocus(true)} position="relative" height="0">
          {
            focus && (
              <ResultBox>
                {
                  value
                    ?
                    <Box>
                      {
                        resultListOfTopic.slice(0, 3).map(item => (
                          <SearchTopicItem
                            post_num={item.post_num}
                            id={item.topic_id}
                            key={`t_${item.topic_id}`}
                            onClick={() => {
                              dispatch(storeAction.addSearchHistoryData({
                                ...item,
                                searchId: uniqueId('search_'),
                                type: SearchHistiryType.TOPIC
                              }))
                            }}
                            name={item.topic_name} />
                        ))
                      }
                      {
                        resultListOfPeoples.map(item => (
                          <SearchUserItem
                            uid={item.uid}
                            user_avator_url={item.nft_image}
                            nick_name={item.nick_name}
                            address={item.address}
                            is_attention={item.is_attention}
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
                        ))
                      }
                    </Box>
                    :
                    <HistoryList />
                }

              </ResultBox>
            )
          }
        </Box>
      </form>
      <BlurInput type="radio" ref={blurRef} />
    </Box>

  )
}

export default SearchInput
