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
min-width: 40vw;
`
const Table = styled(Flex)`
flex-direction: column;
align-items: center;
/* justify-content: space-between; */
`
const Row = styled.div`
width: 100%;
display: grid;
grid-template-columns: 55% 30% 15%;
align-items: center;
min-height: 30px;
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
  margin-bottom: 10px;
  &:last-child{
    text-align: right;
      img{
        width: 20px;
        cursor: pointer;
      }
  }
`
const Scroll = styled(Table)`
min-height:200px;
max-height: 500px;
overflow-y: auto;
width: 100%;
`

// type 1 充值 2 提币
interface init {
  token: string
  type: number
}

const HistoryModal: React.FC<init> = ({ token, type }) => {
  const { account } = useWeb3React()
  const [page, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(100)
  const [end, setEnd] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const BalanceList = useStore(p => p.wallet.history);
  const coin_type = token === 'Time' ? 1 : 2
  useFetchHistoryList({ coin_type, page, pageSize })

  // const loadMore = useCallback((e: any) => {
  //   const { offsetHeight, scrollTop, scrollHeight } = e.nativeEvent.target;
  //   if (offsetHeight + scrollTop === scrollHeight) {
  //     if (loading || end) return    // 判断是否在请求状态或者已到最后一页
  //     setPageNum(page + 1)
  //   }
  // }, [loading, page, end, setPageNum])


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
        <Scroll>
          {
            BalanceList.event_list.map(item => (
              <Row key={item.event_hash}>
                {item.event_time &&
                  <>
                    <ItemText>{getTime(item.event_time)}</ItemText>
                    <ItemText>{item.event_type === 1 ? '+' : '-'}{item.event_amount}</ItemText>
                    <ItemText onClick={() => openLink(item.event_hash)}>
                      <img src={require('assets/images/myWallet/BSC_logo.png').default} alt="" />
                    </ItemText>
                  </>
                }
              </Row>
            ))
          }
        </Scroll>
      </Table>
    </CountBox>
  )
}

export default HistoryModal;
