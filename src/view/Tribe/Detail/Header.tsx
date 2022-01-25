import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Heading, Text, Box } from 'uikit';
import TradeLogo from '../components/TradeCard/TradeLogo';

const DetailHeader = () => {
  return (
    <Flex pt='24px' pl='24px'>
      <TradeLogo />
      <Flex flex='1' flexDirection='column' justifyContent='space-between'>
        <Box ml='32px'>
          <Heading>时光机</Heading>
          <Flex mt='28px' justifyContent='space-between'>
            <Box>
              <Text bold>2560</Text>
              <Text fontSize='14px'>成员</Text>
            </Box>
            <Box>
              <Text bold>2560</Text>
              <Text fontSize='14px'>成员</Text>
            </Box>
            <Box>
              <Text bold>2560</Text>
              <Text fontSize='14px'>成员</Text>
            </Box>
          </Flex>
        </Box>
        <Flex justifyContent='space-between'>
          <Text>Oline 样式待优化</Text>
          <Link to='/tribe/post'>
            <Button>发布</Button>
          </Link>
          {/* <Button>加入部落</Button> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DetailHeader;
