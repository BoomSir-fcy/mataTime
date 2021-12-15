import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import { Flex, Box, Button, Card } from 'uikit';
import { Icon } from 'components';

const SearchBox = styled(Card)`
  position: relative;
  img{
    // width:16px;
    // height:16px;
    transform: scale(0.8);
    position: absolute;
    top: 3px;
    left:15px;
  }
`
const SearchInput = styled.input`
width: 300px;
height: 50px;
background: ${({ theme }) => theme.isDark ? '#191F2D' : '#fff'};
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
  return (
    true ? null :
      <SearchBox>
        {/* <img src={searchImg} alt="" /> */}
        <Icon name={'icon-sousuo'} style={{
          position: 'absolute',
          top: '8px',
          left: '25px',
        }} size={28} color={isDark ? '#FFFFFF' : '#7A83A0'}></Icon>
        <SearchInput value={value} onChange={(e) => { searchChange(e) }} onKeyDown={startSearch.bind(this)} type="text" placeholder={t('SearchPlaceholder')} />
      </SearchBox>
  )
}

export default Search
