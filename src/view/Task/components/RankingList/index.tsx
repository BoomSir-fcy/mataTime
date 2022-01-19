import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { Crumbs } from 'components';
import { Box, Text, Flex, Spinner, Empty } from 'uikit';
import { ContentBox } from '../Invite';
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import { shortenAddress } from 'utils/contract';
import styled from 'styled-components';
import { useFetchInviteRankingList } from 'view/Task/hooks/matter';
import Rule from './Rule';

const RankingFlex = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`;
const RankingBox = styled(Box)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  }
`;
const RuleBox = styled(Box)`
  margin-top: 20px;
  min-width: 300px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 300px;
  }
`;
const BgBox = styled(Box)`
  position: relative;
  height: auto;
  display: flex;
  align-items: center;
  background: url('${require('assets/images/task/ranking.png').default}')
    no-repeat;
  background-size: 260px;
  background-position-x: center;
  background-position-y: 20px;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
  ${({ theme }) => theme.mediaQueries.md} {
    height: 100vh;
    background-size: 400px;
  }
  .coin1 {
    transform: scale(0.6);
    position: absolute;
    top: 5%;
    left: -10%;
    ${({ theme }) => theme.mediaQueries.md} {
      top: 10%;
      left: 6%;
    }
  }
  .coin2 {
    transform: scale(0.6);
    position: absolute;
    top: 16%;
    left: 35%;
    ${({ theme }) => theme.mediaQueries.md} {
      left: 45%;
    }
  }
  .coin3 {
    transform: scale(0.6);
    position: absolute;
    top: 17%;
    left: 70%;
    ${({ theme }) => theme.mediaQueries.md} {
      left: 79%;
    }
  }
`;
const ContentCard = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundThemeCard};
  box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.58);
  border-radius: 10px;
  margin-top: 180px;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
  z-index: 1;
`;
const Table = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  height: 350px;
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 10% 25% 25% 20% 20%;
  align-items: center;
  justify-items: center;
  min-height: 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 10% 35% 20% 15% 20%;
  }
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
  font-size: 14px;
  margin-bottom: 10px;
  &:first-child {
    margin-right: 10px;
    overflow: hidden;
  }
  &:last-child {
    text-align: right;
  }
  img {
    width: 30px;
    max-height: 30px;
  }
`;

const RankingList: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const { list, pageNum, pageSize, setPageNum, loading, total } =
    useFetchInviteRankingList();

  const handlePageClick = useCallback(
    event => {
      setPageNum(event.selected + 1);
    },
    [pageNum],
  );

  const getTotalPage = totalNum => {
    if (pageSize !== 0 && totalNum % pageSize == 0) {
      return parseInt(String(totalNum / pageSize));
    }
    if (pageSize != 0 && totalNum % pageSize != 0) {
      return parseInt(String(totalNum / pageSize)) + 1;
    }
  };
  const totalPage = useMemo(() => getTotalPage(total), [total]);
  const renderRanking = useCallback(number => {
    if (number === 1) {
      return (
        <img
          width='30px'
          src={require('assets/images/task/first.png').default}
          alt=''
        />
      );
    }
    if (number === 2) {
      return (
        <img
          width='30px'
          src={require('assets/images/task/second.png').default}
          alt=''
        />
      );
    }
    if (number === 3) {
      return (
        <img
          width='30px'
          src={require('assets/images/task/third.png').default}
          alt=''
        />
      );
    }
    return number;
  }, []);
  return (
    <RankingFlex>
      <RankingBox>
        <Crumbs back />
        <ContentBox>
          <Text fontSize='18px' bold>
            {t('Invitation Leaderboard')}
          </Text>
        </ContentBox>
        <BgBox>
          <img
            className='coin1'
            src={require('assets/images/task/goldCoinLeft.png').default}
            alt=''
          />
          <img
            className='coin2'
            src={require('assets/images/task/goldCoinLeft.png').default}
            alt=''
          />
          <img
            className='coin3'
            src={require('assets/images/task/goldCoinRight.png').default}
            alt=''
          />
          <ContentCard>
            <Flex width='100%' flexDirection='column' justifyContent='flex-end'>
              <Table>
                <Row>
                  <HeadText>{t('Ranking')}</HeadText>
                  <HeadText>{t('Nickname')}</HeadText>
                  <HeadText>{t('Address')}</HeadText>
                  <HeadText>{t('Number of invitees')}</HeadText>
                  <HeadText>{t('Reward')}</HeadText>
                </Row>
                {list?.length ? (
                  list.map(item => (
                    <Row key={item.superior_uid} className='LinkRow'>
                      <ItemText>{renderRanking(item.rank)}</ItemText>
                      <ItemText width='100%' textAlign='center' small ellipsis>
                        {item.superior_nickname}
                      </ItemText>
                      <ItemText small ellipsis>
                        {shortenAddress(item.superior)}
                      </ItemText>
                      <ItemText small ellipsis>
                        {item.invite_num}
                      </ItemText>
                      <ItemText small ellipsis>
                        {item.income}DSG
                      </ItemText>
                    </Row>
                  ))
                ) : (
                  <>{!loading && <Empty />}</>
                )}
                {loading && (
                  <Flex alignItems='center' justifyContent='center'>
                    <Spinner />
                  </Flex>
                )}
              </Table>

              <PaginateStyle alignItems='center' justifyContent='flex-end'>
                <Text mr='16px' fontSize='14px' color='textTips'>
                  {t('Account Total %page% page', { page: totalPage })}
                </Text>
                <ReactPaginate
                  breakLabel='...'
                  nextLabel='>'
                  forcePage={pageNum - 1}
                  disableInitialCallback={true}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={4}
                  marginPagesDisplayed={1}
                  pageCount={totalPage}
                  previousLabel='<'
                  renderOnZeroPageCount={null}
                />
              </PaginateStyle>
            </Flex>
          </ContentCard>
        </BgBox>
      </RankingBox>
      <RuleBox>
        <Rule />
      </RuleBox>
    </RankingFlex>
  );
});

export default RankingList;
