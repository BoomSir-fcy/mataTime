import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { HoverLink, List, MoreOperatorEnum, ShiledUserModal } from 'components';
import { ReadType } from 'hooks/imHooks/types';
import { useStore } from 'store';

import useReadArticle from 'hooks/imHooks/useReadArticle';
import {
  fetchPostDetailAsync,
  fetchPostTranslateAsync,
  fetchUserInfoAsync,
} from 'store/mapModule/reducer';
import {
  addDeletePostId,
  addUnFollowUserId,
  removeBlockUserId,
  removeUnFollowUserId,
} from 'store/mapModule/actions';
import { useFetchAutoPostTranslate, useMapModule } from 'store/mapModule/hooks';

import { MeItemWrapper } from './styled';
import MentionItem from './MentionItem';
import MentionOperator from './MentionOperator';
import ForwardContent from './ForwardContent';
import ForwardHead from './ForwardHead';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';

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
  postIdKey?: string;
}

const PostList: React.FC<PostListPorps> = ({
  list,
  map,
  loading,
  isEnd,
  getList,
  updateList,
  postIdKey = 'id',
}) => {
  const [PostItemData, setPostItemData] = useState();
  const [isShileUser, setIsShileUser] = React.useState(false);
  const dispatch = useDispatch();

  const { userMap } = useMapModule();

  const currentUid = useStore(p => p.loginReducer.userInfo);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);
  useFetchAutoPostTranslate();

  // 更新列表
  const handleUpdateList = useCallback(
    (newItem: any, type: MoreOperatorEnum = null) => {
      // 折叠和翻译
      if (
        type === MoreOperatorEnum.EXPAND ||
        type === MoreOperatorEnum.TRANSLATE
      ) {
        setNonce(prep => prep + 1);
        return;
      }
      if (type === MoreOperatorEnum.BLOCKUSER) {
        setNonce(prep => prep + 1);
      }
      if (type === MoreOperatorEnum.DELPOST) {
        setNonce(prep => prep + 1);
        dispatch(addDeletePostId(newItem.id)); // FIXME: 有的时候可能用的不是id
        return;
      }
      if (type === MoreOperatorEnum.CANCEL_FOLLOW) {
        setNonce(prep => prep + 1);
        dispatch(addUnFollowUserId(newItem.user_id)); // FIXME: 有的时候可能用的不是user_id
        dispatch(fetchUserInfoAsync(newItem.user_id));
      }
      if (type === MoreOperatorEnum.FOLLOW) {
        setNonce(prep => prep + 1);
        dispatch(removeUnFollowUserId(newItem.user_id)); // FIXME: 有的时候可能用的不是user_id
        dispatch(fetchUserInfoAsync(newItem.user_id));
      }
      if (
        type === MoreOperatorEnum.FORWARD ||
        type === MoreOperatorEnum.UNFORWARD
      ) {
        getList(1);
        return;
      }
      dispatch(fetchPostDetailAsync(newItem.id)); // FIXME: 有的时候可能用的不是id

      updateList(newItem.id, type);
      return;
    },
    [dispatch, setNonce, updateList],
  );

  const handleTranslate = useCallback(
    id => {
      dispatch(fetchPostTranslateAsync([id]));
    },
    [dispatch],
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
        {(list ?? []).map(rows => {
          let item =
            rows.forward_type === 2
              ? {
                  ...rows,
                  forwardUser: rows.user_name,
                  forwardUid: rows.user_id,
                  ...rows.forward,
                }
              : rows;
          return (
            <HoverLink
              key={item[postIdKey]}
              to={`/articledetils/${
                item.forward_type === 2 ? item.post_id : item[postIdKey]
              }`}
            >
              <MeItemWrapper key={`${item[postIdKey]}`}>
                {
                  // 浏览自己的不扣费
                  currentUid?.uid !== item.user_id && (
                    <SpendTimeViewWithArticle
                      nonce={nonce}
                      setNonce={setNonce}
                      readType={ReadType.ARTICLE}
                      articleId={item[postIdKey]}
                    />
                  )
                }
                {item.forward_type === 2 && <ForwardHead data={item} />}
                <MentionItem
                  isShileUser={isShileUser}
                  setIsShileUser={(type, data) => {
                    setPostItemData(data);
                    setIsShileUser(type);
                  }}
                  itemData={{
                    ...item,
                    post: {
                      ...item,
                      ...map[item[postIdKey]],
                      post_id: item[postIdKey],
                      id: item[postIdKey],
                      postId: item[postIdKey],
                      is_like:
                        map[item[postIdKey]]?.is_like ??
                        item.is_like ??
                        (item as any).like_status,
                      user_id:
                        map[item[postIdKey]]?.user_id ??
                        item.user_id ??
                        (item as any).uid,
                      user_avator_url:
                        map[item[postIdKey]]?.user_avator_url ??
                        item.user_avator_url ??
                        (item as any).nft_image,
                      is_attention:
                        userMap?.[item.user_id]?.is_attention ??
                        map?.[item[postIdKey]]?.is_attention ??
                        item.is_attention,
                    },
                    ...map[item[postIdKey]],
                    post_id: item[postIdKey],
                    postId: item[postIdKey],
                    id: item[postIdKey],
                    is_attention:
                      userMap?.[item.user_id]?.is_attention ??
                      map?.[item[postIdKey]]?.is_attention ??
                      item.is_attention,
                    is_like:
                      map[item[postIdKey]]?.is_like ??
                      item.is_like ??
                      (item as any).like_status,
                    user_id:
                      map[item[postIdKey]]?.user_id ??
                      item.user_id ??
                      (item as any).uid,
                    user_avator_url:
                      map[item[postIdKey]]?.user_avator_url ??
                      item.user_avator_url ??
                      (item as any).nft_image,
                    add_time:
                      map[item[postIdKey]]?.add_time ??
                      item.add_time ??
                      (item as any).add_time_desc,
                  }}
                  callback={(item: any, type: MoreOperatorEnum) => {
                    handleUpdateList(item, type);
                  }}
                />
                {/* 转发内容 */}
                {item.forward_type === 1 && <ForwardContent data={item} />}
                <MentionOperator
                  replyType='twitter'
                  postId={item[postIdKey]}
                  itemData={{
                    ...item,
                    post: {
                      ...item,
                      ...map[item[postIdKey]],
                      post_id: item[postIdKey],
                      postId: item[postIdKey],
                      id: item[postIdKey],
                      is_like:
                        map[item[postIdKey]]?.is_like ??
                        item.is_like ??
                        (item as any).like_status,
                      user_id:
                        map[item[postIdKey]]?.user_id ??
                        item.user_id ??
                        (item as any).uid,
                      user_avator_url:
                        map[item[postIdKey]]?.user_avator_url ??
                        item.user_avator_url ??
                        (item as any).nft_image,
                      add_time:
                        map[item[postIdKey]]?.add_time ??
                        item.add_time ??
                        (item as any).add_time_desc,
                    },
                    ...map[item[postIdKey]],
                    post_id: item[postIdKey],
                    postId: item[postIdKey],
                    id: item[postIdKey],
                    is_like:
                      map[item[postIdKey]]?.is_like ??
                      item.is_like ??
                      (item as any).like_status,
                    user_id:
                      map[item[postIdKey]]?.user_id ??
                      item.user_id ??
                      (item as any).uid,
                    user_avator_url:
                      map[item[postIdKey]]?.user_avator_url ??
                      item.user_avator_url ??
                      (item as any).nft_image,
                    add_time:
                      map[item[postIdKey]]?.add_time ??
                      item.add_time ??
                      (item as any).add_time_desc,
                  }}
                  callback={(item: any, type?: MoreOperatorEnum) => {
                    // handleTranslate(item.id);
                    handleUpdateList(item, type);
                  }}
                />
              </MeItemWrapper>
            </HoverLink>
          );
        })}
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
