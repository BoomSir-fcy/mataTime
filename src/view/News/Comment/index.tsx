import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Box, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { List, ContentParsing, MoreOperatorEnum } from 'components';
import { Api } from 'apis';
import { NewsCommentWrapper, CommentItemWrapper } from './style';
import MessageCard from '../components/MessageCard';
import styled from 'styled-components';
import { displayTime } from 'utils';

const NoneEventsText = styled(Text)`
  pointer-events: none;
  & > * {
    display: inline;
  }
`;

const NewsComment: React.FC<any> = props => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);

  // 获取列表
  const getList = (current = 0) => {
    if ((loading || page > totalPage) && !current) {
      return false;
    }
    setLoading(true);
    Api.NewsApi.getMessageList(2, current || page, 50).then(res => {
      setLoading(false);
      if (Api.isSuccess(res)) {
        setTotalPage(res.data.total_page);
        if (current === 1 || page === 1) {
          setListData([...(res.data.list || [])]);
          setPage(2);
        } else {
          setListData([...listData, ...(res.data.list || [])]);
          setPage(page + 1);
        }
      }
    });
  };

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    if (type === MoreOperatorEnum.COMMONT) {
      setPage(1);
      getList(1);
      return;
    }
    listData.map((item: any) => {
      if (item.id === newItem.id) {
        const obj = item;
        obj.post = newItem.post;
      }
      return item;
    });
    setListData([...listData]);
  };

  return (
    <NewsCommentWrapper>
      <List
        marginTop={410}
        loading={page <= totalPage}
        renderList={() => {
          getList();
        }}
      >
        {listData.map(item => {
          return (
            <MessageCard
              key={item.id}
              uid={item.send_uid}
              avatar={item.send_image}
              title={item.send_name}
              date={displayTime(item.add_time)}
              image_list={item.post?.image_list}
              content_status={item.post?.content_status}
              content={item.post?.content}
              href={`/articledetils/${item.post?.post_id}?comment_id=${item.comment.comment_id}`}
            >
              <Box>
                <NoneEventsText as='span' ellipsis maxLine={2}>
                  <ContentParsing content={item.comment.comment} />
                </NoneEventsText>
              </Box>
            </MessageCard>
          );
        })}
      </List>
    </NewsCommentWrapper>
  );
};

export default NewsComment;
