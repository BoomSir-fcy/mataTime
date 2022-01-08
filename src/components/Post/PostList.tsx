import React, { useEffect, useState } from 'react';
import { List, MoreOperatorEnum } from 'components';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import { fetchThunk, storeAction, useStore } from 'store';
import { MeItemWrapper, NewsMeWrapper } from 'view/News/Me/style';
import MentionItem from './MentionItem';
import MentionOperator from 'view/News/components/MentionOperator';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useReadArticle from 'hooks/imHooks/useReadArticle';

const ArticleListBox = styled.div`
  color: #fff;
`;

interface PostListPorps {
  list: Api.Home.post[];
  loading: boolean;
  isEnd: boolean;
  getList: (type?: number) => void;
  updateList: (id: number, type: MoreOperatorEnum) => void;
}

const PostList = ({ list, loading, isEnd, getList }) => {
  // const [size, setSize] = useState(20)
  const currentUid = useStore(p => p.loginReducer.userInfo);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);

  // 更新列表
  const handleUpdateList = (newItem: any, type: MoreOperatorEnum = null) => {
    if (
      type === MoreOperatorEnum.FOLLOW ||
      type === MoreOperatorEnum.CANCEL_FOLLOW ||
      type === MoreOperatorEnum.SETTOP ||
      type === MoreOperatorEnum.CANCEL_SETTOP ||
      type === MoreOperatorEnum.COMMONT
    ) {
      // setIsEnd(false);
      // Getlist(1);
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
    // dispatch(storeAction.postUpdateArticle([...arr]));
    // if (handleChangeList) {
    //   setNonce(prep => prep + 1);
    // }
  };

  return (
    <ArticleListBox>
      <List
        loading={loading}
        renderList={type => {
          if (type === 1 && list?.length !== 0) {
            return;
          }
          getList(type);
        }}
      >
        {(list ?? []).map(item => (
          <MeItemWrapper key={`${item.id}`}>
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
              itemData={{
                ...item,
                post_id: item.id,
                post: {
                  ...item,
                  post_id: item.id,
                },
              }}
              callback={(item: any, type: MoreOperatorEnum) => {
                handleUpdateList(item, type);
              }}
            />
            <MentionOperator
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
                handleUpdateList(item, type);
              }}
            />
          </MeItemWrapper>
        ))}
      </List>
    </ArticleListBox>
  );
};

export const ArticleList = React.forwardRef(PostList);
