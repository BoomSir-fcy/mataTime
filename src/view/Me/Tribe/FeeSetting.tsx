import React, { useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex } from 'uikit';
import { TribeFee } from 'view/Tribe/Create/TribeFee';

const MeTribeFeeSetting = () => {
  const { t } = useTranslation();
  const form = React.useRef<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <Box>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log('表单提交：', e);
          setIsEdit(false);
        }}
        action=''
      >
        <Crumbs title={t('Fee Setting')}>
          {isEdit ? (
            <Flex>
              <Button
                mr='20px'
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                {t('TribeCancel')}
              </Button>
              <Button type='submit'>{t('TribeSave')}</Button>
            </Flex>
          ) : (
            <Button
              onClick={() => {
                setIsEdit(true);
              }}
            >
              {t('TribeEdit')}
            </Button>
          )}
        </Crumbs>
        <TribeFee ref={form} disabled={!isEdit} />
      </form>
    </Box>
  );
};

export default MeTribeFeeSetting;
