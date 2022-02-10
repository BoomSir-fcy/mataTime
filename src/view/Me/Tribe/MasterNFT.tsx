import React, { useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box } from 'uikit';
import { ContentBox } from './styled';
import { CommonClaimNFT } from './components/CommonClaimNFT';

const MeTribeMasterNFT = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Crumbs title={t('Master NFT')} />
      <ContentBox>
        <CommonClaimNFT type='master' />
      </ContentBox>
    </Box>
  );
};

export default MeTribeMasterNFT;
