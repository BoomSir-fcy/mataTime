/* eslint-disable */
import React, { useCallback, useState } from 'react';
import { Flex, Box, Text, Button, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { splitThousandSeparator } from 'utils/formatBalance';

const CountBox = styled(Box)`
min-width: 20vw;
`
const InputBox = styled(Flex)`
position: relative;
align-items: center;
`
const Max = styled(Text)`
position: absolute;
right: 15px;
color:${({ theme }) => theme.colors.ThemeText};
cursor: pointer;
font-size: 14px;
`
const SureBtn = styled(Button)`
padding: 6px 30px;
background: ${({ theme }) => theme.colors.backgroundPrimary};
width: 60%;
`
const MyInput = styled(Input)`
border-radius: 10px;
padding:12px 50px 12px 16px;
height: 50px;
&::placeholder {
    color: ${({ theme }) => theme.colors.textTips};
  }
`
// type 1 充值 2 提币
interface init {
  token: string
  type: number
}

const HistoryModal: React.FC<init> = ({ token, type }) => {

  return (
    <CountBox>
      123123
    </CountBox>
  )
}

export default HistoryModal;
