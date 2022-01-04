import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button, FlexProps, ButtonProps } from 'uikit';
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
  btnProps?: ButtonProps
  hideIntro?: boolean
  textBtn?: boolean
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
  textBtn,
  hideIntro,
  btnProps,
  ...props
}) => {

  return (
    <Flex width="100%" justifyContent="flex-start" alignItems="center" {...props}>
      <Flex flex="1">
        <Avatar uid={uid} pd="10px 0" src={nft_image} scale="md" />
        <Flex flex="1" flexDirection="column" ml="22px">
          <Flex overflow="hidden" alignItems="center" flexWrap="wrap">
            <Text maxWidth="30vw" ellipsis fontSize='18px' bold>{nick_name}</Text>
            <Text fontSize='14px' ml="12px" color='textTips'>@{shortenAddress(address)}</Text>
          </Flex>
          {
            !hideIntro && (
              <Box className='show-media-sm'>
                <Text fontSize='14px' color='textTips' ellipsis maxLine={2}>{introduction}</Text>
              </Box>
            )
          }
        </Flex>
      </Flex>
      <Box onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
      }}>
        <FollowBtn
          ml="8px"
          variant={textBtn ? 'text' : undefined}
          uid={uid}
          attention={is_attention}
          onChanges={onChanges}
          address={address}
          nft_image={nft_image}
          {...btnProps}
        />
      </Box>
    </Flex>
  )
}
