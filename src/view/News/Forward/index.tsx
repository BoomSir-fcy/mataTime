import React, { useState } from 'react';
import { List, FollowPopup, ContentParsing } from 'components';
import { Api } from 'apis';
import { useTranslation } from 'contexts';
import { Text, Flex } from 'uikit';
import { displayTime } from 'utils';

import { NewsMeWrapper, ContentEllipsis } from './style';

import MessageCard from '../components/MessageCard';

const MessageRepost = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);
  const { t } = useTranslation();

  // 获取列表
  const getList = (current = 0) => {
    if ((loading || page > totalPage) && !current) {
      return false;
    }
    setLoading(true);
    Api.NewsApi.getMessageList(30, current || page, 50).then(res => {
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

  return (
    <NewsMeWrapper>
      <List
        marginTop={410}
        loading={page <= totalPage}
        renderList={() => getList()}
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
              content={
                item.comment?.comment_id
                  ? item?.comment?.comment
                  : item.post?.content
              }
              current_href={`/articledetils/${item.forward_id}`}
              href={`/articledetils/${item.post?.post_id}?comment_id=${item.comment?.comment_id}`}
            >
              <Flex flexWrap='nowrap'>
                <ContentEllipsis mt='5px'>
                  <ContentParsing content={item.msg_content} />
                </ContentEllipsis>
              </Flex>
            </MessageCard>
          );
        })}
      </List>
    </NewsMeWrapper>
  );
};

export default MessageRepost;
