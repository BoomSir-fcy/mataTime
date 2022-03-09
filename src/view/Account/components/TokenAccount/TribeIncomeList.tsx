import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Empty, Flex, Spinner, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import { shortenAddress } from 'utils/contract';
import dayjs from 'dayjs';
import { Api } from 'apis';

export const ContentBox = styled(Flex)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;

export const TitleBox = styled(Flex)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const TableBox = styled(Box)`
  width: 100%;
  overflow: auto;
`;
const Table = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  min-width: 600px;
  .LinkRow {
    /* cursor: pointer; */
  }
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 20% 30% 20% 15% 15%;
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
    width: 50px;
    max-height: 50px;
  }
`;
const SpecialTag = styled(Text)`
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 8px;
`;

const TribeIncomeList: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const getList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await Api.TribeApi.MyJoinedTribeList({
        page,
        page_size: pageSize,
      });
      if (Api.isSuccess(res)) {
        setList(res.data);
        setTotal(res.data?.total_count || 1);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setList([]);
    }
  }, [page, pageSize]);

  useEffect(() => {
    // getList();
  }, []);

  const handlePageClick = useCallback(
    event => {
      setPage(event.selected + 1);
    },
    [setPage],
  );

  const getTotalPage = useCallback(() => {
    if (pageSize !== 0 && total % pageSize === 0) {
      return parseInt(String(total / pageSize));
    }
    if (pageSize !== 0 && total % pageSize !== 0) {
      return parseInt(String(total / pageSize)) + 1;
    }
  }, [total, pageSize]);

  return (
    <>
      <ContentBox>
        <TableBox>
          <Table>
            <Row>
              <HeadText>{t('Tribe')}</HeadText>
              <HeadText>{t('Name')}</HeadText>
              <HeadText>{t('Account Number of readers')}</HeadText>
              <HeadText>{t('Account Day income')}</HeadText>
              <HeadText>{t('Account Cumulative income')}</HeadText>
            </Row>
            {list?.length ? (
              list.map(item => (
                <Row key={item.uid} className='LinkRow'>
                  <Flex flexWrap='wrap' alignItems='baseline'>
                    <ItemText
                      maxWidth={item.invitation_type === 1 ? '70%' : ''}
                      small
                      ellipsis
                    >
                      {item.nick_name}
                    </ItemText>
                    {item.invitation_type === 1 && (
                      <SpecialTag small>{t('Special')}</SpecialTag>
                    )}
                  </Flex>
                  <ItemText small ellipsis>
                    {shortenAddress(item.address)}
                  </ItemText>
                  <ItemText small ellipsis>
                    {dayjs(item.add_time).format(t('YYYY-MM-DD HH:mm:ss'))}
                  </ItemText>
                  <ItemText small ellipsis>
                    {item.timer}
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
              {t('Account Total %page% page', { page: getTotalPage() })}
            </Text>
            <ReactPaginate
              breakLabel='...'
              nextLabel='>'
              forcePage={page - 1}
              disableInitialCallback={true}
              onPageChange={handlePageClick}
              pageRangeDisplayed={4}
              marginPagesDisplayed={1}
              pageCount={getTotalPage()}
              previousLabel='<'
              renderOnZeroPageCount={null}
            />
          </PaginateStyle>
        </TableBox>
      </ContentBox>
    </>
  );
});

export default TribeIncomeList;
