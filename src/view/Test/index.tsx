import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button, Box, Text, Toggle, Card, Flex, Input } from 'uikit';
import { IM } from 'utils';
import { languagesOptions } from 'config/localization';
import { useTranslation } from 'contexts/Localization';
import { Select } from 'components';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import { toast } from 'react-toastify';
import { Http } from 'apis/http';
import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
  color: #fff;
`;

const CardStyled1 = styled(Card)`
  border-radius: 32px;
  background: ${({ theme }) => (theme.isDark ? '#37cdc0' : '#f1d45f')};
`;
const CardStyled2 = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundLight};
`;

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map(item => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

const Test = () => {
  const { t } = useTranslation();
  const [languange, setUseLanguage] = useLanguange();
  const [isDark, toggleThemeHandle] = useThemeManager();
  const [inputVal, setInputVal] = useState<string>('');
  const [currentItems, setCurrentItems] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    console.log(event.selected + 1);

    setPageNum(event.selected);
    setItemOffset(newOffset);
  };
  return (
    <StyledNotFound>
      <Items currentItems={currentItems} />
      <PaginateStyle alignItems='center' justifyContent='end'>
        <Text mr='16px' fontSize='14px' color='textTips'>
          {t('Account Total %page% page', { page: pageCount })}
        </Text>
        <ReactPaginate
          breakLabel='...'
          nextLabel='>'
          forcePage={pageNum - 1}
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel='<'
          renderOnZeroPageCount={null}
        />
        <Flex alignItems='center'>
          跳至
          <Input
            style={{ width: '100px' }}
            scale='sm'
            value={inputVal}
            onChange={e => {
              setInputVal(e.target.value.replaceAll(/[^0-9]/g, ''));
            }}
            onKeyUp={e => {
              if (e.keyCode === 13 && inputVal) {
                if (Number(inputVal) >= 1 && Number(inputVal) <= pageCount) {
                  setPageNum(Number(inputVal));
                  setInputVal('');
                }
              }
            }}
          />
          页
        </Flex>
      </PaginateStyle>
    </StyledNotFound>
  );
};
export default Test;
