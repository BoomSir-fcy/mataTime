import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useStore } from 'store';
import { shortenAddress } from 'utils/contract';
import { Flex, Box, Text, Empty } from 'uikit';

import { useTranslation } from 'contexts/Localization';

import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';

const Wraper = styled(Box)`
  padding: 0 25px;
  margin-top: 32px;
`;
const Table = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
`;
const Row = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 25% 15% 15% 15%;
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
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 14px;
  margin-bottom: 10px;
  &:last-child {
    text-align: right;
    img {
      width: 20px;
      cursor: pointer;
    }
  }
`;

export const TableList: React.FC<{
  data;
  pageCount: number;
  onchangePage: (page: number) => void;
}> = React.memo(({ data, pageCount, onchangePage }) => {
  const tokenList = useStore(p => p.appReducer.supportTokenViews);
  const { t } = useTranslation();

  const stringArr = (newarr: any, stringArray: string[]) => {
    for (let i = 0; i < newarr.length; i++) {
      if (newarr[i].text) {
        stringArray.push(newarr[i].text);
      }
      if (newarr[i].children?.length > 0) {
        stringArr(newarr[i].children, stringArray);
      }
    }
    return stringArray;
  };

  const handlePageClick = event => {
    onchangePage(event.selected + 1);
  };

  return (
    <Wraper>
      <Table>
        <Row className="matterStyle">
          <HeadText>{t('rewardAutherTableText1')}</HeadText>
          <HeadText>{t('rewardAutherTableText2')}</HeadText>
          <HeadText>{t('rewardAutherTableText3')}</HeadText>
          <HeadText>{t('rewardAutherTableText4')}</HeadText>
          <HeadText>{t('rewardAutherTableText5')}</HeadText>
        </Row>
        {data.length > 0 ? (
          <>
            {data.map((item, index) => {
              const stringArray: any[] = [];
              let context: any[] = [];
              let token =
                tokenList.find(row => row[0].toLowerCase() === item.token) ||
                [];
              try {
                context = Array.isArray(JSON.parse(item.post))
                  ? JSON.parse(item.post)
                  : [];
              } catch (err) {
                console.log(err);
              }

              return (
                <Row className="matterStyle" key={`${item.add_time}_${index}`}>
                  <ItemText ellipsis>
                    {stringArr(context, stringArray).join(',')}
                  </ItemText>
                  <ItemText>
                    <Flex>
                      <Text width='56%' color="textTips" ellipsis>
                        {item.sender_nickname}
                      </Text>
                      <Text ml="10px" color="textTips" ellipsis>
                        {shortenAddress(item.sender_address)}
                      </Text>
                    </Flex>
                  </ItemText>
                  <ItemText>{token && token?.length && token[2]}</ItemText>
                  <ItemText>{item.amount}</ItemText>
                  <ItemText>
                    {dayjs(item.add_time).format('YYYY-MM-DD HH:mm:ss')}
                  </ItemText>
                </Row>
              );
            })}
          </>
        ) : (
          <Empty />
        )}
      </Table>
      {data.length > 0 && (
        <PaginateStyle alignItems="center" justifyContent="end">
          <Text mr="16px" fontSize="14px" color="textTips">
            总共 {pageCount}页
          </Text>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </PaginateStyle>
      )}
    </Wraper>
  );
});
