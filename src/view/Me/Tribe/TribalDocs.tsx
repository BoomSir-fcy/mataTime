import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box, Text, Button, Input, Empty, Spinner } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import dayjs from 'dayjs';
import { Crumbs } from 'components';
import BtnIcon from 'view/Tribe/components/BtnIcon';

const CountBox = styled(Box)`
  /* ${({ theme }) => theme.mediaQueriesSize.padding} */
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
  .head {
    background: ${({ theme }) => theme.colors.backgroundCard};
  }
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 20% 70% 10%;
  align-items: center;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
const HeadText = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
  font-size: 14px;
  &:last-child {
    text-align: right;
  }
`;
const ItemText = styled(Text)`
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 14px;
`;
const LoadingAnimation = styled(Box)`
  width: 100%;
`;

const TextBtn = styled(Button)`
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0;
  text-align: right;
  height: auto;
  &:hover {
    text-decoration: underline;
  }
`;

interface init {}

const MeTribeTribalDocs: React.FC<init> = () => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const [pageSize, setpageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [TribalDocsList, setTribalDocsList] = useState([
    {
      id: 1,
      title: '学习学习学习方式的',
    },
    {
      id: 2,
      title: '自行车发个广告',
    },
    {
      id: 3,
      title: '华盛顿发射地球万物',
    },
  ]);

  const handlePageClick = event => {
    // setLoading(true);
  };

  return (
    <CountBox>
      <Crumbs title='部落文件'>
        <BtnIcon name='icon-shangchuan1' text={t('上传文件')} />
      </Crumbs>
      <TableBox>
        <Table>
          <Row className='head'>
            <HeadText>{t('文档ID')}</HeadText>
            <HeadText>{t('文档标题')}</HeadText>
            <HeadText>{t('管理')}</HeadText>
          </Row>
          {TribalDocsList.length
            ? TribalDocsList.map((item, index) => (
                <Row key={`${item.id}${index}`}>
                  <ItemText>{item.id}</ItemText>
                  <ItemText>{item.title}</ItemText>
                  <Flex justifyContent='end'>
                    <TextBtn variant='text'>{t('Delete')}</TextBtn>
                  </Flex>
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
        <Text className='totalPage' fontSize='14px' color='textTips'>
          {t('Account Total %page% page', { page: pageCount })}
        </Text>
        <ReactPaginate
          breakLabel='...'
          nextLabel='>'
          forcePage={page - 1}
          disableInitialCallback={true}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel='<'
          renderOnZeroPageCount={null}
        />
      </PaginateStyle>
    </CountBox>
  );
};

export default MeTribeTribalDocs;
