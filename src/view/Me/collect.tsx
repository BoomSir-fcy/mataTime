import React, { useState } from 'react';
import { Box, Flex, Text, Card } from 'uikit';
import { List } from 'components';

import { CrumbsHead } from './components';
import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';

import { Api } from 'apis';

enum MoreOperatorEnum {
  SHIELD = 'SHIELD', // 屏蔽
  SETTOP = 'SETTOP',
  DELPOST = 'DELPOST'
}

const Collect = props => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);
  const [total, setTotal] = useState(0);

  const init = async (current?: number) => {
    setLoading(true);
    try {
      const res = await Api.MeApi.collectList(current || page);
      setLoading(false);
      if (Api.isSuccess(res)) {
        setPage((current || page) + 1);
        setTotalPage(res.data.total_num);
        setTotal(res.data.total_num);
        setListData(
          current
            ? [...(res.data?.list || [])]
            : [...listData, ...(res.data?.list || [])]
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <CrumbsHead>
        <Flex>
          <Text fontWeight="bold" mr="10px" fontSize="14px">
            我的收藏
          </Text>
          <Text fontSize="14px">{total}条</Text>
        </Flex>
      </CrumbsHead>
      <List
        marginTop={14}
        loading={loading}
        renderList={() => {
          if (loading || page > totalPage) return false;
          init();
        }}
      >
        {listData.map((item, index) => {
          return (
            <MeItemWrapper key={index}>
              <MentionItem
                {...props}
                itemData={{
                  ...item,
                  is_like: item.like_status,
                  post: {
                    ...item,
                    is_fav: 1
                  }
                }}
                callback={(item: any, type: MoreOperatorEnum) => init(1)}
              ></MentionItem>
              <MentionOperator
                itemData={{
                  ...item,
                  is_like: item.like_status,
                  post: {
                    ...item,
                    is_fav: 1
                  }
                }}
                callback={(item: any) => init(1)}
              />
            </MeItemWrapper>
          );
        })}
      </List>
    </Box>
  );
};

export default Collect;
