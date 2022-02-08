import React, { useState, useEffect, useCallback } from 'react';
import { Editor, Crumbs, MoreOperatorEnum, Loading } from 'components';
import { useToast } from 'hooks';
import { useStore } from 'store';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';
import { ReadType } from 'hooks/imHooks/types';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import eventBus from 'utils/eventBus';

import { CommentList } from './CommentList';
import { MeItemWrapper } from 'view/News/Me/style';
import { PageStyle, PostCount } from './style';

// import MentionItem from 'view/News/components/MentionItem';
import MentionItem from 'components/Post/MentionItem';
// import MentionOperator from 'view/News/components/MentionOperator';
import MentionOperator from 'components/Post/MentionOperator';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { Spinner, Empty, Text } from 'uikit';
import {
  useFetchAutoPostTranslate,
  usePostDetailById,
} from 'store/mapModule/hooks';
import { useDispatch } from 'react-redux';
import {
  fetchPostDetailAsync,
  fetchUserInfoAsync,
} from 'store/mapModule/reducer';
import useParsedQueryString from 'hooks/useParsedQueryString';
import {
  addDeletePostId,
  addUnFollowUserId,
  removeUnFollowUserId,
} from 'store/mapModule/actions';
import { useRouteMatch } from 'react-router';

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
  const currentUid = useStore(p => p.loginReducer.userInfo);
  // 阅读文章扣费
  const [nonce, setNonce] = useState(0);

  const { params } = useRouteMatch() as { params: { id: string } };
  useReadArticle(nonce);
  const dispatch = useDispatch();

  const updateDetails = React.useCallback(() => {
    dispatch(fetchPostDetailAsync(params.id));
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
            currentUid?.uid !== itemData?.user_id && itemData?.id && (
              <SpendTimeViewWithArticle
                readType={ReadType.ARTICLE}
                articleId={itemData?.id}
                setNonce={setNonce}
                nonce={nonce}
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
            <PostCount>
              <Text mr='15px'>{t('number Reposts', { value: 20 })}</Text>
              <Text>{t('number Quote Posts', { value: 20 })}</Text>
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
