/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box, Text, Link, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useFetchHistoryList } from 'view/Account/hooks/walletInfo';
import { useTranslation } from 'contexts/Localization';
import { getBscScanLink } from 'utils/contract';
import BigNumber from 'bignumber.js';
import {
  formatDisplayApr,
  formatDisplayBalanceWithSymbol,
} from 'utils/formatBalance';

const CountBox = styled(Box)`
  width: 88vw;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 600px;
  }
`;
const Table = styled(Flex)`
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 55% 30% 15%;
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
    display: flex;
    justify-content: end;
    img {
      width: 20px;
      cursor: pointer;
    }
  }
`;
const ScrollBox = styled(Table)`
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
`;

interface init {
  token: number;
}

const HistoryModal: React.FC<init> = ({ token }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const {
    list: HistoryList,
    page,
    setPageNum,
    loading,
    end,
  } = useFetchHistoryList(token);
  const loadMore = useCallback(
    (e: any) => {
      const { offsetHeight, scrollTop, scrollHeight } = e.nativeEvent.target;
      if (offsetHeight + scrollTop === scrollHeight) {
        if (loading || end) return; // 判断是否在请求状态或者已到最后一页
        setPageNum(page + 1);
      }
    },
    [loading, page, end],
  );

  const getTime = time => {
    const filshTime = dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
    return filshTime;
  };

  return (
    <CountBox>
      <Table>
        <Row>
          <HeadText>{t('AccountTime')}</HeadText>
          <HeadText>{t('AccountAmount')}</HeadText>
          <HeadText>{t('AccountBlock')}</HeadText>
        </Row>
        <ScrollBox onScroll={loadMore}>
          {HistoryList.map((item, index) => (
            <Row key={`${item.event_hash}${index}`}>
              {item.event_time > 0 && (
                <>
                  <ItemText>{getTime(item.event_time)}</ItemText>
                  <ItemText ellipsis>
                    {item.event_type === 1 ? '+' : '-'}
                    {item.event_amount}
                  </ItemText>
                  <ItemText>
                    {/* <img src={require('assets/images/myWallet/BSC_logo.png').default} alt="" /> */}
                    <Link
                      external
                      href={getBscScanLink(item.event_hash, 'transaction')}
                    >
                      <img
                        src={
                          require('assets/images/myWallet/BSC_logo.png').default
                        }
                        alt=''
                      />
                    </Link>
                  </ItemText>
                </>
              )}
            </Row>
          ))}
        </ScrollBox>
      </Table>
    </CountBox>
  );
};

export default HistoryModal;
