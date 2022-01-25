import React from 'react';
import { Crumbs } from 'components';
import { Link } from 'react-router-dom';
import { Box, Divider, Text, Button, Flex } from 'uikit';

const MyTribe = () => {
  return (
    <Box>
      <Box>
        <Flex justifyContent='space-between'>
          <Box>
            <Text>部落</Text>
            <Text>部落</Text>
            <Text>部落</Text>
          </Box>
          <Link to='/me/tribe/info'>
            <Button>管理</Button>
          </Link>
        </Flex>
        <Divider />
      </Box>
      <Box>
        <Flex justifyContent='space-between'>
          <Box>
            <Text>部落</Text>
            <Text>部落</Text>
            <Text>部落</Text>
          </Box>
          <Button>管理</Button>
        </Flex>
        <Divider />
      </Box>
    </Box>
  );
};

export default MyTribe;
