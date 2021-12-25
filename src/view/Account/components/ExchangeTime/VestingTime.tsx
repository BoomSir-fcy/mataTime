/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box, Text, Button, Spinner, Empty } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import { useFetchRewardNum, useFetTimeExchangeList } from 'store/wallet/hooks';
import { useStore } from 'store';
import dayjs from 'dayjs';
import {
  fetchTimeExchangeList,
  fetchRewardNumAsync
} from 'store/wallet/reducer';
import { useRewardErc20, useRewardErc20All } from './hook';
import Dots from 'components/Loader/Dots';
import { formatDisplayApr } from 'utils/formatBalance';

const CountBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  /* overflow: auto; */
`;
const TableBox = styled(Box)`
  width: 100%;
  overflow: auto;
`
const Table = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  position: relative;
  min-width: 600px;
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 15% 25% 25% 23% 12%;
  align-items: center;
  min-height: 30px;
`;
const HeadText = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
  font-size: 14px;
  margin-bottom: 10px;
  &:last-child {
    text-align: right;
  }
`;
const ItemText = styled(Text)`
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 14px;
  margin-bottom: 10px;
  &:last-child {
    text-align: right;
    img {
      width: 20px;
      cursor: pointer;
    }
  }
`;
const LoadingAnimation = styled(Box)`
  /* position: absolute; */
  width: 100%;
`;

const WithDrawAllBox = styled(Flex)`
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${({ theme }) => theme.mediaQueriesSize.paddingsm}
  img {
    width: 40px;
  }
`;

interface btn {
  ReleaseAmount?: number;
  id?: number;
  all?: boolean;
  upDate: () => void;
}
const ClaimButton: React.FC<btn> = ({ upDate, all, ReleaseAmount, id }) => {
  const [pending, setpending] = useState(false);
  const { onWithdraw } = useRewardErc20();
  const { onWithdrawAll } = useRewardErc20All();
  const { t } = useTranslation();
  // 领取
  const handleReward = useCallback(
    async id => {
      try {
        setpending(true);
        await onWithdraw(id);
        upDate();
        // todo确认是否需要更新本轮兑换详情
      } catch (e) {
        console.error(e);
      } finally {
        setpending(false);
      }
    },
    [onWithdraw]
  );
  // 全部领取
  const handleRewardAll = useCallback(async () => {
    try {
      setpending(true);
      await onWithdrawAll();
      upDate();
      // todo确认是否需要更新本轮兑换详情
    } catch (e) {
      console.error(e);
    } finally {
      setpending(false);
    }
  }, [onWithdrawAll]);
  return (
    <>
      {all ? (
        <Button
          disabled={ReleaseAmount === 0 || pending}
          onClick={handleRewardAll}
        >
          {pending ? <Dots>{t('Time Claiming')}</Dots> : t('Time Claim all')}
        </Button>
      ) : (
        <Button
          disabled={ReleaseAmount === 0 || pending}
          onClick={() => handleReward(id)}
        >
          {pending ? <Dots>{t('Time Claiming')}</Dots> : t('Time Claim')}
        </Button>
      )}
    </>
  );
};

// type 1 内容 2 打赏
interface init {
  type?: number;
}

const VestingTime: React.FC<init> = ({ }) => {
  useFetchRewardNum();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [Loading, setLoading] = useState(true);

  useFetTimeExchangeList(page, pageSize);
  const HistoryList = useStore(p => p.wallet.TimeExchangeList);
  const RewardNum = useStore(p => p.wallet.rewardNum);

  const handlePageClick = event => {
    setLoading(true);
    const changePage = event.selected + 1;
    setPage(changePage);
    dispatch(fetchRewardNumAsync(account));
    // dispatch(fetchTimeExchangeList({ account, page: changePage, pageSize }))
  };

  const upDate = useCallback(() => {
    setLoading(true);
    setPage(1);
    // dispatch(fetchTimeExchangeList({ account, page: 1, pageSize }))
    dispatch(fetchRewardNumAsync(account));
  }, [dispatch, account, pageSize]);

  useEffect(() => {
    if (HistoryList.length > 0) {
      // 获取总页数
      setPageCount(HistoryList[0].totalPage);
    }
    setLoading(false);
  }, [HistoryList]);
  return (
    <>
      <WithDrawAllBox alignItems='center' justifyContent='space-between'>
        <Flex>
          <img src='/images/tokens/TIME.svg' alt='' />
          <Flex ml='14px' flexDirection='column' justifyContent='space-between'>
            <Text fontSize='14px' color='textTips'>
              {t('Time Unclaimed income')}
            </Text>
            <Text>{formatDisplayApr(RewardNum)}</Text>
          </Flex>
        </Flex>
        <ClaimButton ReleaseAmount={RewardNum} all upDate={upDate} />
      </WithDrawAllBox>
      <CountBox>
        <TableBox>
          <Table>
            <Row>
              <HeadText>{t('Round')}</HeadText>
              <HeadText>{t('Vesting end TIME')}</HeadText>
              <HeadText>{t('Vesting $TIME')}</HeadText>
              <HeadText>{t('Claimable $TIME')}</HeadText>
              <HeadText></HeadText>
            </Row>
            {HistoryList.length
              ? HistoryList.map((item, index) => (
                <Row key={`${item.round}${index}`}>
                  {item.totalPage > 0 && (
                    <>
                      <ItemText>{item.round}</ItemText>
                      <ItemText>
                        {dayjs(item.endTime * 1000).format(
                          t('YYYY-MM-DD hh:mm:ss')
                        )}
                      </ItemText>
                      <ItemText>
                        {formatDisplayApr(item.RemainingAmount)}
                      </ItemText>
                      <ItemText>
                        {formatDisplayApr(item.ReleaseAmount)}
                      </ItemText>
                      <ItemText>
                        <ClaimButton
                          ReleaseAmount={item.ReleaseAmount}
                          id={item.id}
                          upDate={upDate}
                        />
                      </ItemText>
                    </>
                  )}
                </Row>
              ))
              : !Loading && <Empty />}
            {Loading && (
              <LoadingAnimation>
                <Spinner />
              </LoadingAnimation>
            )}
          </Table>
        </TableBox>
        <PaginateStyle alignItems='center' justifyContent='end'>
          <Text mr='16px' fontSize='14px' color='textTips'>
            {t('Account Total %page% page', { page: pageCount })}
          </Text>
          <ReactPaginate
            breakLabel='...'
            nextLabel='>'
            forcePage={page - 1}
            disableInitialCallback={true}
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel='<'
            renderOnZeroPageCount={null}
          />
        </PaginateStyle>
      </CountBox>
    </>
  );
};

export default VestingTime;
