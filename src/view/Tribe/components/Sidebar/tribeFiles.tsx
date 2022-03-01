import React from 'react';
import { Card, Flex, Text, FilePDF } from 'uikit';
import { Icon } from 'components';

const TribeFiles = ({ ...props }) => {
  return (
    <Card padding='16px' isRadius {...props}>
      <Flex justifyContent='space-between' alignItems='flex-end' mb='20px'>
        <Text fontSize='18px' fontWeight='bold'>
          部落文件
        </Text>
        <Text color='textPrimary'>查看</Text>
      </Flex>
      <Flex alignItems='center'>
        <FilePDF />
        <Text ml='9px' color='textPrimary'>
          如何拿住比特币v10.1
        </Text>
      </Flex>
    </Card>
  );
};

export default TribeFiles;
