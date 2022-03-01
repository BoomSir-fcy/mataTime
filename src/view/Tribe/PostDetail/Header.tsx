import { Avatar } from 'components';
import React from 'react';
import styled from 'styled-components';
import { Box, Divider, Flex, Text } from 'uikit';
import { displayTime } from 'utils';

const MiddleText = styled(Text)`
  vertical-align: middle;
`;

const PostDetailHeader: React.FC<{ data: Api.Tribe.PostDataInfo }> = ({ data }) => {
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
        <Flex mt='8px' alignItems='center'>
          <Avatar src={data?.user_avator_url} scale='mm' />
          <MiddleText ml='16px' fontSize='18px' bold>
            {data?.user_name}
          </MiddleText>
          <MiddleText ml='18px'>{displayTime(data?.add_time)}</MiddleText>
          <MiddleText ml='28px'>发布在</MiddleText>
          <MiddleText ml='0.5em'>{data?.tribe_name}</MiddleText>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default PostDetailHeader;
