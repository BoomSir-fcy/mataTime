import { Avatar } from 'components';
import React from 'react';
import styled from 'styled-components';
import { Box, Divider, Flex, Text } from 'uikit';

const MiddleText = styled(Text)`
  vertical-align: middle;
`;

const PostDetailHeader = () => {
  return (
    <>
      <Flex
        height='112px'
        flexDirection='column'
        justifyContent='center'
        pl='16px'
      >
        <Text as='h2' fontSize='20px' bold>
          这是一个文章标题
        </Text>
        <Flex mt='8px' alignItems='center'>
          <Avatar scale='mm' />
          <MiddleText ml='16px' fontSize='18px' bold>
            no-bug
          </MiddleText>
          <MiddleText ml='18px'>12-15 110:11</MiddleText>
          <MiddleText ml='28px'>啊啊啊</MiddleText>
          <MiddleText ml='1em'>啊啊啊</MiddleText>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default PostDetailHeader;
