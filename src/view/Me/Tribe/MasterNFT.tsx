import React, { useEffect, useState } from 'react';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { Box } from 'uikit';
import { ContentBox } from './styled';
import { CommonClaimNFT } from './components/CommonClaimNFT';
import { useDispatch } from 'react-redux';
import { fetchTribeNftInfo } from 'store/tribe';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useTribeInfoById } from 'store/mapModule/hooks';

const MeTribeMasterNFT = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const parseQs = useParsedQueryString();
  const tribeInfo = useTribeInfoById(parseQs.i);

  useEffect(() => {
    if (parseQs.i) dispatch(fetchTribeNftInfo({ tribeId: parseQs.i }));
  }, [parseQs]);

  return (
    <Box>
      <Crumbs title={t('Master NFT')} />
      <ContentBox>
        <CommonClaimNFT
          type='master'
          tribeId={parseQs.i}
          nft_id={tribeInfo?.tribe?.nft_id}
          status={tribeInfo?.status}
        />
      </ContentBox>
    </Box>
  );
};

export default MeTribeMasterNFT;
