/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box, Text, Button, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import { useFetTimeIncomeList, useFetTimeIncometoday } from 'store/wallet/hooks';
import { useStore } from 'store';


const CountBox = styled(Box)`
${({ theme }) => theme.mediaQueriesSize.padding}
`
const Table = styled(Flex)`
flex-direction: column;
align-items: center;
width: 100%;
min-height:300px;
.Reward{
grid-template-columns: 60% 40%;
}
.matterStyle{
grid-template-columns: 26% 27% 27% 20%;
}
`
const Row = styled.div`
width: 100%;
display: grid;
grid-template-columns: 40% 20% 20% 20%;
align-items: center;
min-height: 30px;
`
const HeadText = styled(Text)`
 color: ${({ theme }) => theme.colors.textTips};
 font-size: 14px;
 margin-bottom: 10px;
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

// type 1 内容 2 打赏
interface init {
  type?: number
  token?: string
}

const EarningsRecord: React.FC<init> = ({ type, token }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const [pageSize, setpageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  useFetTimeIncomeList(page, pageSize)
  const List = useStore(p => p.wallet.TimeIncomeList);

  const HistoryList = [{
    content: '才就是当你闹事的操作下简称耨爱收到你',
    read: 100,
    Icome: 300,
    total: 353231
  }]
  const TaskHistoryList = [{
    time: 1638783725,
    type: 1,
    info: 'gslp',
    Icome: 353231
  }]
  const handlePageClick = (event) => {
    console.log(event.selected);
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    // setItemOffset(newOffset);
  };

  return (
    <CountBox>
      {
        token === 'Matter' ?
          <Table>
            <Row className='matterStyle'>
              <HeadText>{t('Account Date')}</HeadText>
              <HeadText>{t('Account Task type')}</HeadText>
              <HeadText>{t('Account Task details')}</HeadText>
              <HeadText>{t('Account Day income')}</HeadText>
            </Row>
            {
              TaskHistoryList.map((item, index) => (
                <Row className='matterStyle' key={`${item.time}${index}`}>
                  <ItemText>{item.time}</ItemText>
                  <ItemText>{item.type}</ItemText>
                  <ItemText>{item.info}</ItemText>
                  <ItemText>{item.Icome}</ItemText>
                </Row>
              ))
            }
          </Table>
          :
          <Table>
            <Row className={type === 2 ? 'Reward' : ''}>
              <HeadText>{t('Account Creation')}</HeadText>
              {
                type === 1 &&
                <>
                  <HeadText>{t('Account Number of readers')}</HeadText>
                  <HeadText>{t('Account Day income')}</HeadText>
                </>
              }
              <HeadText>{t('Account Cumulative income')}</HeadText>
            </Row>
            {
              HistoryList.map((item, index) => (
                <Row className={type === 2 ? 'Reward' : ''} key={`${item.content}${index}`}>
                  <ItemText>{item.content}</ItemText>
                  {
                    type === 1 &&
                    <>
                      <ItemText>{item.read}</ItemText>
                      <ItemText>{item.Icome}</ItemText>
                    </>
                  }
                  <ItemText>{item.total}</ItemText>
                </Row>
              ))
            }
          </Table>
      }

      <PaginateStyle alignItems='center' justifyContent='end'>
        <Text mr='16px' fontSize='14px' color='textTips'>{t('Account Total %page% page', { page: pageCount })}</Text>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </PaginateStyle>
    </CountBox >
  )
}

export default EarningsRecord;
