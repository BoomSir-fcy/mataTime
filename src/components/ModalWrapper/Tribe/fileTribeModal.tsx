import React from 'react';
import ReactPaginate from 'react-paginate';
import { Flex, Box, Text } from 'uikit';
import { ModalWrapper, Loading } from 'components';
import { useTranslation } from 'contexts';
import { Container } from './styles';

import getFileExt from 'utils/getFileExt';
import FileIcon from 'components/Icon/FileIcon';

import PaginateStyle from 'style/Paginate';

export const FileTribeModal: React.FC<{
  visible: boolean;
  loading: boolean;
  files: any;
  onClose: () => void;
  onchangePage: (page: number) => void;
}> = ({ visible, loading, onClose, files, onchangePage }) => {
  const { t } = useTranslation();
  const pages = Math.ceil(files?.total_count / files?.page_size);
  const handlePageClick = event => {
    onchangePage(event.selected + 1);
  };

  return (
    <ModalWrapper visible={visible} setVisible={onClose}>
      <Container>
        <Loading visible={loading} />
        <Box>
          {(files?.list ?? []).map((item, index) => (
            <Flex
              as='a'
              href={`${item.url}`}
              target='_blank'
              key={index}
              mb='10px'
              rel='noreferrer'
            >
              <FileIcon ext={getFileExt(item.url)} />
              <Text ellipsis ml='9px' color='textPrimary'>
                {item.file_name}
              </Text>
            </Flex>
          ))}
        </Box>
        {files?.list.length > 0 && (
          <PaginateStyle alignItems='center' justifyContent='end'>
            <Text className='totalPage' fontSize='14px' color='textTips'>
              {t('pageTotalpage', { page: pages })}
            </Text>
            <ReactPaginate
              breakLabel='...'
              nextLabel='>'
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={pages}
              previousLabel='<'
              renderOnZeroPageCount={null}
            />
          </PaginateStyle>
        )}
      </Container>
    </ModalWrapper>
  );
};
