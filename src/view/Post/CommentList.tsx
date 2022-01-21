import React, { useState, useEffect } from 'react';
import styled, { useTheme, css } from 'styled-components';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Icon,
  CommentPop,
  List,
  ContentParsing,
  PopupWrap,
  MoreOperatorEnum,
} from 'components';
import { useToast } from 'hooks';
import { Flex, Text, Box, Button } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import { useStore } from 'store';
import { Api } from 'apis';

import { ReadType } from 'hooks/imHooks/types';
import { Commnet, SortIcon } from './components';
import eventBus from 'utils/eventBus';

import MentionOperator from 'view/News/components/MentionOperator';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import useParsedQueryString from 'hooks/useParsedQueryString';

import { CommentListBox, CommentTitle, CommentItem } from './style';

type Iprops = {
  itemData: any;
  nonce: number;
  setNonce: React.Dispatch<React.SetStateAction<number>>;
};

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;
const CommentStyle = styled(CommentListBox)`
  overflow-x: auto;
  overflow-y: hidden;
  ${({ theme }) => theme.mediaQueries.sm} {
    overflow: visible;
  }
`;
const CommentRows = styled(Flex)`
  padding: 8px 8px 0 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 18px 18px 0 28px;
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.backgroundCard};
    transition: all 0.3s;
  }
`;
const ChildrenComment = styled(Box)`
  border-left: solid 1px ${({ theme }) => theme.colors.borderColor};
  margin-left: 74px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 92px;
  }
`;
const ChildrenCommentContent = styled(Flex)<{ active: boolean }>`
  padding: 8px 8px 0 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 14px 18px 0 25px;
  }
  ${props =>
    props.active &&
    css`
      transition: all 0.3s;
      animation: fadeIt 4s ease;
      @keyframes fadeIt {
        0% {
          background-color: ${({ theme }) => theme.colors.backgroundCard};
        }
        100% {
          background-color: ${({ theme }) => theme.colors.backgroundCard};
        }
      }
    `}
  :hover {
    background-color: ${({ theme }) => theme.colors.backgroundCard};
    transition: all 0.3s;
  }
`;
const CommentMore = styled(Button)`
  padding-left: 25px;
  i {
    margin-left: 11px !important;
    transform: rotate(90deg);
  }
`;

export const CommentList: React.FC<Iprops> = (props: Iprops) => {
  const { t } = useTranslation();
  const { toastSuccess } = useToast();
  const { itemData, nonce, setNonce } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);
  // todo 1是降序从高到低 2是升序从低到高 fix:time 20220119
  const [sortTime, setSortTime] = useState(0);
  const [sortLike, setSortLike] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [flag, setFlag] = useState(true);
  const currentUid = useStore(p => p.loginReducer.userInfo);
  const popupRefs = React.useRef();
  const commentRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const parsedQs = useParsedQueryString();

  useEffect(() => {
    refresh && getList(1);
  }, [refresh]);

  const initList = () => {
    setListData([]);
    setPage(1);
    setTotalPage(2);
    setRefresh(!refresh);
    eventBus.dispatchEvent(new MessageEvent('updateDetails'));
  };

  const changeSortTime = () => {
    document.body.scrollIntoView({ block: 'start', inline: 'nearest' });
    setSortTime(sortTime === 1 ? 2 : 1);
    setSortLike(0);
    initList();
  };
  const changeSortLike = () => {
    document.body.scrollIntoView({ block: 'start', inline: 'nearest' });
    setSortLike(sortLike === 1 ? 2 : 1);
    setSortTime(0);
    initList();
  };

  const getList = (current?: number) => {
    if (!itemData.id) return;
    Api.CommentApi.getCommentList({
      pid: itemData.id,
      prepage: MAX_SPEND_TIME_PAGE_TATOL,
      page: current || page,
      sort_add_time: sortTime,
      sort_like: sortLike,
      comment_id: (current || page) === 1 ? parsedQs.comment_id : 0,
    }).then(res => {
      setLoading(false);
      if (Api.isSuccess(res)) {
        setPage((current || page) + 1);
        setListData([...listData, ...(res.data.list || [])]);
        setTotalPage(res.data.total_page);
        setRefresh(false);
      }
    });
  };

  // 获取二级评论
  const getSubCommentList = async (params: Api.Comment.queryList) => {
    try {
      const res = await Api.CommentApi.getSubCommentList(params);
      const subComment = listData.map(row => {
        if (params.first_comment_id === row.id) {
          // const subCommentList = concat(
          //   row?.comment_list_resp?.list,
          //   res.data?.list,
          // );
          // console.log(_.uniqWith(subCommentList, _.isEqual));
          let comment_list_resp = {
            ...row.comment_list_resp,
            page: params.page,
            total_num: res.data.total_num,
            list:
              params.page === 1
                ? res.data?.list
                : _.concat(row?.comment_list_resp?.list, res.data?.list),
          };
          return { ...row, comment_list_resp: comment_list_resp };
        }
        return row;
      });
      setListData(subComment);
    } catch (error) {
      console.log(error);
    }
  };

  // 二级评论删除
  const delSubComment = async data => {
    getSubCommentList({
      pid: itemData.id,
      first_comment_id: data.firstCommentId,
      prepage: 2,
      page: 1,
      sort_add_time: sortTime,
      sort_like: sortLike,
    });
    eventBus.dispatchEvent(new MessageEvent('updateDetails'));
  };

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum) => {
    const {
      FOLLOW,
      CANCEL_FOLLOW,
      SETTOP,
      CANCEL_SETTOP,
      COMMONT,
      EXPAND,
      SHIELD,
      DELPOST,
      BLOCKUSER,
    } = MoreOperatorEnum;
    const handleChangeList = type === SHIELD || type === DELPOST;
    let arr = [];

    if (
      type === FOLLOW ||
      type === CANCEL_FOLLOW ||
      type === SETTOP ||
      type === CANCEL_SETTOP ||
      type === COMMONT ||
      type === BLOCKUSER
    ) {
      initList();
      return;
    }

    listData.forEach((item: any) => {
      let obj = item;
      if (item.id === newItem.id) {
        obj = { ...newItem };
      }
      if (item.id === newItem.id && handleChangeList) {
        // 屏蔽、删除
      } else {
        arr.push(obj);
      }
    });
    setListData([...arr]);
  };

  React.useEffect(() => {
    if (listData.length > 0 && flag) {
      setFlag(false);
      commentRef?.current?.scrollIntoView();
    }
  }, [listData]);

  return (
    <CommentStyle>
      <Box>
        <CommentTitle justifyContent='space-between' alignItems='center'>
          <Text fontWeight='bold' fontSize='18px'>
            {t('newsCommentMenuTitle')}
          </Text>
          <Flex>
            <SortIcon
              text={t('detailHeat')}
              changeSort={changeSortLike}
              flag={sortLike}
            />
            <SortIcon
              text={t('detailTime')}
              changeSort={changeSortTime}
              flag={sortTime}
            />
          </Flex>
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
            <CommentItem key={`${item.id}_${index}`}>
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
              <CommentRows>
                <Box
                  as={Link}
                  to={`/me/profile/${item.user_id}`}
                  style={{ minWidth: '50px' }}
                >
                  <Avatar
                    uid={item.user_id}
                    src={item.user_avator_url}
                    scale='md'
                  />
                </Box>
                <Box ml='14px' width='100%'>
                  <Flex mb='12px' justifyContent='space-between'>
                    <Box>
                      <Text bold ellipsis>
                        {item.user_name}
                      </Text>
                      <Text color='textgrey'>
                        {dayjs(item.add_time).format('YYYY-MM-DD HH:mm')}
                      </Text>
                    </Box>
                    <Box>
                      <PopupWrap
                        ref={popupRefs}
                        trigger={
                          <PopupButton>
                            <Icon
                              name='icon-gengduo'
                              current={1}
                              color='#7E7E7E'
                            />
                          </PopupButton>
                        }
                        arrowStyle={{
                          color: theme.colors.tertiary,
                          stroke: theme.colors.tertiary,
                        }}
                      >
                        <CommentPop
                          postUserId={itemData.user_id}
                          data={item}
                          callback={initList}
                        />
                      </PopupWrap>
                    </Box>
                  </Flex>
                  <ContentParsing disableParseSquare content={item.comment} />
                  <MentionOperator
                    type='Comment'
                    callback={(data, type) => updateList(data, type)}
                    itemData={{
                      ...item,
                      comment: {
                        ...item,
                        content: item.comment,
                      },
                    }}
                    firstCommentId={item.id}
                    postId={item.pid}
                    commentId={item.id}
                    paddingLeft={0}
                  />
                </Box>
              </CommentRows>

              {/* 二级评论 */}
              {item?.comment_list_resp?.list?.length > 0 && (
                <ChildrenComment>
                  {(item?.comment_list_resp?.list ?? []).map(row => (
                    <React.Fragment key={row.id}>
                      {Number(parsedQs.comment_id) === row.id && (
                        <div ref={commentRef} key={row.id}></div>
                      )}
                      {
                        // 浏览自己的不扣费
                        currentUid?.uid !== row.user_id && (
                          <SpendTimeViewWithArticle
                            nonce={nonce}
                            setNonce={setNonce}
                            readType={ReadType.COMMENT}
                            articleId={row.id}
                          />
                        )
                      }
                      <ChildrenCommentContent
                        active={Number(parsedQs.comment_id) === row.id}
                      >
                        <Commnet
                          data={row}
                          key={row.id}
                          firstCommentId={item.id}
                          postUid={itemData.user_id}
                          delSubCommentCallback={data =>
                            delSubComment({
                              commentId: data.id,
                              firstCommentId: item.id,
                              firstComment: item,
                            })
                          }
                          callback={(data, type) => {
                            if (type === 'LIKE') {
                              const comment = listData.map(rows => {
                                if (item.id === rows.id) {
                                  const subCommentList =
                                    rows.comment_list_resp?.list?.map(it => {
                                      if (it.id === data.id) {
                                        return data;
                                      }
                                      return it;
                                    });
                                  return {
                                    ...rows,
                                    comment_list_resp: {
                                      ...rows.comment_list_resp,
                                      list: subCommentList,
                                    },
                                  };
                                }
                                return rows;
                              });
                              setListData(comment);
                            } else {
                              getSubCommentList({
                                pid: itemData.id,
                                first_comment_id: item.id,
                                prepage: 2,
                                page: 1,
                                sort_add_time: sortTime,
                                sort_like: sortLike,
                              });
                            }
                          }}
                        />
                      </ChildrenCommentContent>
                    </React.Fragment>
                  ))}
                  {item?.comment_list_resp?.total_num >
                    item?.comment_list_resp?.list?.length && (
                    <Box>
                      <CommentMore
                        variant='text'
                        onClick={() =>
                          getSubCommentList({
                            pid: itemData.id,
                            first_comment_id: item.id,
                            prepage: MAX_SPEND_TIME_PAGE_TATOL,
                            page: item?.comment_list_resp?.page
                              ? item?.comment_list_resp?.page + 1
                              : 2,
                            sort_add_time: sortTime,
                            sort_like: sortLike,
                          })
                        }
                      >
                        <Text color='textPrimary'>
                          {t('A total of 1 replies', {
                            value:
                              item?.comment_list_resp?.total_num -
                              item?.comment_list_resp?.list?.length,
                          })}
                        </Text>
                        <Icon
                          name='icon-shangjiantou'
                          color='textPrimary'
                          size={12}
                        />
                      </CommentMore>
                    </Box>
                  )}
                </ChildrenComment>
              )}
            </CommentItem>
          ))}
        </List>
      </Box>
    </CommentStyle>
  );
};
