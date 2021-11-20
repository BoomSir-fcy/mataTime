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

const Praise = React.memo(props => {
  const [state, setState] = useImmer({
    loading: false,
    list: [],
    page: 1,
    totalPage: 2
  });
  const { loading, page, totalPage, list } = state;

  const init = async (offset?: number) => {
    setState(p => {
      p.loading = true;
    });
    try {
      const res = await Api.MeApi.praiseList(offset || page);
      if (Api.isSuccess(res)) {
        setState(p => {
          p.loading = false;
        });
        if (Api.isSuccess(res)) {
          setState(p => {
            p.totalPage = res.data.total_page;
            p.page = (offset || page) + 1;
            p.list = offset
              ? [...(res.data.list || [])]
              : [...list, ...(res.data.list || [])];
          });
        }
      }
    } catch (error) {}
  };

  return (
    <Box>
      <CrumbsHead>
        {/* <Box>
          <Button style={{ marginRight: '11px' }}>全部点赞</Button>
          <Button>今日新增</Button>
        </Box> */}
      </CrumbsHead>
      <List
        marginTop={13}
        loading={loading}
        renderList={() => {
          if (loading || page > totalPage) return false;
          init();
        }}
      >
        {list.map((item, index) => (
          <MeItemWrapper key={`${item.id}+${index}`}>
            <MentionItem
              {...props}
              itemData={{
                ...item,
                is_like: item.like_status,
                user_id: item.uid,
                user_avator_url: item.nft_image,
                post: {
                  user_id: item.uid,
                  ...item
                }
              }}
              callback={() => init(1)}
            />
            <MentionOperator
              replyType="twitter"
              type="Article"
              postId={item.post_id}
              itemData={{
                ...item,
                is_like: item.like_status,
                user_id: item.uid,
                user_avator_url: item.nft_image,
                post: {
                  user_id: item.uid,
                  ...item
                }
              }}
              callback={() => init(1)}
            />
          </MeItemWrapper>
        ))}
      </List>
    </Box>
  );
});

export default Praise;
