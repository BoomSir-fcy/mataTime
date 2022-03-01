import React, { useEffect, useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box } from 'uikit';
import { ContentBox } from './styled';
import { CommonClaimNFT } from './components/CommonClaimNFT';
import { useDispatch } from 'react-redux';
import { fetchTribeNftInfo } from 'store/tribe';
import { useStore } from 'store';

const MeTribeMasterNFT = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tribeId = useStore(p => p.tribe.tribeId);

  useEffect(() => {
    dispatch(fetchTribeNftInfo({ tribeId }));
  }, [tribeId]);

  return (
    <Box>
      <Crumbs title={t('Master NFT')} />
      <ContentBox>
        <CommonClaimNFT type='master' tribeId={tribeId} />
      </ContentBox>
    </Box>
  );
};

export default MeTribeMasterNFT;
