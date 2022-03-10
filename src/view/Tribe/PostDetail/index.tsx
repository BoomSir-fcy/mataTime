import { ContentParsing, Crumbs, MoreOperatorEnum } from 'components';
import useParsedQueryString from 'hooks/useParsedQueryString';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  usePostTranslateMap,
  useTribeInfoById,
  useTribePostDetailById,
} from 'store/mapModule/hooks';
import {
  fetchPostDetailAsync,
  fetchTribePostDetailAsync,
} from 'store/mapModule/reducer';
import {
  useFetchTribePostInfo,
  useUpdateTribePostInfo,
} from 'store/tribe/helperHooks';
import Popup from 'reactjs-popup';
import styled, { useTheme } from 'styled-components';
import { Tag, CancleIcon, TagText } from 'view/Me/Tribe/components/TagList';
import { useStore } from 'store';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts/Localization';
import { Box, Text, Flex, Divider } from 'uikit';
import SubHeader from '../components/SubHeader';
import MentionOperator from '../components/MentionOperator';
import PostDetailHeader from './Header';
import HotBtn from '../components/post/HotBtn';
import { Editor, Icon } from 'components';
import { CommentList } from 'view/Post/CommentList';
import { Api } from 'apis';
import SpendTimeViewWithArticle from 'components/SpendTimeViewWithArticle';
import { ReadType } from 'hooks/imHooks/types';
import useReadArticle from 'hooks/imHooks/useReadArticle';
import { MoreTribePopup } from 'components/Popup/TribeMorePopup/morePopup';
import { SetTribePopup } from 'components/Popup/TribeSetPopup/SetPopup';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import ContentParsingOfTranslate from '../Detail/ContentParsingOfTranslate';
import PostHandleBtns from '../Detail/PostHandleBtns';
import { FetchStatus } from 'config/types';
import PrintBtn from '../Detail/PrintBtn';

const ContentBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  padding: 16px;
`;

const PopupButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
`;

const PostDetail = () => {
  const dispatch = useDispatch();
  const { i } = useParsedQueryString();
  const { account } = useActiveWeb3React();
  const theme = useTheme();
  const [refresh, setRefresh] = useState(1);
  const { toastSuccess } = useToast();
  const { t } = useTranslation();

  const id = Number(i);
  const currentUid = useStore(p => p.loginReducer.userInfo);

  const data = useTribePostDetailById(id);
  const tribeInfo = useTribeInfoById(data?.tribe_id);

  const [nonce, setNonce] = useState(0);
  useReadArticle(nonce);

  const updateDetails = React.useCallback(() => {
    dispatch(fetchTribePostDetailAsync(id));
  }, [dispatch, refresh, id]);

  useEffect(() => {
    setRefresh(prev => (prev === 1 ? 2 : 1));
  }, [data?.tribe_id]);

  useEffect(() => {
    updateDetails();
  }, [id]);

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

  const popupRefSet = React.useRef(null);
  const popupRef = React.useRef(null);

  const { handleUpdateList } = useUpdateTribePostInfo(
    setNonce,
    () => {},
    () => {},
  );

  const translateData = usePostTranslateMap(data?.id);

  return (
    <Box>
      <Crumbs back />
      <PostDetailHeader data={data} />
      <ContentBox>
        {
          // 普通帖子浏览自己的不扣费
          !(currentUid?.uid === data?.user_id && !data?.forward_type) && (
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
        <ContentParsingOfTranslate
          itemData={data}
          showTranslate
          callback={handleUpdateList}
          translateData={translateData}
          rows={40000}
        />
        <HotBtn mb='10px' list={data?.topics} />
        <PrintBtn className='print-hide' />
        <Flex className='print-hide' mt='24px'>
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
              console.log(1);
              handleUpdateList(item, type);
            }}
          />
          <PostHandleBtns
            print
            itemData={data}
            isTribeOnwer={
              tribeInfo?.tribe?.owner_address?.toLocaleLowerCase() ===
              account?.toLocaleLowerCase()
            }
            callback={handleUpdateList}
            showTranslateIcon={false}
            showTranslate={translateData?.showTranslate}
          />
        </Flex>
      </ContentBox>
      <Box className='print-hide'>
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
    </Box>
  );
};

export default PostDetail;
