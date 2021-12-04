/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box, Text, Button, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';


const CountBox = styled(Box)`
${({ theme }) => theme.mediaQueriesSize.padding}
border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`
const Table = styled(Flex)`
flex-direction: column;
align-items: center;
width: 100%;
min-height:300px;
.Reward{
grid-template-columns: 60% 40%;
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
}

const VestingTime: React.FC<init> = ({ }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [pageCount, setPageCount] = useState(10);

  const dispatch = useDispatch()
  const HistoryList = [{
    Round: 1,
    endTIME: 100,
    Vesting: 300,
    Claimable: 353231
  }]
  const handlePageClick = (event) => {
    console.log(event.selected);
  };
  return (
    <CountBox>
      <Table>
        <Row>
          <HeadText>{t('Round')}</HeadText>
          <HeadText>{t('Vesting end TIME')}</HeadText>
          <HeadText>{t('Vesting $TIME')}</HeadText>
          <HeadText>{t('Claimable $TIME')}</HeadText>
        </Row>
        {
          HistoryList.map((item, index) => (
            <Row key={`${item.Round}${index}`}>
              <ItemText>{item.Round}</ItemText>
              <ItemText>{item.endTIME}</ItemText>
              <ItemText>{item.Vesting}</ItemText>
              <ItemText>{item.Claimable}</ItemText>
            </Row>
          ))
        }
      </Table>
      <PaginateStyle alignItems='center' justifyContent='end'>
        <Text mr='16px' fontSize='14px' color='textTips'>总共 12页</Text>
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

export default VestingTime;
