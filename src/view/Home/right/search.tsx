import React,{ useState, useRef} from 'react';
import styled from "styled-components";

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
      <SearchInput value={value} onChange={(e)=>{searchChange(e)}} onKeyDown={startSearch.bind(this)}  type="text" placeholder="搜索 SOFI" />
  )
}