import React from 'react';
import { Flex, Text } from 'uikit';
import styled from 'styled-components';
import dayjs from 'dayjs';

const Img = styled.img`
  display: block;
  border-radius: 50%;
  object-fit: cover;
  width: 30px;
  height: 30px;
  margin-right: 14px;
`;

const SendUser: React.FC<{
  Avatar: string;
  name: string;
  time: number;
  nameColor?: string;
  nameStyle?: Object;
}> = ({ Avatar, name, time, nameColor, nameStyle }) => {
  return (
    <Flex alignItems='center'>
      <Img src={Avatar} />
      <Flex justifyContent='flex-start' alignItems='baseline'>
        <Text mr='18px' fontSize='18px' bold color={nameColor} {...nameStyle}>
          {name}
        </Text>
        <Text fontSize='14px' color='textTips'>
          {dayjs(time).format('MM-DD HH:mm')}
        </Text>
      </Flex>
    </Flex>
  );
};

export default SendUser;
