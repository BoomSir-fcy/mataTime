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
import { Flex, Text, Box, Button, TranslateIcon } from 'uikit';
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
import checkTranslateIds from 'utils/checkTranslateIds';
import { addCommentTranslateIds } from 'store/mapModule/actions';
import { useDispatch } from 'react-redux';
import {
  useFetchAutoCommentTranslate,
  useMapModule,
} from 'store/mapModule/hooks';
import { changeCommentTranslateState } from 'store/mapModule/reducer';

type Iprops = {
  itemData: any;
  nonce: number;
  tribeId?: number;
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
    .icon-shield {
      opacity: 1;
    }
  }
  .icon-shield {
    transition: all 0.3s;
    opacity: 0;
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
  const { itemData, nonce, setNonce, tribeId } = props;
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

  const [commentIdsMap, setCommentIdsMap] = useState({});
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

  const dispatch = useDispatch();
  const { commentTranslateMap } = useMapModule();

  useFetchAutoCommentTranslate();
  /* 
    1. 评论翻译
    2. 翻译一级评论
        判断是否开启自动翻译 如果未开启 则 不操作
        所以 在获取列表的时候可以直接判断是否需要自动翻译
        然后再判断当前评论是否需要翻译
    3. 翻译二级评论
        翻译由一级评论控制
        所以当判断出二级评论也需要翻译时 需要在一级评论上显示翻译
        二级评论没有直接翻译的按钮
    4. 控制及显示 评论翻译
        当一级或者二级有一个的时候 都需要在一级右侧显示翻译按钮
        翻译按钮可以控制二级的翻译
        所以现在的按钮和帖子的逻辑不一样 区别就是需要把二级评论的翻译状态同时更改
    5. 
  */

  const userAutoTranslate = React.useMemo(() => {
    return currentUid.translation === 1;
  }, [currentUid.translation]);

  const getList = async (current?: number) => {
    if (!itemData.id) return;
    const fetchComment = () =>
      Api.CommentApi.getV2CommentList({
        pid: itemData.id,
        prepage: MAX_SPEND_TIME_PAGE_TATOL,
        page: current || page,
        sort_add_time: sortTime,
        sort_like: sortLike,
        comment_id: (current || page) === 1 ? parsedQs.comment_id : 0,
      });
    const fetchTribeComment = () =>
      Api.CommentApi.getTribeCommentList({
        pid: itemData.id,
        prepage: MAX_SPEND_TIME_PAGE_TATOL,
        page: current || page,
        sort_add_time: sortTime,
        sort_like: sortLike,
        comment_id: (current || page) === 1 ? parsedQs.comment_id : 0,
        tribeId,
      });
    const fetchFunc = tribeId ? fetchTribeComment : fetchComment;
    const res = await fetchFunc();
    setLoading(false);
    if (Api.isSuccess(res)) {
      setPage((current || page) + 1);
      setListData([...listData, ...(res.data.list || [])]);
      setTotalPage(res.data.total_page);
      setRefresh(false);
      // 需要自动翻译才判断评论是否需要翻译
      if (userAutoTranslate) {
        const { postIds } = checkTranslateIds(
          res.data?.list || [],
          'id',
          'comment',
        );
        dispatch(addCommentTranslateIds(postIds));
        // 二级评论的判断翻译内容
        (res.data?.list || []).map(item => {
          if (item.comment_list_resp.list) {
            const { postIds: subIds } = checkTranslateIds(
              item.comment_list_resp.list,
              'id',
              'comment',
            );
            dispatch(addCommentTranslateIds(subIds));
            // 更新二级评论需要翻译的id
            setCommentIdsMap(prep => {
              return {
                ...prep,
                [item.id]: prep[item.id]
                  ? [...prep[item.id], ...subIds]
                  : subIds,
              };
            });
          }
        });
      }
    }
    // Api.CommentApi.getTribeCommentList({
    //   pid: itemData.id,
    //   prepage: MAX_SPEND_TIME_PAGE_TATOL,
    //   page: current || page,
    //   sort_add_time: sortTime,
    //   sort_like: sortLike,
    //   comment_id: (current || page) === 1 ? parsedQs.comment_id : 0,
    //   tribeId,
    // }).then(res => {
    //   setLoading(false);
    //   if (Api.isSuccess(res)) {
    //     setPage((current || page) + 1);
    //     setListData([...listData, ...(res.data.list || [])]);
    //     setTotalPage(res.data.total_page);
    //     setRefresh(false);
    //     // 需要自动翻译才判断评论是否需要翻译
    //     if (userAutoTranslate) {
    //       const { postIds } = checkTranslateIds(
    //         res.data?.list || [],
    //         'id',
    //         'comment',
    //       );
    //       dispatch(addCommentTranslateIds(postIds));
    //       // 二级评论的判断翻译内容
    //       (res.data?.list || []).map(item => {
    //         if (item.comment_list_resp.list) {
    //           const { postIds: subIds } = checkTranslateIds(
    //             item.comment_list_resp.list,
    //             'id',
    //             'comment',
    //           );
    //           dispatch(addCommentTranslateIds(subIds));
    //           // 更新二级评论需要翻译的id
    //           setCommentIdsMap(prep => {
    //             return {
    //               ...prep,
    //               [item.id]: prep[item.id]
    //                 ? [...prep[item.id], ...subIds]
    //                 : subIds,
    //             };
    //           });
    //         }
    //       });
    //     }
    //   }
    // });
  };

  const handleChangeTranslate = id => {
    // 获取当前id一级评论翻译状态
    // 获取不到就选二级的状态
    // 然后取反
    const showTranslate = !(
      commentTranslateMap[id]?.showTranslate ??
      commentTranslateMap[commentIdsMap[id]?.[0]]?.showTranslate
    );
    // 一级评论更改状态
    dispatch(
      changeCommentTranslateState({
        id,
        showTranslate,
      }),
    );
    // 二级评论更改状态
    commentIdsMap[id]?.forEach(item => {
      dispatch(
        changeCommentTranslateState({
          id: item,
          showTranslate,
        }),
      );
    });
  };

  // 获取二级评论
  const getSubCommentList = async (params: Api.Comment.queryList) => {
    try {
      const fetchFunc = tribeId
        ? () => Api.CommentApi.getTribeSubCommentList(params)
        : () => Api.CommentApi.getSubCommentList(params);
      const res = await fetchFunc();
      const subComment = listData.map(row => {
        if (params.first_comment_id === row.id) {
          // const subCommentList = concat(
          //   row?.comment_list_resp?.list,
          //   res.data?.list,
          // );
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
      setNonce(prep => prep + 1);
      // 需要自动翻译才判断评论是否需要翻译
      if (userAutoTranslate) {
        const { postIds } = checkTranslateIds(
          res.data?.list || [],
          'id',
          'comment',
        );
        dispatch(addCommentTranslateIds(postIds));
        // 更新二级评论需要翻译的id
        setCommentIdsMap(prep => {
          return {
            ...prep,
            [params.first_comment_id]: prep[params.first_comment_id]
              ? [...prep[params.first_comment_id], ...postIds]
              : postIds,
          };
        });
      }
    } catch (error) {
      console.error(error);
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
      tribeId,
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
      FORWARD,
    } = MoreOperatorEnum;
    const handleChangeList = type === SHIELD || type === DELPOST;
    let arr = [];

    if (
      type === FOLLOW ||
      type === CANCEL_FOLLOW ||
      type === SETTOP ||
      type === CANCEL_SETTOP ||
      type === COMMONT ||
      type === BLOCKUSER ||
      type === FORWARD
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
  }, [listData, flag]);

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
                    readType={ReadType.TRIBE_COMMENT}
                    articleId={item.id}
                    tribeId={tribeId}
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
                    <Flex alignItems='center'>
                      {userAutoTranslate &&
                        (commentTranslateMap[item.id] ||
                          commentIdsMap[item.id]) && (
                          <Box
                            className={
                              commentTranslateMap[item.id]?.showTranslate ??
                              commentTranslateMap[commentIdsMap[item.id]?.[0]]
                                ?.showTranslate
                                ? ''
                                : 'icon-shield'
                            }
                          >
                            <Button
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleChangeTranslate(item.id);
                                // callback(
                                //   {
                                //     ...itemData,
                                //   },
                                //   MoreOperatorEnum.TRANSLATE,
                                // );
                                // dispatch(
                                //   changePostTranslateState({
                                //     id: itemData.id,
                                //     showTranslate: !showTranslate,
                                //   }),
                                // );
                              }}
                              variant='text'
                              mr='18px'
                              padding='0'
                              title={t('Translate')}
                            >
                              <TranslateIcon />
                            </Button>
                          </Box>
                        )}
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
                    </Flex>
                  </Flex>
                  <ContentParsing
                    disableParseSquare
                    content={
                      userAutoTranslate &&
                      commentTranslateMap[item.id] &&
                      commentTranslateMap[item.id].content &&
                      commentTranslateMap[item.id].showTranslate
                        ? commentTranslateMap[item.id].content
                        : item.comment
                    }
                  />
                  <MentionOperator
                    type='Comment'
                    callback={(data, type) => updateList(data, type)}
                    hasForward={!tribeId}
                    itemData={{
                      ...item,
                      comment: {
                        ...item,
                        content:
                          userAutoTranslate &&
                          commentTranslateMap[item.id] &&
                          commentTranslateMap[item.id].content &&
                          commentTranslateMap[item.id].showTranslate
                            ? commentTranslateMap[item.id].content
                            : item.comment,
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
                    <div key={row.id}>
                      {Number(parsedQs.comment_id) === row.id && (
                        <div ref={commentRef}></div>
                      )}
                      {
                        // 浏览自己的不扣费
                        currentUid?.uid !== row.user_id && (
                          <SpendTimeViewWithArticle
                            nonce={nonce}
                            setNonce={setNonce}
                            readType={ReadType.TRIBE_COMMENT}
                            articleId={row.id}
                            tribeId={tribeId}
                          />
                        )
                      }
                      <ChildrenCommentContent
                        active={Number(parsedQs.comment_id) === row.id}
                      >
                        <Commnet
                          data={{
                            ...row,
                            comment:
                              userAutoTranslate &&
                              commentTranslateMap[row.id] &&
                              commentTranslateMap[row.id].content &&
                              commentTranslateMap[row.id].showTranslate
                                ? commentTranslateMap[row.id].content
                                : row.comment,
                          }}
                          tribeId={tribeId}
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
                    </div>
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
                            value: item?.comment_list_resp?.total_num,
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
