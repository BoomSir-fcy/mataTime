import React, { useState } from 'react';
import { List, MoreOperatorEnum } from 'components';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import { fetchThunk, storeAction, useStore } from 'store';
import { MeItemWrapper, NewsMeWrapper } from 'view/News/Me/style';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const ArticleListBox = styled.div`
  color: #fff;
`;

/**
 *
 * @review
 * props 未声明类型
 */
export const ArticleList = props => {
  // const [size, setSize] = useState(20)
  const currentUid = useStore(p => p.loginReducer.userInfo);
  const article = useStore(p => p.post);
  const dispatch = useDispatch();
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [listData, setListData] = useState([]);
  // const [totalPage, setTotalPage] = useState(2);
  const [isEnd, setIsEnd] = useState(false);
  const { list, lastList, page } = article;
  const pageSize = MAX_SPEND_TIME_PAGE_TATOL;

  const {
    nonce,
    setNonce = () => {
      console.error('setNonce is null or undefined, and not refresh ');
    },
  } = props || {};

  const Getlist = React.useCallback(
    (current = 0) => {
      if ((loading || isEnd) && !current) return false;
      setLoading(true);
      dispatch(
        fetchThunk.fetchPostAsync({
          attention: 1,
          page: current || page,
          per_page: pageSize,
          ...props.filterValObj,
        }),
      );
      setIsEnd(true);
      setLoading(false);
      setNonce(prep => prep + 1);
    },
    [article, isEnd],
  );

  React.useEffect(() => {
    if (page > 1) {
      if (lastList.length < pageSize) {
        setIsEnd(true);
      } else if (lastList.length >= pageSize) {
        setIsEnd(false);
      }
    }
  }, [loading, list]);

  // 获取列表
  // const getList = (current = 0) => {
  //   if ((loading || isEnd) && !current) return false;
  //   setLoading(true);
  //   Api.HomeApi.getArticleList({
  //     attention: 1,
  //     page: current || page,
  //     per_page: pageSize,
  //     ...props.filterValObj
  //   }).then(res => {
  //     setLoading(false);
  //     if (Api.isSuccess(res)) {
  //       setLoading(false);
  //       setTotalPage(res.data.total_page);
  //       if (res.data.List.length < pageSize) {
  //         setIsEnd(true);
  //       } else {
  //         setIsEnd(false);
  //       }
  //       if (current === 1 || page === 1) {
  //         setListData([...res.data.List]);
  //         setPage(2);
  //       } else {
  //         setListData([...listData, ...res.data.List]);
  //         setPage(page + 1);
  //       }
  //     }
  //     // setNonce(prep => prep + 1);
  //   });
  // };

  // 更新列表

  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    if (
      type === MoreOperatorEnum.FOLLOW ||
      type === MoreOperatorEnum.CANCEL_FOLLOW ||
      type === MoreOperatorEnum.SETTOP ||
      type === MoreOperatorEnum.CANCEL_SETTOP ||
      type === MoreOperatorEnum.COMMONT
    ) {
      setIsEnd(false);
      Getlist(1);
      return;
    }
    // 折叠
    if (type === MoreOperatorEnum.EXPAND) {
      setNonce(prep => prep + 1);
      return;
    }

    const handleChangeList =
      type === MoreOperatorEnum.SHIELD || type === MoreOperatorEnum.DELPOST;
    let arr = [];
    list.forEach((item: any) => {
      let obj = item;
      if (item.id === newItem.id) {
        obj = { ...newItem.post };
      }
      if (item.id === newItem.id && handleChangeList) {
        // 屏蔽、删除
      } else {
        arr.push(obj);
      }
    });
    dispatch(storeAction.postUpdateArticle([...arr]));
    if (handleChangeList) {
      setNonce(prep => prep + 1);
    }
  };

  return (
    <ArticleListBox>
      <List loading={!isEnd} renderList={Getlist}>
        {(list ?? []).map((item, index) => (
          <MeItemWrapper key={`${item.id}_${index}`}>
            {
              // 浏览自己的不扣费
              currentUid?.uid !== item.user_id && (
                <SpendTimeViewWithArticle
                  nonce={nonce}
                  setNonce={setNonce}
                  readType={ReadType.ARTICLE}
                  articleId={item.id}
                />
              )
            }
            <MentionItem
              {...props}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id,
                },
              }}
              callback={(item: any, type: MoreOperatorEnum) => {
                updateList(item, type);
              }}
            />
            <MentionOperator
              {...props}
              replyType='twitter'
              postId={item.id}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id,
                },
              }}
              callback={(item: any, type?: MoreOperatorEnum) => {
                updateList(item, type);
              }}
            />
          </MeItemWrapper>
        ))}
      </List>
    </ArticleListBox>
  );
};
