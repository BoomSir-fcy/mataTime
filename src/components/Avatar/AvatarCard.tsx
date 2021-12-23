import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { Link } from 'react-router-dom';
import { Flex, Text, Box } from 'uikit';
import { shortenAddress } from 'utils/contract';
import { Avatar } from '.';

interface AvatarCardProps {
  avatar?: string;
  scale?: 'xl' | 'ld' | 'md' | 'sm';
  uid?: number;
  userName?: string;
  address?: string;
  time?: string;
}

export const AvatarCard: React.FC<AvatarCardProps> = ({
  avatar,
  scale = 'md',
  uid,
  userName,
  address,
  time,
}) => {
  return (
    <Flex style={{ flex: 1, minWidth: 0 }}>
      <Avatar disableFollow uid={uid} src={avatar} scale={scale} />
      <Box ml='8px' style={{ minWidth: 0 }}>
        <Text color={'#FFF'} ellipsis>
          {userName}
        </Text>
        <Text color='textTips' className='time'>
          <span>@{shortenAddress(address)}</span>
          {time}
        </Text>
      </Box>
    </Flex>
  );
};
