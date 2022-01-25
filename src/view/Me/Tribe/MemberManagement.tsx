import { Crumbs } from 'components';
import React from 'react';
import { Box, Text, Button, Flex, Input } from 'uikit';

const MeTribeMemberManagement = () => {
  return (
    <Box>
      <Crumbs title='成员管理'>
        <Box width='180px'>
          <Input placeholder='搜索' />
        </Box>
      </Crumbs>
    </Box>
  );
};

export default MeTribeMemberManagement;
