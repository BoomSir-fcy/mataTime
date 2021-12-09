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
  uid?: string;
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
  time
}) => {
  return (
    <Flex>
      <Avatar src={avatar} scale={scale} />
      <Box ml="8px">
        <Text color={'#FFF'}>{userName}</Text>
        <Text color="textTips" className="time">
          <span>@{shortenAddress(address)}</span>
          {time}
        </Text>
      </Box>
    </Flex>
  );
};
