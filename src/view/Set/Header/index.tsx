import React from 'react'
import styled from "styled-components";

const HeaderBox = styled.div`
width: 670px;
background:#191F2D;
padding: 21px 17px;
color: #fff;
border-radius: 10px;
font-weight: bold;
`

const Header = () => {
  return (
    <HeaderBox>设置</HeaderBox>
  )
}

export default Header;