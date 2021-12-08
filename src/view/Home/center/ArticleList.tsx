import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Flex, Button, Box } from 'uikit';
import { Avatar, Icon, List, MoreOperatorEnum } from 'components';
// import MentionItem from 'view/News/components/MentionItem';
import { Link } from 'react-router-dom';
import { useStore } from 'store';
import { relativeTime } from 'utils';
import MentionItem from 'view/News/components/MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import { ReadType } from 'contexts/ImContext/types';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';

import { NewsMeWrapper, MeItemWrapper } from 'view/News/Me/style';
import { Api } from 'apis';

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
  const listRef: any = useRef();
  const currentUid = useStore(p => p.loginReducer.userInfo);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalPage, setTotalPage] = useState(2);

  const [isEnd, setIsEnd] = useState(false)
  const pageSize = 5

  const {
    nonce,
    setNonce = () => { console.error('setNonce is null or undefined, and not refresh ') }
  } = props || {}

  // 获取列表
  const getList = (current = 0) => {
    if ((loading || isEnd) && !current) return false;
    setLoading(true);
    Api.HomeApi.getArticleList({
      attention: 1,
      page: current || page,
      per_page: pageSize,
      ...props.filterValObj
    }).then(res => {
      setLoading(false);
      if (Api.isSuccess(res)) {
        setLoading(false);
        setTotalPage(res.data.total_page);
        if (res.data.List.length < pageSize) {
          setIsEnd(true)
        } else {
          setIsEnd(false)
        }
        if (current === 1 || page === 1) {
          setListData([...res.data.List]);
          setPage(2);
        } else {
          setListData([...listData, ...res.data.List]);
          setPage(page + 1);
        }
      }
    });
  };

  // 更新列表
  const updateList = (newItem: any, type: MoreOperatorEnum = null) => {
    if (
      type === MoreOperatorEnum.FOLLOW ||
      type === MoreOperatorEnum.CANCEL_FOLLOW ||
      type === MoreOperatorEnum.SETTOP ||
      type === MoreOperatorEnum.CANCEL_SETTOP ||
      type === MoreOperatorEnum.COMMONT
    ) {
      setPage(1);
      setIsEnd(false)
      getList(1);
      return;
    }

    const handleChangeList = (type === MoreOperatorEnum.SHIELD || type === MoreOperatorEnum.DELPOST)
    let arr = [];
    listData.forEach((item: any) => {
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
    setListData([...arr]);
    if (handleChangeList) {
      setNonce(prep => prep + 1)
    }
  };

  return (
    <ArticleListBox>
      <List
        ref={listRef}
        marginTop={320}
        loading={!isEnd}
        renderList={getList}
      >
        {listData.map((item, index) => (
          <MeItemWrapper key={item.id}>
            {
              // 浏览自己的不扣费
              currentUid?.uid !== item.user_id && (
                <SpendTimeViewWithArticle nonce={nonce} readType={ReadType.ARTICLE} articleId={item.id} />
              )
            }
            <MentionItem
              {...props}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id
                }
              }}
              callback={(item: any, type: MoreOperatorEnum) => {
                updateList(item, type);
              }}
            />
            <MentionOperator
              {...props}
              replyType="twitter"
              postId={item.id}
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id
                }
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
ArticleList.defaultProps = {
  filterValObj: {}
};
