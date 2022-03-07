import React from 'react';
import { Card, Flex, Text, FilePDF } from 'uikit';
import { useTranslation } from 'contexts';
import { useFetchFileList } from 'store/tribe/helperHooks';
import { useTribeInfoById } from 'store/mapModule/hooks';

const TribeFiles: React.FC<{
  tribe_id: number;
  mb: string;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const { data } = useFetchFileList(props.tribe_id);

  // useFetchFileList(props.tribe_id);
  console.log(data);

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
