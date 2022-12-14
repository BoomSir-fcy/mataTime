import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Box, Empty, Flex, Spinner, Text } from 'uikit';
import { useFetchInviteFriendsList } from 'view/Task/hooks/matter';
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import { shortenAddress } from 'utils/contract';
import dayjs from 'dayjs';
// import { ContentBox } from '../Invite';
import { Crumbs } from 'components';

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
  grid-template-columns: 40% 20% 20% 20%;
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

interface init {
  showTitle?: boolean;
}
const FriendsList: React.FC<init> = React.memo(({ showTitle = true }) => {
  const { list, pageNum, pageSize, setPageNum, loading, total } =
    useFetchInviteFriendsList();
  const { t } = useTranslation();

  const handlePageClick = useCallback(
    event => {
      setPageNum(event.selected + 1);
    },
    [setPageNum],
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
      {showTitle && (
        <React.Fragment>
          <Crumbs back />
          <TitleBox>
            <Text fontSize='18px' bold>
              {t('Invited Friends List')}
            </Text>
          </TitleBox>
        </React.Fragment>
      )}
      <ContentBox>
        <TableBox>
          <Table>
            <Row>
              <HeadText>{t('Nickname')}</HeadText>
              <HeadText>{t('Address')}</HeadText>
              <HeadText>{t('Invitation Time')}</HeadText>
              <HeadText>{t('My Rebate(TIME)')}</HeadText>
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
              forcePage={pageNum - 1}
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

export default FriendsList;
