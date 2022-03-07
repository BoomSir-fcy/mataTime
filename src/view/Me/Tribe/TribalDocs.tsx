import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box, Text, Button, Input, Empty, Spinner } from 'uikit';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import dayjs from 'dayjs';
import { CommonInquiryModal, Crumbs } from 'components';
import BtnIcon from 'view/Tribe/components/BtnIcon';
import { Api } from 'apis';
import { useToast } from 'hooks';
import { useTribeState } from 'store/tribe/hooks';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { getTotalPage } from './MemberManagement';
import UploadFile from '../components/UploadFile';

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
  const parseQs = useParsedQueryString();

  const [inqueryType, setInqueryType] = useState<string>('deleteFile');
  const [commonInqueryShow, setCommonInqueryShow] = useState<boolean>(false);
  const [pageSize, setpageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [TribalDocsList, setTribalDocsList] = useState([]);
  const [FileId, setFileId] = useState(null);
  const { toastSuccess, toastError } = useToast();

  // 文件列表
  const getFileList = async page => {
    try {
      const res = await Api.TribeApi.tribeFileList({
        page,
        page_size: pageSize,
        tribe_id: Number(parseQs.i),
      });
      if (Api.isSuccess(res)) {
        const Data = res.data;
        setTribalDocsList(Data.list);
        setPage(Data.page);
        setPageCount(getTotalPage(Data.total_count, pageSize));
      } else {
        throw new Error('errCode');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      throw error;
    }
  };
  // 删除文件
  const DeleteFile = async () => {
    const res = await Api.TribeApi.tribeFileDelete({
      id: FileId,
      tribe_id: Number(parseQs.i),
    });
    if (Api.isSuccess(res)) {
      toastSuccess(t('moreDeleteSuccess'));
    } else {
      toastError(t('moreDeleteError'));
    }
    getFileList(page);
    setCommonInqueryShow(false);
  };

  const handlePageClick = event => {
    setLoading(true);
    const changePage = event.selected + 1;
    getFileList(changePage);
  };

  useEffect(() => {
    if (parseQs.i) getFileList(1);
  }, []);
  return (
    <CountBox>
      <Crumbs title='部落文件'>
        <UploadFile
          onSuccess={() => getFileList(1)}
          tribe_id={Number(parseQs.i)}
        />
        {/* <BtnIcon name='icon-shangchuan1' text={t('上传文件')} /> */}
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
                  <ItemText>{item.file_name}</ItemText>
                  <Flex justifyContent='end'>
                    <TextBtn
                      variant='text'
                      onClick={() => {
                        setFileId(item.id);
                        setCommonInqueryShow(true);
                      }}
                    >
                      {t('moreDelete')}
                    </TextBtn>
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
      {/* 统一询问框 */}
      <CommonInquiryModal
        show={commonInqueryShow}
        type={inqueryType}
        onClose={() => {
          setCommonInqueryShow(false);
        }}
        onQuery={() => {
          DeleteFile();
        }}
      />
    </CountBox>
  );
};

export default MeTribeTribalDocs;
