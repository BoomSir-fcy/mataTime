import React from 'react';
import { Card, Flex, Text, FilePDF } from 'uikit';
import { useTranslation } from 'contexts';

const TribeFiles = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <Card padding='16px' isRadius {...props}>
      <Flex justifyContent='space-between' alignItems='flex-end' mb='20px'>
        <Text fontSize='18px' fontWeight='bold'>
          {t('TribeFileTitle')}
        </Text>
        <Text color='textPrimary'>{t('TribeFileLooks')}</Text>
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
