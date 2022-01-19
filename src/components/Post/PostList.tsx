import React, { useCallback, useState } from 'react';
import { HoverLink, List, MoreOperatorEnum, ShiledUserModal } from 'components';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import { useStore } from 'store';

import styled from 'styled-components';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import { useDispatch } from 'react-redux';
import {
  fetchPostDetailAsync,
  fetchUserInfoAsync,
} from 'store/mapModule/reducer';
import {
  addDeletePostId,
  addUnFollowUserId,
  removeBlockUserId,
  removeUnFollowUserId,
} from 'store/mapModule/actions';

import { MeItemWrapper } from './styled';
import MentionItem from './MentionItem';
import MentionOperator from './MentionOperator';
import { useMapModule } from 'store/mapModule/hooks';

const ArticleListBox = styled.div`
  color: #fff;
`;

interface PostListPorps {
  list: Api.Home.post[];
  map: {
    [id: string]: Api.Home.post;
  };
  loading: boolean;
  isEnd: boolean;
  getList: (type?: number) => void;
  updateList: (id: number, type: MoreOperatorEnum) => void;
}

const PostList: React.FC<PostListPorps> = ({
  list,
  map,
  loading,
  isEnd,
  getList,
  updateList,
}) => {
  const [PostItemData, setPostItemData] = useState();
  const [isShileUser, setIsShileUser] = React.useState(false);
  const dispatch = useDispatch();

  const { userMap } = useMapModule();

  const currentUid = useStore(p => p.loginReducer.userInfo);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);

  // 更新列表
  const handleUpdateList = useCallback(
    (newItem: any, type: MoreOperatorEnum = null) => {
      // 折叠
      if (type === MoreOperatorEnum.EXPAND) {
        setNonce(prep => prep + 1);
        return;
      }
      if (type === MoreOperatorEnum.DELPOST) {
        dispatch(addDeletePostId(newItem.id)); // FIXME: 有的时候可能用的不是id
        return;
      }
      if (type === MoreOperatorEnum.CANCEL_FOLLOW) {
        dispatch(addUnFollowUserId(newItem.user_id)); // FIXME: 有的时候可能用的不是user_id
        dispatch(fetchUserInfoAsync(newItem.user_id));
      }
      if (type === MoreOperatorEnum.FOLLOW) {
        dispatch(removeUnFollowUserId(newItem.user_id)); // FIXME: 有的时候可能用的不是user_id
        dispatch(fetchUserInfoAsync(newItem.user_id));
      }
      dispatch(fetchPostDetailAsync(newItem.id)); // FIXME: 有的时候可能用的不是id

      updateList(newItem.id, type);
      return;
    },
    [dispatch, setNonce, updateList],
  );

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
                isShileUser={isShileUser}
                setIsShileUser={(type, data) => {
                  setPostItemData(data);
                  setIsShileUser(type);
                }}
                itemData={{
                  ...item,
                  post_id: item.id,
                  post: {
                    ...item,
                    post_id: item.id,
                    ...map[item.id],
                    is_attention:
                      userMap?.[item.user_id]?.is_attention ??
                      map?.[item.id]?.is_attention ??
                      item.is_attention,
                  },
                  ...map[item.id],
                  is_attention:
                    userMap?.[item.user_id]?.is_attention ??
                    map?.[item.id]?.is_attention ??
                    item.is_attention,
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
                    ...map[item.id],
                  },
                  ...map[item.id],
                }}
                callback={(item: any, type?: MoreOperatorEnum) => {
                  handleUpdateList(item, type);
                }}
              />
            </MeItemWrapper>
          </HoverLink>
        ))}
      </List>
      <ShiledUserModal
        userinfo={PostItemData}
        visible={isShileUser}
        callback={(data, type?: MoreOperatorEnum) =>
          handleUpdateList(data, type)
        }
        onClose={() => {
          setIsShileUser(!isShileUser);
        }}
      />
    </ArticleListBox>
  );
};

export default PostList;
