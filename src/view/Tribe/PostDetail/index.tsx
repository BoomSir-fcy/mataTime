import { Crumbs } from 'components';
import React from 'react';
import { Box, Text } from 'uikit';
import SubHeader from '../components/SubHeader';
import PostDetailHeader from './Header';

const PostDetail = () => {
  return (
    <Box>
      <Crumbs back />
      <PostDetailHeader />
    </Box>
  );
};

export default PostDetail;
