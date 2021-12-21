import React, { useState } from 'react';
import { Box, Text, Flex } from 'uikit';
import dayjs from 'dayjs';
import MentionItem, { MentionItemUser } from '../components/MentionItem';
import MentionOperator from '../components/MentionOperator';
import { useTranslation } from 'contexts/Localization';
import { List, ContentParsing, MoreOperatorEnum, FollowPopup, Icon } from 'components';
import { Api } from 'apis';
import { NewsCommentWrapper, CommentItemWrapper } from './style';
import MessageCard from '../components/MessageCard'
import styled from 'styled-components';

const NoneEventsText = styled(Text)`
  pointer-events: none;
  & > *{
    display: inline;
  }
`

const NewsComment: React.FC = props => {
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
        {
          listData.map(item => {
            return (
              <MessageCard
                key={item.id}
                avatar={item.send_image}
                title={item.send_name}
                date={dayjs(item.add_time).format(t('MM-DD HH:mm'))}
                image_list={item.post?.image_list}
                content_status={item.post?.content_status}
                content={item.post?.content}
                href={`/articleDetils/${item.post?.post_id}`}
              >
                <Box>
                  <FollowPopup uid={item.send_uid}>
                    <Text as="span" maxWidth="20vw" ellipsis color='textPrimary' style={{ cursor: 'pointer' }} >{item.send_name}&nbsp;</Text>
                  </FollowPopup>
                  <Text  as="span" ellipsis mr="0.5em">{t('commented: ')}</Text>
                  <NoneEventsText  as="span" ellipsis maxLine={2}>
                    <ContentParsing disableParseSquare content={item.comment.comment} />
                  </NoneEventsText>
                </Box>
              </MessageCard>
            )
          })
        }
        {/* {listData.map(item => {
          if (item?.post?.content_status === 1) {
            return (
              <CommentItemWrapper key={item.id}>
                <MentionItemUser
                  more={false}
                  itemData={{
                    ...item,
                    ...item.post,
                    ...item.comment,
                    user_name: item.send_name,
                    user_avator_url: item.send_image,
                    uid: item.send_uid,
                    user_address: item.send_address
                  }}
                  callback={data => {
                    updateList(data);
                  }}
                />

                {item.comment.comment_user_name ? (
                  <div className="reply-wrapper">
                    {t('newsCommentReply')}
                    <a>@{item.comment.comment_user_name}</a>
                    <div>
                      <ContentParsing
                        content={item.comment.comment}
                      ></ContentParsing>
                    </div>
                  </div>
                ) : (
                  <div className="reply-wrapper">
                    <ContentParsing
                      content={item.comment.comment}
                    ></ContentParsing>
                  </div>
                )}
                <div className="comment-content">
                  <MentionItem
                    itemData={{
                      ...item.comment,
                      ...item.post,
                      add_time: item.post.add_time_desc,
                      user_name: item.post.nick_name,
                      user_avator_url: item.post.nft_image
                    }}
                    {...props}
                    more={false}
                    size={'small'}
                  />
                </div>
              </CommentItemWrapper>
            );
          }
        })} */}
      </List>
    </NewsCommentWrapper>
  );
};

export default NewsComment;
