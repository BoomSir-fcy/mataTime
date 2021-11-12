import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { Flex, Box, Button } from 'uikit'
import MiniSwap from 'libs/mini-swap'

const SwapBox = styled.div`
margin-top:15px;
width: 300px;
/* height: 436px; */
`
export const Swap: React.FC = () => {
  return (
    <SwapBox>
      <MiniSwap isDark lang="zh-CN" />
    </SwapBox>
  )
}