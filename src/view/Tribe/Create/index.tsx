import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import React, { useCallback } from 'react';
import { Box, Button, Divider, Text } from 'uikit';
import SubHeader from '../components/SubHeader';
import TribeFee from './TribeFee';
import TribeInfo from './TribeInfo';

const Create = () => {
  const { t } = useTranslation();
  const form = React.useRef<any>();

  const createTribe = () => {
    const info = form.current.getInfoFrom();
    console.log(info);
  };
  return (
    <Box>
      <Crumbs back />
      <SubHeader title={t('基础信息')} />
      <TribeInfo ref={form} />
      <Divider />
      <SubHeader title={t('类型设置')} />
      <TribeFee ref={form} />
      <Divider />
      <Button onClick={createTribe}>{t('批准')}</Button>
    </Box>
  );
};

export default Create;
