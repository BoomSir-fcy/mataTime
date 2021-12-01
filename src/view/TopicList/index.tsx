import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { useToast } from 'hooks';
import { Box } from 'uikit';
import { Crumbs, List } from 'components';
import { Api } from 'apis';

import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';

const TopicList = props => {
  const listRef: any = React.useRef<HTMLDivElement | null>();
  const { id, name } = props.match.params;
  const { toastError } = useToast();
  const [state, setState] = useImmer({
    loading: false,
    page: 1,
    totalPage: 1,
    listData: []
  });

  const { loading, page, totalPage, listData } = state;

  const getList = async (current?: number) => {
    if (loading || page > totalPage) return false;
    setState(p => {
      p.loading = true;
    });
    console.log(id, name);
    try {
      const res = await Api.HomeApi.findByHotTopicIdList({
        page: current || page,
        per_page: 20,
        topic_id: id === 'empty' ? null : id,
        topic_name: name
      });
      if (Api.isSuccess(res)) {
        setState(p => {
          p.loading = false;
          p.page = current || page + 1;
          p.totalPage = res.data.total_page;
          p.listData = current
            ? [...res.data.List]
            : [...listData, ...res.data.List];
        });
      } else {
        toastError(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Crumbs back centerTitle={`#${name}#`} />
      <List
        ref={listRef}
        marginTop={320}
        loading={loading}
        renderList={getList}
      >
        {listData.map((item, index) => (
          <MeItemWrapper key={`${item.id}_${index}`}>
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
              callback={() => getList(1)}
            />
            <MentionOperator
              {...props}
              replyType="twitter"
              postId={item.id}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id
                }
              }}
              callback={() => getList(1)}
            />
          </MeItemWrapper>
        ))}
      </List>
    </Box>
  );
};

export default TopicList;
