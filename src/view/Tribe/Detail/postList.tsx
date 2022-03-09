import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  HoverLink,
  List,
  LoadType,
  MoreOperatorEnum,
  ShiledUserModal,
} from 'components';
import { ReadType } from 'hooks/imHooks/types';
import { useStore } from 'store';

import useReadArticle from 'hooks/imHooks/useReadArticle';
import {
  fetchPostTranslateAsync,
  fetchTribePostDetailAsync,
  fetchUserInfoAsync,
} from 'store/mapModule/reducer';
import {
  addDeletePostId,
  addUnFollowUserId,
  removeUnFollowUserId,
} from 'store/mapModule/actions';
import {
  useFetchAutoPostTranslate,
  useFetchAutoCommentTranslate,
  useMapModule,
} from 'store/mapModule/hooks';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { Card, Box, Flex } from 'uikit';
import PostItem from './postItem';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import MentionOperator from '../components/MentionOperator';
import HotBtn from '../components/post/HotBtn';
import SendUser from '../components/post/sendUser';

const ArticleListBox = styled(Box)``;

export const MeItemWrapper = styled(Card)`
  width: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: visible;
  box-shadow: none;
  background-color: transparent;
  ${({ theme }) => theme.mediaQueriesSize.padding}
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

interface PostListPorps {
  list: Api.Tribe.PostDataInfo[];
  map: {
    [id: string]: Api.Tribe.PostDataInfo;
  };
  loading: boolean;
  isEnd: boolean;
  getList: (LoadType?: number) => void;
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
  const { account } = useActiveWeb3React();

  const { userMap } = useMapModule();

  const TribeInfo = useStore(p => p.tribe.tribeInfo);
  const currentUid = useStore(p => p.loginReducer.userInfo);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);
  useFetchAutoPostTranslate();
  useFetchAutoCommentTranslate();

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
        getList(LoadType.REFRESH);
        return;
      }
      dispatch(fetchTribePostDetailAsync(newItem.id)); // FIXME: 有的时候可能用的不是id

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
          if (
            (type === LoadType.INIT && list?.length !== 0) ||
            loading ||
            isEnd
          ) {
            return;
          }
          getList(type);
        }}
      >
        {(list ?? []).map(item => {
          return (
            <HoverLink key={item.id} to={`/tribe/postdetail?i=${item.id}`}>
              <MeItemWrapper key={`${item[postIdKey]}`}>
                {
                  // 普通帖子浏览自己的不扣费
                  !(currentUid?.uid === item.user_id && !item.forward_type) && (
                    <SpendTimeViewWithArticle
                      nonce={nonce}
                      setNonce={setNonce}
                      readType={ReadType.TRIBE_ARTICLE}
                      articleId={item[postIdKey]}
                      forwardType={item.forward?.forward_type}
                      forward={item.forward}
                      tribeId={item.tribe_id}
                    />
                  )
                }
                <PostItem
                  isTribeOnwer={
                    TribeInfo?.tribe?.owner_address?.toLocaleLowerCase() ===
                    account?.toLocaleLowerCase()
                  }
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
                <Flex justifyContent='space-between' alignItems='center'>
                  <SendUser
                    time={new Date(item.add_time || item.post_time).getTime()}
                    name={item.user_name}
                    Avatar={item.user_avator_url || item.nft_image}
                  />
                  <Box width='50%'>
                    <MentionOperator
                      joined={TribeInfo.status === 4}
                      replyType='twitter'
                      postId={item[postIdKey]}
                      hasReward={false}
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
                        handleUpdateList(item, type);
                      }}
                    />
                  </Box>
                </Flex>
                <HotBtn list={item.topics} />
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
