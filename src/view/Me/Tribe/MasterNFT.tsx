import React, { useEffect, useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box } from 'uikit';
import { ContentBox } from './styled';
import { CommonClaimNFT } from './components/CommonClaimNFT';
import { useDispatch } from 'react-redux';
import { fetchTribeNftInfo } from 'store/tribe';
import useParsedQueryString from 'hooks/useParsedQueryString';

const MeTribeMasterNFT = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const parseQs = useParsedQueryString();

  useEffect(() => {
    dispatch(fetchTribeNftInfo({ tribeId: parseQs.i }));
  }, [parseQs]);

  return (
    <Box>
      <Crumbs title={t('Master NFT')} />
      <ContentBox>
        <CommonClaimNFT type='master' tribeId={parseQs.i} />
      </ContentBox>
    </Box>
  );
};

export default MeTribeMasterNFT;
