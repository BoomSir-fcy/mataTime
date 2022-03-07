import { ContentParsing, Crumbs, MoreOperatorEnum } from 'components';
import useParsedQueryString from 'hooks/useParsedQueryString';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { useTribePostDetailById } from 'store/mapModule/hooks';
import {
  fetchPostDetailAsync,
  fetchTribePostDetailAsync,
} from 'store/mapModule/reducer';
import { useFetchTribePostInfo } from 'store/tribe/helperHooks';
import styled from 'styled-components';
import { Tag, CancleIcon, TagText } from 'view/Me/Tribe/components/TagList';
import { useStore } from 'store';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts/Localization';
import { Box, Text, Flex, Divider } from 'uikit';
import SubHeader from '../components/SubHeader';
import MentionOperator from '../components/MentionOperator';
import PostDetailHeader from './Header';
import HotBtn from '../components/post/HotBtn';
import { Editor } from 'components';
import { CommentList } from 'view/Post/CommentList';
import { Api } from 'apis';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import useReadArticle from 'hooks/imHooks/useReadArticle';

const ContentBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;

const PostDetail = () => {
  // const {
  //   data: { data, fetchStatus },
  //   updateData,
  // } = useFetchTribePostInfo(229);

  // console.log(data);
  const dispatch = useDispatch();
  // const { params } = useRouteMatch() as { params: { id: string } };
  const { i } = useParsedQueryString();
  const id = Number(i);
  const currentUid = useStore(p => p.loginReducer.userInfo);
  // 阅读文章扣费

  const updateDetails = React.useCallback(() => {
    dispatch(fetchTribePostDetailAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    updateDetails();
  }, [id]);

  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);
  const [refresh, setRefresh] = useState(1);

  const data = useTribePostDetailById(id);
  const { toastSuccess } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    setNonce(prev => prev + 1);
  }, [data]);

  const sendArticle = useCallback(
    (res, image_urls, remind_user, reset, first_comment_id) => {
      Api.CommentApi.createComment({
        pid: id,
        comment: res,
        remind_user,
        first_comment_id: 0,
      }).then(res => {
        if (Api.isSuccess(res)) {
          reset && reset();
          updateDetails();
          toastSuccess(t('comment success'));
          setRefresh(refresh === 1 ? 2 : 1);
        }
      });
    },
    [toastSuccess, t, id, updateDetails],
  );

  // console.log(data?.content)

  return (
    <Box>
      <Crumbs back />
      <PostDetailHeader data={data} />
      <ContentBox>
        {
          // 普通帖子浏览自己的不扣费
          !(currentUid?.uid === data?.user_id && data?.forward_type === 0) && (
            <SpendTimeViewWithArticle
              nonce={nonce}
              setNonce={setNonce}
              readType={ReadType.TRIBE_ARTICLE}
              articleId={data?.id}
              forwardType={data?.forward?.forward_type}
              forward={data?.forward}
              tribeId={data?.tribe_id}
            />
          )
        }
        <ContentParsing rows={50} content={data?.content} />
        <HotBtn list={data?.topics} />
        <Flex mt='24px'>
          <MentionOperator
            replyType='twitter'
            postId={data?.id}
            joined
            hasReward={false}
            itemData={{
              ...data,
              post_id: data?.id,
              post: {
                ...data,
                post_id: data?.id,
              },
            }}
            callback={(item: any, type?: MoreOperatorEnum) => {
              // handleUpdateList(item, type);
            }}
          />
        </Flex>
      </ContentBox>
      <Divider />
      <Editor type='comment' sendArticle={sendArticle} />
      <CommentList
        nonce={nonce}
        setNonce={setNonce}
        key={refresh}
        itemData={data || {}}
        tribeId={data?.tribe_id}
      />
    </Box>
  );
};

export default PostDetail;
