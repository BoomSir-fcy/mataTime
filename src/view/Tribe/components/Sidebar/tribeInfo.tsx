import React from 'react';
import { Icon, Avatar } from 'components';
import { Card, Flex, Text } from 'uikit';

const TribeInfo = ({ ...props }) => {
  return (
    <Card padding='16px' isRadius {...props}>
      <Flex justifyContent='space-between' alignItems='flex-end' mb='17px'>
        <Text fontSize='24px' fontWeight='bold'>
          时光机
        </Text>
        <Text color='textPrimary'>管理</Text>
      </Flex>
      <Flex alignItems='center' mb='13px'>
        <Text color='textTips'>创建</Text>
        <Text margin='0 13px'>1029天</Text>
        <Icon name='icon-fenxiang' color='textPrimary' size={18} />
      </Flex>
      <Flex alignItems='center' mb='19px'>
        <Avatar scale='sm' />
        <Text fontSize='18px' fontWeight='bold' ml='16px'>
          bigmama
        </Text>
      </Flex>
      <Text>
        这是一段部落的介绍The PhantaBear project was jointly launched by Jay
        Chou's PHANTACi and Ezek. PhantaBear is a collection of 10,000
        algorithmically generated digital collectibles that double as membership
        cards for the Ezek Club. Each
      </Text>
    </Card>
  );
};

export default TribeInfo;
