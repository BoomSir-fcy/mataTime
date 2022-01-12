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

const Table = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
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
const FriendsList: React.FC = React.memo(() => {
  const { list, pageNum, pageSize, setPageNum, loading, total } =
    useFetchInviteFriendsList();
  const { t } = useTranslation();

  const handlePageClick = useCallback(
    event => {
      setPageNum(event.selected + 1);
    },
    [setPageNum],
  );

  const getTotalPage = totalNum => {
    if (pageSize != 0 && totalNum % pageSize == 0) {
      return parseInt(String(totalNum / pageSize));
    }
    if (pageSize != 0 && totalNum % pageSize != 0) {
      return parseInt(String(totalNum / pageSize)) + 1;
    }
  };

  const totalPage = useMemo(() => getTotalPage(total), [total]);
  return (
    <>
      {/* <Crumbs back />
      <ContentBox>
        <Text fontSize='18px' bold>
          {t('Invited Friends List')}
        </Text>
      </ContentBox> */}

      <ContentBox>
        <Flex width='100%' flexDirection='column' justifyContent='flex-end'>
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
      </ContentBox>
    </>
  );
});

export default FriendsList;
