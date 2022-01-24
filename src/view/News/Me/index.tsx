import React, { useState } from 'react';
import MentionItem from '../components/MentionItem';
import MentionOperator from '../components/MentionOperator';
import { List, MoreOperatorEnum, FollowPopup } from 'components';
import { Api } from 'apis';
import { NewsMeWrapper, MeItemWrapper } from './style';
import MessageCard from '../components/MessageCard';
import dayjs from 'dayjs';
import { useTranslation } from 'contexts';
import { Text, Flex } from 'uikit';
import { displayTime } from 'utils';

const NewsMe: React.FC<any> = props => {
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
    Api.NewsApi.getMessageList(1, current || page, 50).then(res => {
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
    let arr = [];
    listData.forEach((item: any) => {
      let obj = item;
      if (item.id === newItem.id) {
        obj.post = { ...newItem.post };
      }
      if (type === MoreOperatorEnum.SHIELD) {
        // 屏蔽
      } else {
        arr.push(obj);
      }
    });
    setListData([...arr]);
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
              content={item.post?.content}
              href={`/articleDetils/${item.post?.post_id}`}
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
                <Text ellipsis>{t('mentioned you')}</Text>
              </Flex>
            </MessageCard>
          );
        })}
        {/* {listData.map(item => {
          if (item?.post?.content_status === 1) {
            return (
              <MeItemWrapper key={item.id}>
                <MentionItem
                  more={false}
                  itemData={{
                    ...item,
                    ...item.comment,
                    ...item.post,
                    user_name: item.send_name,
                    user_avator_url: item.send_image,
                    uid: item.send_uid
                  }}
                  {...props}
                  callback={(data, type: MoreOperatorEnum) => {
                    updateList(data, type);
                  }}
                />
                <MentionOperator
                  replyType={'twitter'}
                  hasLike={false}
                  postId={item.post.post_id}
                  itemData={{
                    ...item,
                    ...item.post,
                    user_avator_url: item.post.nft_image
                  }}
                  callback={(item: any, type?: MoreOperatorEnum) => {
                    updateList(item, type);
                  }}
                />
              </MeItemWrapper>
            );
          }
        })} */}
      </List>
    </NewsMeWrapper>
  );
};

export default NewsMe;
