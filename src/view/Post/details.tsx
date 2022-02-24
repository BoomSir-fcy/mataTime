import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Editor,
  Crumbs,
  MoreOperatorEnum,
  ForwardFastModal,
  Loading,
} from 'components';
import { useToast } from 'hooks';
import { Spinner, Empty, Text } from 'uikit';
import { useStore } from 'store';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';
import { ReadType } from 'hooks/imHooks/types';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import eventBus from 'utils/eventBus';

import { PageStyle, PostCount, PostCountButton } from './style';

import { CommentList } from './CommentList';
import { MeItemWrapper } from 'view/News/Me/style';
import MentionItem from 'components/Post/MentionItem';
import MentionOperator from 'components/Post/MentionOperator';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import ForwardContent from 'components/Post/ForwardContent';

import {
  useFetchAutoPostTranslate,
  usePostDetailById,
} from 'store/mapModule/hooks';
import {
  fetchPostDetailAsync,
  fetchUserInfoAsync,
} from 'store/mapModule/reducer';
import {
  addDeletePostId,
  addUnFollowUserId,
  removeUnFollowUserId,
} from 'store/mapModule/actions';

type Iprops = {
  [name: string]: any;
};
export const PostDetails: React.FC<Iprops> = (props: Iprops) => {
  const { t } = useTranslation();
  const { toastSuccess } = useToast();
  useFetchAutoPostTranslate();

  // const [itemData, setItemData] = useState<any>({
  //   id: 0,
  // });
  const [refresh, setRefresh] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const currentUid = useStore(p => p.loginReducer.userInfo);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);

  const { params } = useRouteMatch() as { params: { id: string } };
  useReadArticle(nonce);
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;

  const updateDetails = React.useCallback(() => {
    dispatch(fetchPostDetailAsync(params.id));
    setRefresh(refresh === 1 ? 2 : 1);
  }, [dispatch, params.id]);

  useEffect(() => {
    updateDetails();
  }, [updateDetails]);

  const itemData = usePostDetailById(params.id) || ({} as any);

  useEffect(() => {
    if (itemData.id) {
      setLoaded(true);
    }
  }, [itemData.id]);

  const sendArticle = (
    res,
    image_urls,
    remind_user,
    reset,
    first_comment_id,
  ) => {
    if (!res) return;
    Api.CommentApi.createComment({
      pid: itemData.id,
      comment: res,
      remind_user,
      first_comment_id: 0,
    }).then(res => {
      if (Api.isSuccess(res)) {
        reset && reset();
        // setItemData({
        //   ...itemData,
        //   comment_num: itemData.comment_num + 1,
        // });
        dispatch(fetchPostDetailAsync(params.id));
        toastSuccess(t('comment success'));
        setRefresh(refresh === 1 ? 2 : 1);
      }
    });
  };

  useEffect(() => {
    eventBus.addEventListener('updateDetails', updateDetails);
    return () => {
      eventBus.removeEventListener('updateDetails', updateDetails);
    };
  }, [updateDetails]);

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
      dispatch(fetchPostDetailAsync(newItem.id)); // FIXME: 有的时候可能用的不是id
    },
    [dispatch, setNonce],
  );

  return (
    <PageStyle>
      <Crumbs back title={t('newsBack')} />
      {Boolean(itemData.id) ? (
        <>
          {
            // 浏览自己的不扣费
            !(
              currentUid?.uid === itemData.user_id &&
              itemData.forward_type === 0
            ) &&
            itemData?.id && (
              <SpendTimeViewWithArticle
                readType={ReadType.ARTICLE}
                articleId={itemData?.id}
                setNonce={setNonce}
                nonce={nonce}
                forwardType={itemData.forward?.forward_type}
                forward={itemData?.forward}
              />
            )
          }
          <MeItemWrapper>
            <MentionItem
              {...props}
              itemData={{
                ...itemData,
                post_id: itemData.id,
                post: {
                  ...itemData,
                  post_id: itemData.id,
                },
              }}
              callback={handleUpdateList}
              more={true}
              showTranslate
            />
            {(Boolean(itemData?.forward?.post_id) ||
              itemData?.forward?.is_forward_del === 1) && (
                <Link
                  to={
                    itemData?.forward?.is_forward_del === 1
                      ? {}
                      : itemData?.forward?.forward_type === 2
                        ? `/articledetils/${itemData?.forward?.forward_parent_id}?comment_id=${itemData?.forward?.forward_comment_id}`
                        : `/articledetils/${itemData?.forward?.post_id}`
                  }
                >
                  <ForwardContent currentUid={currentUid?.uid} data={itemData} />
                </Link>
              )}
            <PostCount>
              <PostCountButton
                as={Link}
                to={`/forward/${itemData.id}`}
                mr='15px'
              >
                {t('number Reposts', { value: itemData.forward_num || 0 })}
              </PostCountButton>
              {/* <PostCountButton onClick={() => setVisible(true)}>
                {t('number Quote Posts', { value: itemData?.fast_forward_num })}
              </PostCountButton> */}
            </PostCount>
            <MentionOperator
              replyType='twitter'
              postId={itemData.id}
              itemData={{
                ...itemData,
                post_id: itemData.id,
                post: {
                  ...itemData,
                },
              }}
              callback={handleUpdateList}
            />
          </MeItemWrapper>
          <Editor type='comment' sendArticle={sendArticle} />
          <CommentList
            nonce={nonce}
            setNonce={setNonce}
            key={refresh}
            itemData={itemData}
          />
          {/* 快转弹框 */}
          <ForwardFastModal
            visible={visible}
            pid={itemData.id}
            onClose={() => setVisible(false)}
          />
        </>
      ) : loaded ? (
        <Empty title={t('http-error-30001001')} />
      ) : (
        <Spinner />
      )}
    </PageStyle>
  );
};
export default PostDetails;
