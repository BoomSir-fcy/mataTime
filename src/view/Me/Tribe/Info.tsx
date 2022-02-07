import React, { useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box, Text, Button, Flex } from 'uikit';
import { TribeInfo } from 'view/Tribe/Create/TribeInfo';

const MyTribeInfo = () => {
  const { t } = useTranslation();
  const form = React.useRef<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <Box>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log('表单提交：', form.current.getInfoFrom());
          setIsEdit(false);
        }}
        action=''
      >
        <Crumbs title={t('Basic Information')}>
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
        <TribeInfo ref={form} disabled={!isEdit} />
      </form>
    </Box>
  );
};

export default MyTribeInfo;
