import React from 'react';
import { Crumbs } from 'components';
import { Box, Text, Button } from 'uikit';

const MyTribeInfo = () => {
  return (
    <Box>
      <Crumbs title='基础信息'>
        <Button>编辑</Button>
      </Crumbs>
    </Box>
  );
};

export default MyTribeInfo;
