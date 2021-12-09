import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Icon } from 'components';
import { Flex, Button, Box } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { useStore } from 'store';
import { relativeTime } from 'utils';
import { SortIcon } from './SortIcon';
import { Link } from 'react-router-dom';
import MentionOperator from 'view/News/components/MentionOperator';
import { FollowPopup, CommentPop, List, ContentParsing } from 'components';
import { Api } from 'apis';
import { ReadType } from 'hooks/imHooks/types';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import {
  CommentListBox,
  CommentTitle,
  CommentItem,
  CommentHeader,
  CommentContent,
  // CommentFooter,
  CommentListFooter
} from './style';
type Iprops = {
  itemData: any;
  nonce: number
};

export const CommentList: React.FC<Iprops> = (props: Iprops) => {
  const { t } = useTranslation();
  const { itemData, nonce } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);
  const [sortTime, setSortTime] = useState(1);
  const [sortLike, setSortLike] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const currentUid = useStore(p => p.loginReducer.userInfo);

  let listRef: any = useRef();
  useEffect(() => {
    listRef.current.loadList();
  }, [refresh]);
  const initList = () => {
    setListData([]);
    setPage(1);
    setTotalPage(2);
    setRefresh(!refresh);
  };
  const changeSortTime = () => {
    setSortTime(sortTime === 1 ? 0 : 1);
    initList();
  };
  const changeSortLike = () => {
    setSortLike(sortLike === 1 ? 0 : 1);
    initList();
  };
  const getList = () => {
    if (!itemData.id) return;
    console.log(page, sortTime);

    Api.CommentApi.getCommentList({
      pid: itemData.id,
      prepage: 5,
      page: page,
      sort_add_time: sortTime,
      sort_like: sortLike
    }).then(res => {
      setLoading(false);
      console.log(res);
      if (Api.isSuccess(res)) {
        setPage(page + 1);
        setListData([...listData, ...(res.data.list || [])]);
        // setListData([...listData, ...(res.data.list.map(item=>({...item,post:item,post_id:item.pid})))])
        setTotalPage(res.data.total_page);
      }
    });
  };
  return (
    <CommentListBox>
      <CommentTitle justifyContent="space-between" alignItems="center">
        <span>{t('newsCommentMenuTitle')}</span>
        <div className="sort-box">
          <div>
            {t('detailHeat')}{' '}
            <SortIcon
              changeSort={changeSortLike}
              flag={sortLike === 0}
            ></SortIcon>
          </div>
          <div>
            {t('detailTime')}{' '}
            <SortIcon
              changeSort={changeSortTime}
              flag={sortTime === 0}
            ></SortIcon>
          </div>
        </div>
      </CommentTitle>
      <List
        ref={listRef}
        marginTop={410}
        renderList={() => {
          if (!itemData.id) return;
          if (loading || page > totalPage) return false;
          setLoading(true);
          getList();
        }}
      >
        {listData.map((item, index) => (
          <CommentItem key={item.id}>
            {
              // 浏览自己的不扣费
              currentUid?.uid !== item.user_id && (
                <SpendTimeViewWithArticle nonce={nonce} readType={ReadType.COMMENT} articleId={item.id} />
              )
            }
            <Flex>
              <Avatar
                src={item.user_avator_url}
                style={{ width: '50px', height: '50px' }}
                scale="md"
              />
              <div style={{ flex: 1, marginLeft: '22px' }}>
                <CommentHeader justifyContent="space-between">
                  <Flex>
                    <div>
                      <div>{item.user_name}</div>
                      <div className="relative-time">
                        {relativeTime(item.add_time)}
                      </div>
                    </div>
                    {item.comment_user_name && (
                      <div className="reply">
                        回复
                        <span>@{item.comment_user_name}</span>
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    <CommentPop
                      postUserId={itemData.user_id}
                      data={item}
                      callback={initList}
                    >
                      <Icon
                        name="icon-gengduo"
                        current={1}
                        margin="8px 15px 0 0"
                        color="#7E7E7E"
                      />
                    </CommentPop>
                    {/* <MorePopup data={new Object()}> */}
                    {/* </MorePopup> */}
                  </Flex>
                </CommentHeader>
                <ContentParsing content={item.comment} />
              </div>
            </Flex>
            <MentionOperator
              type={'Comment'}
              callback={initList}
              itemData={{
                ...item,
                comment: {
                  ...item,
                  content: item.comment
                }
              }}
              postId={item.pid}
              commentId={item.id}
            ></MentionOperator>
          </CommentItem>
        ))}
      </List>
      {/* <CommentListFooter>没有更多内容了</CommentListFooter> */}
    </CommentListBox>
  );
};
