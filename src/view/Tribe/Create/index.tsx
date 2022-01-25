import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import React from 'react';
import { Box, Text } from 'uikit';
import SubHeader from '../components/SubHeader';

const Create = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Crumbs back />
      <SubHeader title={t('基础信息')} />
    </Box>
  );
};

export default Create;
