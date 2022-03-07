import React from 'react';
import { Card, Flex, Text } from 'uikit';
import { FileTribeModal } from 'components';
import { useTranslation } from 'contexts';
import { useFetchFileList } from 'store/tribe/helperHooks';
import getFileExt from 'utils/getFileExt';

import FileIcon from 'components/Icon/FileIcon';
import { useImmer } from 'use-immer';

const TribeFiles: React.FC<{
  tribe_id: number;
  mb: string;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const { data, updateData } = useFetchFileList(props.tribe_id, 1);
  const [state, setState] = useImmer({
    visible: false,
  });

  return (
    <>
      <Card padding='16px' isRadius {...props}>
        <Flex justifyContent='space-between' alignItems='flex-end' mb='20px'>
          <Text fontSize='18px' fontWeight='bold'>
            {t('TribeFileTitle')}
          </Text>
          <Text
            color='textPrimary'
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setState(p => {
                p.visible = true;
              })
            }
          >
            {t('TribeFileLooks')}
          </Text>
        </Flex>
        <Flex justifyContent='flex-start' flexDirection='column'>
          {(data.data?.list.slice(0, 3) ?? []).map((item, index) => (
            <Flex
              as='a'
              href={`${item.url}`}
              target='_blank'
              key={index}
              mb='10px'
              rel='noreferrer'
            >
              <FileIcon ext={getFileExt(item.url)} />
              <Text ellipsis ml='9px' color='textPrimary'>
                {item.file_name}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Card>
      <FileTribeModal
        visible={state.visible}
        loading={data.loading}
        files={data.data}
        onchangePage={async page => {
          await updateData(props.tribe_id, page);
        }}
        onClose={() =>
          setState(p => {
            p.visible = false;
          })
        }
      />
    </>
  );
};

export default TribeFiles;
