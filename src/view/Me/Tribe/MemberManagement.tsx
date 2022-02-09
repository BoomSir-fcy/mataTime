import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box, Text, Button, Input, Empty, Spinner } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import dayjs from 'dayjs';
import { Crumbs, Icon } from 'components';
import BtnIcon from 'view/Tribe/components/BtnIcon';
import { shortenAddress } from 'utils/contract';

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
  grid-template-columns: 32% 26% 30% 12%;
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

const InputStyled = styled.label`
  max-width: 300px;
  padding: 8px 20px;
  background-color: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: 20px;
`;

interface init {}

const MeTribeMemberManagement: React.FC<init> = () => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const [pageSize, setpageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [MemberList, setMemberList] = useState([
    {
      name: '和关怀和v',
      address: '0xeda5b21b8E8c306bF5510d1558f89a9CB126120b',
      joinedTime: 1644217262,
    },
    {
      name: 'hhccc',
      address: '0xeda5b21b8E8c306bF5510d1558f89a9CB126120b',
      joinedTime: 1644217262,
    },
    {
      name: 'bbbbb',
      address: '0xeda5b21b8E8c306bF5510d1558f89a9CB126120b',
      joinedTime: 1644217262,
    },
  ]);

  const handlePageClick = event => {
    // setLoading(true);
  };

  return (
    <CountBox>
      <Crumbs title='成员管理'>
        <InputStyled htmlFor='search-input'>
          <Flex justifyContent='space-between' alignItems='center'>
            <Icon name='icon-sousuo' margin='0 10px' />
            <Input
              id='search-input'
              noShadow
              scale='sm'
              placeholder={t('搜索')}
            />
          </Flex>
        </InputStyled>
      </Crumbs>
      <TableBox>
        <Table>
          <Row className='head'>
            <HeadText>{t('昵称')}</HeadText>
            <HeadText>{t('地址')}</HeadText>
            <HeadText>{t('加入时间')}</HeadText>
            <HeadText>{t('管理')}</HeadText>
          </Row>
          {MemberList.length
            ? MemberList.map((item, index) => (
                <Row key={`${item.name}${index}`}>
                  <ItemText>{item.name}</ItemText>
                  <ItemText>{shortenAddress(item.address)}</ItemText>
                  <ItemText>
                    {dayjs(item.joinedTime * 1000).format('YY-MM-DD HH:mm')}
                  </ItemText>
                  <Flex justifyContent='space-between'>
                    <TextBtn variant='text'>{t('禁言')}</TextBtn>
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

export default MeTribeMemberManagement;
