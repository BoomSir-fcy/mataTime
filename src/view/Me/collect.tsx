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

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    let arr = [];
    listData.forEach((item: any) => {
      let obj = item;
      if (item.id === newItem.id) {
        obj = { ...newItem.post };
      }
      if (
        item.id === newItem.id &&
        (type === MoreOperatorEnum.SHIELD || type === MoreOperatorEnum.DELPOST)
      ) {
        // 屏蔽、删除
      } else if (item.id === newItem.id && type === MoreOperatorEnum.SETTOP) {
        // 置顶
        arr.unshift(obj);
      } else {
        arr.push(obj);
      }
    });
    setListData([...arr]);
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
          setLoading(true);
          Api.MeApi.collectList(page).then(res => {
            setLoading(false);
            if (res.msg === 'success') {
              setPage(page + 1);
              setTotalPage(res.data.total_num);
              setTotal(res.data.total_num);
              setListData([...listData, ...(res.data?.list || [])]);
            }
          });
        }}
      >
        {listData.map((item, index) => {
          return (
            <MeItemWrapper key={index}>
              <MentionItem
                {...props}
                itemData={{
                  ...item,
                  post_id: item.id,
                  post: {
                    ...item,
                    post_id: item.id
                  }
                }}
                callback={(item: any, type: MoreOperatorEnum) => {
                  updateList(item, type);
                }}
              ></MentionItem>
              <MentionOperator
                itemData={{
                  ...item,
                  post_id: item.id,
                  post: {
                    ...item,
                    post_id: item.id
                  }
                }}
                callback={(item: any) => {
                  updateList(item);
                }}
              />
            </MeItemWrapper>
          );
        })}
      </List>
    </Box>
  );
};

export default Collect;
