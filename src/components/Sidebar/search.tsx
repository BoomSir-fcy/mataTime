import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Card, Input } from 'uikit';
import { Icon } from 'components';

const SearchBox = styled(Card)`
  position: relative;
  padding: 0 16px;
`
const SearchInput = styled.input`
width: 300px;
height: 50px;
/* background: ${({ theme }) => theme.isDark ? '#191F2D' : '#fff'}; */
border:none;
outline: none;
font-size: 16px;
color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#7A83A0'};
padding-left: 66px;
border-radius: 20px;
  &::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#7A83A0'};
  } 
  &:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
    color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#7A83A0'};
  } 
  &::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#7A83A0'};
  } 
  &:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
    color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#7A83A0'};
  }
`

const InputStyled = styled(Input)`
  background: transparent;
  border: none;
  box-shadow: none;
`

const Search: React.FC = () => {
  const { t } = useTranslation()
  const isDark = useSelector((state: any) => state.appReducer.systemCustom.isDark);
  const [value, setValue] = useState('')
  const searchChange = (e) => {
    setValue(e.target.value)
  }
  const startSearch = (e) => {
    if (e.code === 'Enter' && value) {
      console.debug(value)
    }

  }
  return null
  // return (
  //     <SearchBox isBoxShadow isRadius>
  //       <Flex alignItems="center" >
  //         <Icon name={'icon-sousuo'} size={16}></Icon>
  //         <InputStyled value={value} onChange={(e) => { searchChange(e) }} onKeyDown={startSearch.bind(this)} type="text" placeholder={t('SearchPlaceholder')} />
  //       </Flex>
  //     </SearchBox>
  // )
}

export default Search
