import { ContentParsing, Crumbs } from 'components';
import useParsedQueryString from 'hooks/useParsedQueryString';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { useTribePostDetailById } from 'store/mapModule/hooks';
import {
  fetchPostDetailAsync,
  fetchTribePostDetailAsync,
} from 'store/mapModule/reducer';
import { useFetchTribePostInfo } from 'store/tribe/helperHooks';
import { Box, Text } from 'uikit';
import SubHeader from '../components/SubHeader';
import PostDetailHeader from './Header';

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

  const data = useTribePostDetailById(id);

  return (
    <Box>
      <Crumbs back />
      <PostDetailHeader />
      <ContentParsing content={data?.content} />
    </Box>
  );
};

export default PostDetail;
