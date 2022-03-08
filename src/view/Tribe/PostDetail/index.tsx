import { ContentParsing, Crumbs, MoreOperatorEnum } from 'components';
import useParsedQueryString from 'hooks/useParsedQueryString';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  useTribeInfoById,
  useTribePostDetailById,
} from 'store/mapModule/hooks';
import {
  fetchPostDetailAsync,
  fetchTribePostDetailAsync,
} from 'store/mapModule/reducer';
import { useFetchTribePostInfo } from 'store/tribe/helperHooks';
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

const ContentBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
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
  }, [dispatch, id]);

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
          <Flex alignItems='center'>
            {tribeInfo?.tribe?.owner_address?.toLocaleLowerCase() ===
              account?.toLocaleLowerCase() && (
              <a
                href='javascript: void(0)'
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }}
              >
                <SetTribePopup
                  ref={popupRefSet}
                  data={{
                    ...data,
                    post: {
                      ...data,
                    },
                  }}
                  callback={(data: any, type) => {
                    popupRefSet?.current?.close();
                    // TODO:
                    // callback(data, type);
                  }}
                />
              </a>
            )}
            <a
              href='javascript: void(0)'
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
            >
              <Popup
                ref={popupRef}
                trigger={
                  <PopupButton title={t('popupMore')}>
                    <Icon name='icon-gengduo' size={20} color='textTips' />
                  </PopupButton>
                }
                nested
                position='bottom right'
                closeOnDocumentClick
                contentStyle={{
                  width: '150px',
                  height: 'auto',
                  borderRadius: '10px',
                  padding: 0,
                  border: '0',
                  backgroundColor: 'transparent',
                  zIndex: 99,
                }}
                overlayStyle={{
                  zIndex: 98,
                }}
                arrowStyle={{
                  color: theme.colors.tertiary,
                  stroke: theme.colors.tertiary,
                }}
              >
                <MoreTribePopup
                  postUid={'1'}
                  data={{
                    ...data,
                    post: {
                      ...data,
                    },
                  }}
                  callback={(data: any, type) => {
                    if (type === MoreOperatorEnum.BLOCKUSER) {
                      // TODO:
                      // setIsShileUser(!isShileUser, data);
                      return;
                    }
                    popupRef?.current?.close();
                    // TODO:
                    // callback(data, type);
                  }}
                />
              </Popup>
            </a>
          </Flex>
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
