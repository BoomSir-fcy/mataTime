import { Crumbs } from 'components';
import React from 'react';
import { Box, Text } from 'uikit';
import SubHeader from '../components/SubHeader';

const Post = () => {
  return (
    <Box>
      <Crumbs back />
      <SubHeader title='帖子信息' />
    </Box>
  );
};

export default Post;
