import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Icon,
  CommentPop,
  List,
  ContentParsing,
  PopupWrap
} from 'components';
import { Flex, Button, Box } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { useStore } from 'store';
import { relativeTime } from 'utils';

import { Api } from 'apis';
import { ReadType } from 'hooks/imHooks/types';

import MentionOperator from 'view/News/components/MentionOperator';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import {
  CommentListBox,
  CommentTitle,
  CommentItem,
  CommentHeader,
  CommentContent,
  // CommentFooter,
  CommentListFooter
} from './style';
import { SortIcon } from './SortIcon';

type Iprops = {
  itemData: any;
  nonce: number;
  setNonce: React.Dispatch<React.SetStateAction<number>>;
};

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;

export const CommentList: React.FC<Iprops> = (props: Iprops) => {
  const { t } = useTranslation();
  const { itemData, nonce, setNonce } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);
  const [sortTime, setSortTime] = useState(1);
  const [sortLike, setSortLike] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const currentUid = useStore(p => p.loginReducer.userInfo);
  const popupRefs = React.useRef();
  const theme = useTheme();

  useEffect(() => {
    // listView?.renderList();
    getList(1);
  }, [refresh]);

  const initList = () => {
    setListData([]);
    setPage(1);
    setTotalPage(2);
    setRefresh(!refresh);
  };

  const changeSortTime = () => {
    document.body.scrollIntoView({ block: "start", inline: "nearest" })
    setSortTime(sortTime === 1 ? 0 : 1);
    initList();
  };
  const changeSortLike = () => {
    document.body.scrollIntoView({ block: "start", inline: "nearest" })
    setSortLike(sortLike === 1 ? 0 : 1);
    initList();
  };

  const getList = (current?: number) => {
    if (!itemData.id) return;
    Api.CommentApi.getCommentList({
      pid: itemData.id,
      prepage: MAX_SPEND_TIME_PAGE_TATOL,
      page: current || page,
      sort_add_time: sortTime,
      sort_like: sortLike
    }).then(res => {
      setLoading(false);
      if (Api.isSuccess(res)) {
        setPage((current || page) + 1);
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
            {t('detailHeat')}
            <SortIcon changeSort={changeSortLike} flag={sortLike === 0} />
          </div>
          <div>
            {t('detailTime')}
            <SortIcon changeSort={changeSortTime} flag={sortTime === 0} />
          </div>
        </div>
      </CommentTitle>
      <List
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
                <SpendTimeViewWithArticle
                  nonce={nonce}
                  setNonce={setNonce}
                  readType={ReadType.COMMENT}
                  articleId={item.id}
                />
              )
            }
            <Flex>
              <Box as={Link} to={`/me/profile/${item.user_id}`}>
                <Avatar src={item.user_avator_url} scale="md" />
              </Box>
              <div style={{ flex: 1, marginLeft: '14px' }}>
                <CommentHeader justifyContent="space-between" mb="15px">
                  <Flex>
                    <div>
                      <div>{item.user_name}</div>
                      <div className="relative-time">
                        {relativeTime(item.add_time)}
                      </div>
                    </div>
                    {item.comment_user_name && (
                      <div className="reply">
                        {t('reply')}
                        <span>@{item.comment_user_name}</span>
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    <PopupWrap
                      ref={popupRefs}
                      trigger={
                        <PopupButton>
                          <Icon
                            name="icon-gengduo"
                            current={1}
                            color="#7E7E7E"
                          />
                        </PopupButton>
                      }
                      arrowStyle={{
                        color: theme.colors.tertiary,
                        stroke: theme.colors.tertiary
                      }}
                    >
                      <CommentPop
                        postUserId={itemData.user_id}
                        data={item}
                        callback={initList}
                      />
                    </PopupWrap>
                    {/* <MorePopup data={new Object()}> */}
                    {/* </MorePopup> */}
                  </Flex>
                </CommentHeader>
                <ContentParsing content={item.comment} />
              </div>
            </Flex>
            <MentionOperator
              type="Comment"
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
            />
          </CommentItem>
        ))}
      </List>
      {/* <CommentListFooter>没有更多内容了</CommentListFooter> */}
    </CommentListBox>
  );
};
