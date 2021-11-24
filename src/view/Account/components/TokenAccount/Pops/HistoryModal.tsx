/* eslint-disable */
import React, { useCallback, useState } from 'react';
import { Flex, Box, Text, Button, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { splitThousandSeparator } from 'utils/formatBalance';
import { Link } from 'react-router-dom';

const CountBox = styled(Box)`
min-width: 20vw;
`
const Table = styled(Flex)`
flex-direction: column;
align-items: center;
justify-content: space-between;
`
const Row = styled.div`
width: 100%;
display: grid;
grid-template-columns: 40% 40% 20%;
align-items: center;
height: 30px;

`
const HeadText = styled(Text)`
 color: ${({ theme }) => theme.colors.textTips};
 font-size: 14px;
&:last-child{
text-align: right;
}
`
const ItemText = styled(Text)`
 color: ${({ theme }) => theme.colors.white_black};
 font-size: 14px;
&:last-child{
text-align: right;
img{
  width: 20px;
}
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
      <Table>
        <Row>
          <HeadText>时间</HeadText>
          <HeadText>金额</HeadText>
          <HeadText>区块</HeadText>
        </Row>
        <Row>
          <ItemText>123</ItemText>
          <ItemText>23123</ItemText>
          <ItemText as={Link} to="/">
            <img src={require('assets/images/myWallet/BSC_logo.png').default} alt="" />
          </ItemText>
        </Row>
      </Table>
    </CountBox>
  )
}

export default HistoryModal;
