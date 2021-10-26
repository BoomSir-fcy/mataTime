import React,{ useState, useRef} from 'react';
import styled from "styled-components";
import searchImg from 'assets/images/common/search.png'
const SearchBox = styled.div`
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
background: #191F2D;
border:none;
outline: none;
font-size: 16px;
color: #FFFFFF;
padding-left: 66px;
border-radius: 20px;
`

export  const Search:React.FC = ()=>{
  const [value,setValue]= useState('')
  const searchChange=(e)=>{
    setValue(e.target.value)
  }
  const startSearch=(e)=>{
    if(e.code==='Enter'&&value){
      console.log(value)
    }

  }
  return (
    <SearchBox>
      <img src={searchImg} alt="" />
      <SearchInput value={value} onChange={(e)=>{searchChange(e)}} onKeyDown={startSearch.bind(this)}  type="text" placeholder="搜索 SOFI" />
    </SearchBox>
  )
}