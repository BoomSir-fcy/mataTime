import { Crumbs } from 'components';
import React from 'react';
import { Box, Text, Button, Flex } from 'uikit';

const MeTribeFeeSetting = () => {
  return (
    <Box>
      <Crumbs title='费用设置'>
        <Flex>
          <Button>取消</Button>
          <Button>保存</Button>
        </Flex>
      </Crumbs>
    </Box>
  );
};

export default MeTribeFeeSetting;
