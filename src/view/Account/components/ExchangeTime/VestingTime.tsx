/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box, Text, Button, Spinner } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import { useFetTimeExchangeList } from 'store/wallet/hooks';
import { useStore } from 'store';
import dayjs from 'dayjs'
import { fetchTimeExchangeList } from 'store/wallet/reducer';
import { useRewardErc20 } from './hook';
import Dots from 'components/Loader/Dots';


const CountBox = styled(Box)`
${({ theme }) => theme.mediaQueriesSize.padding}
border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`
const Table = styled(Flex)`
flex-direction: column;
align-items: center;
width: 100%;
min-height:300px;
position: relative;
`
const Row = styled.div`
width: 100%;
display: grid;
grid-template-columns: 15% 23% 30% 20% 12%;
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
const LoadingAnimation = styled(Box)`
  position: absolute;
  width: 100%;
`

const ClaimButton = ({ ReleaseAmount, id, upDate }) => {
  const [pending, setpending] = useState(false)
  const { onWithdraw } = useRewardErc20()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // 领取
  const handleReward = useCallback(async (id) => {
    console.log(id);
    try {
      setpending(true)
      await onWithdraw(id)
      upDate()
      // todo确认是否需要更新本轮兑换详情
    } catch (e) {
      console.error(e)
    } finally {
      setpending(false)
    }
  }, [onWithdraw])
  return (
    <Button disabled={ReleaseAmount === 0 || pending} onClick={() => handleReward(id)}>
      {pending ? <Dots>{t('领取中')}</Dots> : t('领取')}
    </Button>
  )
}


// type 1 内容 2 打赏
interface init {
  type?: number
}

const VestingTime: React.FC<init> = ({ }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setpageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [Loading, setLoading] = useState(true);
  useFetTimeExchangeList(page, pageSize)

  const HistoryList = useStore(p => p.wallet.TimeExchangeList);

  const handlePageClick = (event) => {
    setLoading(true)
    const changePage = event.selected + 1
    dispatch(fetchTimeExchangeList({ account, page: changePage, pageSize, end: HistoryList[0].end }))
  };

  const upDate = useCallback(() => {
    dispatch(fetchTimeExchangeList({ account, page, pageSize }))
  }, [dispatch, account, pageSize])

  useEffect(() => {
    if (HistoryList.length > 0) {
      // 获取总页数
      setPageCount(HistoryList[0].totalPage)
    }
    setLoading(false)
  }, [HistoryList])

  return (
    <CountBox>
      <Table>
        <Row>
          <HeadText>{t('Round')}</HeadText>
          <HeadText>{t('Vesting end TIME')}</HeadText>
          <HeadText>{t('Vesting $TIME')}</HeadText>
          <HeadText>{t('Claimable $TIME')}</HeadText>
          <HeadText></HeadText>
        </Row>
        {
          HistoryList.map((item, index) => (
            <Row key={`${item.round}${index}`}>
              <ItemText>{item.round}</ItemText>
              <ItemText>{dayjs(item.endTime * 1000).format(t('YYYY-MM-DD hh:mm:ss'))}</ItemText>
              <ItemText>{item.RemainingAmount}</ItemText>
              <ItemText>{item.ReleaseAmount}</ItemText>
              <ItemText>
                <ClaimButton ReleaseAmount={item.ReleaseAmount} id={item.id} upDate={upDate} />
              </ItemText>
            </Row>
          ))
        }
        {
          Loading && <LoadingAnimation><Spinner /></LoadingAnimation>
        }
      </Table>
      <PaginateStyle alignItems='center' justifyContent='end'>
        <Text mr='16px' fontSize='14px' color='textTips'>总共 {pageCount}页</Text>
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
