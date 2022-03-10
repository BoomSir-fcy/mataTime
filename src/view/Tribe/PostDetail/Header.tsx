import { Avatar } from 'components';
import React from 'react';
import styled from 'styled-components';
import { Box, Divider, Flex, Text } from 'uikit';
import { displayTime } from 'utils';

const MiddleText = styled(Text)`
  vertical-align: middle;
`;

const PostDetailHeader: React.FC<{ data: Api.Tribe.PostDataInfo }> = ({
  data,
}) => {
  return (
    <>
      <Flex
        height='112px'
        flexDirection='column'
        justifyContent='center'
        pl='16px'
      >
        <Text as='h2' fontSize='20px' ellipsis bold>
          {data?.title}
        </Text>
        <Flex flexWrap='wrap' mt='8px' alignItems='center'>
          <Flex mb='8px' alignItems='center' mr='28px'>
            <Avatar src={data?.user_avator_url} scale='mm' />
            <MiddleText ml='16px' fontSize='18px' bold>
              {data?.user_name}
            </MiddleText>
            <MiddleText color='textTips' ml='18px'>
              {displayTime(data?.add_time)}
            </MiddleText>
          </Flex>
          <Flex mb='8px' alignItems='center'>
            <MiddleText color='textTips'>发布在</MiddleText>
            <MiddleText color='textTips' ml='0.5em'>
              {data?.tribe_name}
            </MiddleText>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default PostDetailHeader;
