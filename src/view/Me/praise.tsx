import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { List, MoreOperatorEnum } from 'components';
import { Box, Button, Text, Card, Flex } from 'uikit';

import { Api } from 'apis';

import { CrumbsHead } from './components';
import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';

const Header = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 13px;
`;

const Praise = React.memo(props => {
  const [state, setState] = useImmer({
    loading: false,
    list: [],
    page: 1,
    totalPage: 2
  });
  const { loading, page, totalPage, list } = state;

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    let arr = [];
    list.forEach((item: any) => {
      let obj = item;
      if (item.id === newItem.id) {
        obj = { ...newItem.post };
      }
      if (item.id === newItem.id && (type === MoreOperatorEnum.SHIELD || type === MoreOperatorEnum.DELPOST)) {
        // 屏蔽、删除
      } else if (item.id === newItem.id && type === MoreOperatorEnum.SETTOP) {
        // 置顶
        arr.unshift(obj);
      } else {
        arr.push(obj);
      }
    });
    setState(p => {
      p.list = [...arr];
    });
  };

  return (
    <Box>
      <CrumbsHead>
        <Box>
          <Button style={{ marginRight: '11px' }}>全部点赞</Button>
          <Button>今日新增</Button>
        </Box>
      </CrumbsHead>
      <List
        marginTop={13}
        loading={loading}
        renderList={() => {
          if (loading || page > totalPage) return false;
          setState(p => {
            p.loading = true;
          });
          Api.MeApi.praiseList(page).then(res => {
            setState(p => {
              p.loading = false;
            });
            if (Api.isSuccess(res)) {
              setState(p => {
                p.page = page + 1;
                p.list = [...list, ...(res.data.list || [])];
              });
            }
          });
        }}
      >
        {list.map((item, index) => (
          <MeItemWrapper key={`${item.id}+${index}`}>
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
            />
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
        ))}
      </List>
    </Box>
  );
});

export default Praise;
