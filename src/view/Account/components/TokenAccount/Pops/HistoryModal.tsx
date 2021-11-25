/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box, Text, Button, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { splitThousandSeparator } from 'utils/formatBalance';
import { Link } from 'react-router-dom';
import { Api } from 'apis';
import { useFetchHistoryList } from 'store/wallet/hooks';
import { useStore } from 'store';
import dayjs from 'dayjs'

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
grid-template-columns: 55% 30% 15%;
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
  cursor: pointer;
}
}
`
// type 1 充值 2 提币
interface init {
  token: string
  type: number
}

const HistoryModal: React.FC<init> = ({ token, type }) => {
  useFetchHistoryList()
  const { account } = useWeb3React()
  const BalanceList = useStore(p => p.wallet.history);
  const openLink = (hash) => {
    window.open(`https://testnet.bscscan.com/tx/${hash}`)
  }
  const getTime = (time) => {
    const filshTime = dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    return filshTime
  }
  return (
    <CountBox>
      <Table>
        <Row>
          <HeadText>时间</HeadText>
          <HeadText>金额</HeadText>
          <HeadText>区块</HeadText>
        </Row>
        {
          BalanceList.event_list.map(item => (
            <Row>
              <ItemText>{getTime(item.event_time)}</ItemText>
              <ItemText>{item.event_type === 1 ? '+' : '-'}{item.event_amount}</ItemText>
              <ItemText onClick={() => openLink(item.event_hash)}>
                <img src={require('assets/images/myWallet/BSC_logo.png').default} alt="" />
              </ItemText>
            </Row>
          ))
        }
      </Table>
    </CountBox>
  )
}

export default HistoryModal;
