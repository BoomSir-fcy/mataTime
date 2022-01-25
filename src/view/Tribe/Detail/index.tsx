import { Crumbs } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Button } from 'uikit';
import DetailHeader from './Header';

const Detail = () => {
  return (
    <Box>
      <Crumbs back />
      <DetailHeader />
      <Text>部落详情</Text>
      <Link to='/tribe/postdetail/1'>
        <Button>点击跳转详情</Button>
      </Link>
    </Box>
  );
};

export default Detail;
