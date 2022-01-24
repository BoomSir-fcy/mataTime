import React, { useState } from 'react';
import { Box, Text, Flex } from 'uikit';
import dayjs from 'dayjs';
import { Api } from 'apis';
import { useTranslation } from 'contexts';
import MentionItem, { MentionItemUser } from '../components/MentionItem';
import {
  Icon,
  MoreOperatorEnum,
  List,
  ContentParsing,
  FollowPopup,
} from 'components';
import { NewsPraiseWrapper, PraiseItemWrapper } from './style';
import MessageCard from '../components/MessageCard';
import { displayTime } from 'utils';

const NewsPraise: React.FC = props => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);
  const tabsChange = ({ value, paramsName }) => {
    getList(1, paramsName === 'add_Time' ? value : null);
  };
  // 获取列表
  const getList = (current = 0, add_Time = null) => {
    if ((loading || page > totalPage) && !current) {
      return false;
    }
    setLoading(true);
    Api.NewsApi.getMessageList(3, current || page, 50, add_Time).then(res => {
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
    <NewsPraiseWrapper>
      {/* <Tabs
        tabsChange={tabsChange}
        tabLeftArr={[
          {
            label: t('newsNotice'),
            value: '3',
            paramsName: 'message_type'
          }
        ]}
        // tabRightArr={[
        //   {
        //     label: '全部点赞',
        //     value: null,
        //     paramsName: 'add_Time'
        //   },
        //   {
        //     label: '今日点赞',
        //     value: dayjs().format('YYYY-MM-DD'),
        //     paramsName: 'add_Time'
        //   }
        // ]}
      /> */}
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
              href={`/articledetils/${item.post?.post_id}`}
            >
              <Flex flexWrap='nowrap'>
                <FollowPopup uid={item.send_uid}>
                  <Text
                    maxWidth='100px'
                    ellipsis
                    color='textPrimary'
                    style={{ cursor: 'pointer' }}
                  >
                    {item.send_name}&nbsp;
                  </Text>
                </FollowPopup>
                <Icon
                  size={12}
                  name='icon-aixin1'
                  margin='7px 10px 0 0'
                  color='textOrigin'
                />
                {item.comment.comment_id ? (
                  <Text ellipsis>{t('your comment')}</Text>
                ) : (
                  <Text ellipsis>{t('your post')}</Text>
                )}
              </Flex>
            </MessageCard>
          );
        })}
        {/* {listData.map(item => {
          if (item?.post?.content_status === 1) {
            return (
              <PraiseItemWrapper key={item.id}>
                <Box padding="25px 25px 0">
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
                  <div className="reply-wrapper">
                    <Icon name={'icon-aixin1'} color={'#EC612B'}></Icon>{' '}
                    <span className={'reply-tip'}>
                      {t('newsPraiseContent')}
                    </span>
                    <ContentParsing
                      content={item.comment.comment}
                      callback={(type: MoreOperatorEnum) => {
                        updateList(item, type);
                      }}
                    ></ContentParsing>
                  </div>
                </Box>
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
              </PraiseItemWrapper>
            );
          }
        })} */}
      </List>
    </NewsPraiseWrapper>
  );
};

export default NewsPraise;
