import React, { useCallback, useState } from 'react';
import { Crumbs, Icon } from 'components';
import PaginateStyle from 'style/Paginate';
import ReactPaginate from 'react-paginate';
import { Box, Text, Button, Flex, Spinner, Empty } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import { HeadText, ItemText, Row, Table, TableBox } from './styled';

const MeTribeTribalDocs = () => {
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
      <Crumbs title='部落文件'>
        <Button>
          <Flex alignItems='center'>
            <Icon name='icon-shangchuan1' size={18} />
            <Text ml='10px'>上传文件</Text>
          </Flex>
        </Button>
      </Crumbs>
      <TableBox>
        <Table>
          <Row columns='20% 60% 20%'>
            <HeadText>{t('文档ID')}</HeadText>
            <HeadText>{t('文档标题')}</HeadText>
            <HeadText>{t('管理')}</HeadText>
          </Row>
          <Row columns='20% 60% 20%' className='LinkRow'>
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
            </ItemText>
          </Row>
          <Row columns='20% 60% 20%' className='LinkRow'>
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
          {/* {list?.length ? (
            list.map(item => (
              <Row columns="20% 60% 20%" key={item.uid} className='LinkRow'>
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

export default MeTribeTribalDocs;
