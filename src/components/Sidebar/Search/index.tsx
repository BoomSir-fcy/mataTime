import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import styled from "styled-components";
import debounce from 'lodash/debounce'
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Card, Input, CardProps } from 'uikit';
import { DropDown, Icon } from 'components';
import { useSearchResultLength } from 'store/search/hooks';
import SearchUserItem from './SearchUserItem';
import SearchTopicItem from './SearchTopicItem';


const SearchBox = styled(Card) <{ focus?: boolean, result?: boolean }>`
  position: relative;
  padding: 0 16px;
  margin-top: 15px;
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
`

const InputStyled = styled(Input)`
  background: transparent;
  border: none;
  box-shadow: none;
`

const DatalistStyled = styled.datalist`
  background: red;
`

const OptionStyled = styled.option`
  background: pink;
`

const DropDownStyled = styled(DropDown)`
  background: ${({ theme }) => theme.colors.backgroundCard};
  background: red;
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
`

interface SearchProps extends CardProps {

}


const Search: React.FC<SearchProps> = ({ ...props }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(false)
  const [toFocus, setToFocus] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch();
  const { resultListOfPeoples, resultListOfTopic } = useStore(p => p.search);
  const resultLength = useSearchResultLength()

  const debouncedOnChange = useMemo(
    () => debounce((e) => dispatch(fetchThunk.fetchSearchAsync(e)), 300),
    [dispatch, value],
  )
  // fetchThunk.fetchSearchPeopleAsync(e)


  const searchChange = useCallback((e) => {
    setValue(e.target.value)
    debouncedOnChange(e.target.value)
  }, [setValue])

  const startSearch = (e) => {
    if (e.code === 'Enter' && value) {
      console.debug(value)
    }
  }

  useEffect(() => {
    console.log(resultLength, 'resultLength')
    if (resultLength) {
      console.log(resultLength, '=resultLength')
      setIsOpen(true)
    }
  }, [resultLength])

  return (
    <Box  {...props}>
      <label htmlFor="search">
        <SearchBox focus={focus} isBoxShadow result={!!resultLength}>
          <Flex height="100%" alignItems="center" >
            <ButtonStyled focus padding="0" variant='text'>
              <Icon name='icon-sousuo' size={16}></Icon>
            </ButtonStyled>
            <InputStyled
              value={value}
              ref={inputRef}
              autoComplete="off"
              list="ice-cream-flavors"
              onChange={(e) => { searchChange(e) }}
              onKeyDown={startSearch.bind(this)}
              onFocus={() => setFocus(true)}
              onBlur={(e) => {
                console.log(1)
                if (toFocus) {
                  setToFocus(false)
                  e.target.focus()
                  return
                }
                setFocus(false)
              }}
              type="text"
              id="search"
              placeholder={t('SearchPlaceholder')}
            />

            <ButtonStyled
              onMouseDown={() => setToFocus(true)}
              onClick={() => {
                dispatch(fetchThunk.fetchSearchAsync(''))
                setValue('')
              }}
              focus={focus}
              padding="0"
              variant='text'>
              <Icon name='icon-guanbi2fill' size={19} />
            </ButtonStyled>
          </Flex>
        </SearchBox>
      </label>
      <Box onMouseDown={() => setToFocus(true)} position="relative" height="0">
        {
          (
            <ResultBox>
              <Box>
                {
                  resultListOfTopic.slice(0, 3).map(item => (
                    <SearchTopicItem length={21} name={item.topic_name} />
                  ))
                }
                {
                  resultListOfPeoples.map(item => (
                    <SearchUserItem uid={item.uid} user_avator_url={item.nft_image} nick_name={item.nick_name} avatarCallback={undefined} />
                  ))
                }
              </Box>
            </ResultBox>
          )
        }
      </Box>
    </Box>

  )
}

export default Search
