import React, { useCallback, useState } from 'react';
import { Crumbs, Icon } from 'components';
import PaginateStyle from 'style/Paginate';
import ReactPaginate from 'react-paginate';
import { Box, Text, Button, Flex, Spinner, Empty, Input } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import { HeadText, ItemText, Row, Table, TableBox } from './styled';

const InputStyled = styled.label`
  max-width: 300px;
  padding: 8px 20px;
  background-color: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: 20px;
`;
const MeTribeMemberManagement = () => {
  const { t } = useTranslation();
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(1);
  const loading = false;
  const list = [];
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
    <Box>
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
          <Row>
            <HeadText>{t('Nickname')}</HeadText>
            <HeadText>{t('Address')}</HeadText>
            <HeadText>{t('Joined Time')}</HeadText>
            <HeadText>{t('Manage')}</HeadText>
          </Row>
          <Row className='LinkRow'>
            <ItemText small ellipsis>
              CHILL
            </ItemText>
            <ItemText small ellipsis>
              0x4...464F
            </ItemText>
            <ItemText small ellipsis>
              22-01-12 18:00:00
            </ItemText>
            <ItemText small>
              <Button scale='sm' variant='text'>
                {t('删除')}
              </Button>
            </ItemText>
          </Row>
          <Row className='LinkRow'>
            <ItemText small ellipsis>
              CHILL
            </ItemText>
            <ItemText small ellipsis>
              0x4...464F
            </ItemText>
            <ItemText small ellipsis>
              22-01-12 18:00:00
            </ItemText>
            <ItemText small>
              <Button scale='sm' variant='text'>
                {t('删除')}
              </Button>
              <Button scale='sm' variant='text'>
                {t('禁言')}
              </Button>
            </ItemText>
          </Row>
          {/* {list?.length ? (
            list.map(item => (
              <Row key={item.uid} className='LinkRow'>
                <ItemText small ellipsis>
                  1
                </ItemText>
                <ItemText small ellipsis>
                  如何拿住比特币V1.0.PDF
                </ItemText>
            <ItemText small>
              <Button scale='sm' variant='text'>
                {t('删除')}
              </Button>
              <Button scale='sm' variant='text'>
                {t('禁言')}
              </Button>
            </ItemText>
              </Row>
            ))
          ) : (
            <>{!loading && <Empty />}</>
          )} */}
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
    </Box>
  );
};

export default MeTribeMemberManagement;
