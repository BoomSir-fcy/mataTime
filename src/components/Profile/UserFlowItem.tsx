import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button, FlexProps } from 'uikit';
import { Avatar } from 'components';
import { mediaQueriesSize } from 'uikit/theme/base';
import { shortenAddress } from 'utils/contract';
import { Certification } from './certification';
import { FollowBtn } from './FollowBtn'

const MinWidthButton = styled(Button)`
  width: max-content;
  min-width: 150px;
  max-width: 150px;
`;

interface UserFlowItemProps extends FlexProps {
  uid: number
  address: string
  is_attention: boolean
  nft_image: string
  introduction: string
  nick_name: string
  onChanges?: (isAttention: boolean) => void
}

export const UserFlowItem: React.FC<UserFlowItemProps> = ({
  uid,
  address,
  is_attention,
  nft_image,
  introduction,
  nick_name,
  onChanges,
  ...props
}) => {


  return (
    <Flex width="100%" justifyContent="flex-start" alignItems="center" {...props}>
      <Flex flex="1">
        <Avatar pd="10px 0" src={nft_image} scale="md" />
        <Box ml="22px">
          <Flex>
            <Text fontSize='18px' bold>{nick_name}</Text>
            <Text fontSize='14px' color='textTips'>@{shortenAddress(address)}</Text>
          </Flex>
          <Box>
            <Text ellipsis maxLine={2}>{introduction}</Text>
          </Box>
        </Box>
      </Flex>
      <FollowBtn uid={uid} attention={is_attention} onChanges={onChanges} />
    </Flex>
  )
}
