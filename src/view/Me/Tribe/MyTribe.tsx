import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, Text, Button, Flex, Heading } from 'uikit';
import styled from 'styled-components';
import TradeLogo from 'view/Tribe/components/TradeCard/TradeLogo';
import dayjs from 'dayjs';

const InfoFlex = styled(Flex)`
  padding: 26px 14px 26px 26px;
  flex-wrap: wrap;
`;

const RightFlex = styled(Flex)`
  /* min-height: 100px; */
  margin-left: 18px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 32px;
  }
`;

const NumberFlex = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 70%;
  }
`;

const MyTribe = () => {
  return (
    <Box>
      <Box>
        <InfoFlex>
          <TradeLogo scales='sm' />
          <RightFlex
            flex='1'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Flex justifyContent='space-between' alignItems='center'>
              <Heading scale='md'>时光机</Heading>
              <Flex justifyContent='space-between' alignItems='center'>
                <Text mr='20px' fontSize='14px' color='textTips'>
                  {dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm')}
                </Text>
                <Link to='/me/tribe/info'>
                  <Button>管理</Button>
                </Link>
              </Flex>
            </Flex>
            <NumberFlex justifyContent='space-between'>
              <Box>
                <Text bold>2560</Text>
                <Text fontSize='14px' color='textTips'>
                  成员
                </Text>
              </Box>
              <Box>
                <Text bold>2560</Text>
                <Text fontSize='14px' color='textTips'>
                  帖子
                </Text>
              </Box>
              <Box>
                <Text bold>2560</Text>
                <Text fontSize='14px' color='textTips'>
                  精选
                </Text>
              </Box>
            </NumberFlex>
          </RightFlex>
        </InfoFlex>
        <Divider />
      </Box>
    </Box>
  );
};

export default MyTribe;
