import React from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { Icon, Avatar } from 'components';
import { Card, Flex, Text } from 'uikit';
import { useStore } from 'store';

const TribeInfo = ({ ...props }) => {
  const dispatch = useDispatch();
  const tribeInfo = useStore(p => p.tribe.tribeInfo);
  const tribeBaseInfo = useStore(p => p.tribe.tribeBaseInfo);

  return (
    <Card padding='16px' isRadius {...props}>
      <Flex justifyContent='space-between' alignItems='flex-end' mb='17px'>
        <Text fontSize='24px' fontWeight='bold'>
          {tribeInfo?.tribe?.name}
        </Text>
        <Text color='textPrimary'>管理</Text>
      </Flex>
      <Flex alignItems='center' mb='13px'>
        <Text color='textTips'>创建</Text>
        <Text margin='0 13px'>
          {dayjs().diff(dayjs(tribeInfo?.tribe?.create_time * 1000), 'days')}天
        </Text>
        <Icon name='icon-fenxiang' color='textPrimary' size={18} />
      </Flex>
      <Flex alignItems='center' mb='19px'>
        <Avatar scale='sm' />
        <Text fontSize='18px' fontWeight='bold' ml='16px'>
          bigmama
        </Text>
      </Flex>
      <Text>{tribeBaseInfo?.introduction}</Text>
    </Card>
  );
};

export default TribeInfo;
