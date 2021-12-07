import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useImmer } from 'use-immer';
import { shortenAddress } from 'utils/contract';
import { Flex, Box, Text } from 'uikit';
import { Api } from 'apis';

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

export const TableList = React.memo(() => {
  const [state, setState] = useImmer({
    list: [],
    page: 1,
    total: 0,
    pageCount: 0
  });
  const { page } = state;

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
    setState(p => {
      p.page = event.selected + 1;
    });
  };

  const init = async () => {
    try {
      const res = await Api.AccountApi.getRewardList({ page });
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
  }, [state.page]);

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
        {state.list.map((item, index) => {
          const stringArray: any[] = [];
          let context: any[] = [];
          try {
            context = Array.isArray(JSON.parse(item.post))
              ? JSON.parse(item.post)
              : [];
          } catch (err) {
            console.log(err);
          }
          return (
            <Row className="matterStyle" key={`${item.time}${index}`}>
              <ItemText ellipsis>
                {stringArr(context, stringArray).join(',')}
              </ItemText>
              <ItemText>
                <Flex>
                  {item.sender_nickname}
                  <Text ml="10px" color="textTips" ellipsis>
                    {shortenAddress(item.sender_address)}
                  </Text>
                </Flex>
              </ItemText>
              <ItemText>{item.amount}</ItemText>
              <ItemText>{item.amount}</ItemText>
              <ItemText>
                {dayjs(item.add_time).format('YYYY-MM-DD HH:mm:ss')}
              </ItemText>
            </Row>
          );
        })}
      </Table>
      {state.list.length > 0 && (
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
      )}
    </Wraper>
  );
});
