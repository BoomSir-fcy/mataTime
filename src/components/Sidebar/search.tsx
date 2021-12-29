import React, { useState, useRef, useMemo, useCallback } from 'react';
import styled from "styled-components";
import debounce from 'lodash/debounce'
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Card, Input, CardProps } from 'uikit';
import { Icon } from 'components';

const SearchBox = styled(Card)`
  position: relative;
  padding: 0 16px;
`

const InputStyled = styled(Input)`
  background: transparent;
  border: none;
  box-shadow: none;
`

interface SearchProps extends CardProps {

}

const Search: React.FC<SearchProps> = ({ ...props }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const dispatch = useDispatch();

  const debouncedOnChange = useMemo(
    () => debounce((e) => dispatch(fetchThunk.fetchSearchPeopleAsync(e)), 300),
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


  return (
    <SearchBox isBoxShadow isRadius {...props}>
      <Flex alignItems="center" >
        <Icon name={'icon-sousuo'} size={16}></Icon>
        <InputStyled
          value={value}
          onChange={(e) => { searchChange(e) }}
          onKeyDown={startSearch.bind(this)}
          type="text"
          placeholder={t('SearchPlaceholder')}
        />
      </Flex>
    </SearchBox>
  )
}

export default Search
