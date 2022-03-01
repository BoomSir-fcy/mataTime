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
import { Box, Text, Flex } from 'uikit';
import SubHeader from '../components/SubHeader';
import MentionOperator from '../components/MentionOperator';
import PostDetailHeader from './Header';
import HotBtn from '../components/post/HotBtn';
import {
  Editor,
} from 'components';
import { CommentList } from 'view/Post/CommentList';


const ContentBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
`

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

  const updateDetails = React.useCallback(() => {
    dispatch(fetchTribePostDetailAsync(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    updateDetails();
  }, [id]);

  const [nonce, setNonce] = useState(0);
  const [refresh, setRefresh] = useState(1);

  const data = useTribePostDetailById(id);

  const sendArticle = useCallback((...arg) => {
    console.log(arg)
  }, [])

  // console.log(data?.content)

  return (
    <Box>
      <Crumbs back />
      <PostDetailHeader data={data} />
      <ContentBox>
        <ContentParsing rows={50} content={data?.content} />
        <HotBtn list={data?.topics} />
        <Flex mt='24px'>
          <MentionOperator
            replyType='twitter'
            postId={1}
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
            }} />
        </Flex>
        <Editor type='comment' sendArticle={sendArticle} />
        <CommentList
          nonce={nonce}
          setNonce={setNonce}
          key={refresh}
          itemData={data || {}}
        />
      </ContentBox>
    </Box>
  );
};

export default PostDetail;
