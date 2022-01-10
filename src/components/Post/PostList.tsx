import React, { useState } from 'react';
import { HoverLink, List, MoreOperatorEnum } from 'components';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import { useStore } from 'store';
import { MeItemWrapper } from './styled';
import MentionItem from './MentionItem';
import MentionOperator from './MentionOperator';
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

const PostList: React.FC<PostListPorps> = ({
  list,
  loading,
  isEnd,
  getList,
  updateList,
}) => {
  // const [size, setSize] = useState(20)
  const currentUid = useStore(p => p.loginReducer.userInfo);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);

  // 更新列表
  const handleUpdateList = (newItem: any, type: MoreOperatorEnum = null) => {
    // 折叠
    if (type === MoreOperatorEnum.EXPAND) {
      setNonce(prep => prep + 1);
      return;
    }
    updateList(newItem.id, type);
    return;
  };

  return (
    <ArticleListBox>
      <List
        loading={loading}
        renderList={type => {
          if ((type === 1 && list?.length !== 0) || loading || isEnd) {
            return;
          }
          getList(type);
        }}
      >
        {(list ?? []).map(item => (
          <HoverLink to={`/articleDetils/${item.post_id || item.id}`}>
            <MeItemWrapper key={`${item.id || item.post_id}`}>
              {
                // 浏览自己的不扣费
                currentUid?.uid !== item.user_id && (
                  <SpendTimeViewWithArticle
                    nonce={nonce}
                    setNonce={setNonce}
                    readType={ReadType.ARTICLE}
                    articleId={item.id || item.post_id}
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
                postId={`${item.id}`}
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
          </HoverLink>
        ))}
      </List>
    </ArticleListBox>
  );
};

export default PostList;
