import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Flex, Box, Text } from 'uikit';
import { Api } from 'apis';

import ReactPaginate from 'react-paginate';
import PaginateStyle from 'style/Paginate';
import { useImmer } from 'use-immer';
import { ppid } from 'process';

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
  grid-template-columns: 40% 15% 15% 15% 15%;
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

export const TableList = React.memo(() => {
  const [state, setState] = useImmer({
    list: [],
    total: 0,
    pageCount: 0
  });

  const handlePageClick = event => {
    console.log(event.selected);
  };

  const init = async () => {
    try {
      const res = await Api.AccountApi.getRewardList();
      console.log(res);
      if (Api.isSuccess(res)) {
        setState(p => {
          p.list = res.data.list || [];
          p.total = res.data.total_num;
          p.pageCount = res.data.total_page;
        });
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <Wraper>
      <Table>
        <Row className="matterStyle">
          <HeadText>创作</HeadText>
          <HeadText>打赏用户</HeadText>
          <HeadText>打赏币种</HeadText>
          <HeadText>打赏金额</HeadText>
          <HeadText>打赏时间</HeadText>
        </Row>
        {state.list.map((item, index) => (
          <Row className="matterStyle" key={`${item.time}${index}`}>
            <ItemText>{item.time}</ItemText>
            <ItemText>{item.sender_nickname}</ItemText>
            <ItemText>{item.amount}</ItemText>
            <ItemText>{item.amount}</ItemText>
            <ItemText>
              {dayjs(item.add_time).format('YYYY-MM-DD HH:mm:ss')}
            </ItemText>
          </Row>
        ))}
      </Table>
      <PaginateStyle alignItems="center" justifyContent="end">
        <Text mr="16px" fontSize="14px" color="textTips">
          总共 {state.pageCount}页
        </Text>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          pageCount={state.pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </PaginateStyle>
    </Wraper>
  );
});
