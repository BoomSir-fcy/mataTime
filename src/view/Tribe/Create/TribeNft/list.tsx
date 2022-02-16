import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Box, Text, Flex, Button, Link } from 'uikit';
import { Avatar } from 'components';
import { useStore } from 'store';
import { useTranslation } from 'contexts/Localization';
import { useApproveNftsFarm } from 'view/Login/hook';
import { fetchUserNftInfoAsync } from 'store/login/reducer';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { storeAction } from 'store';
import { GET_DSG_NFT_URL } from 'config';
import { useToast } from 'hooks';
import { NftInfo } from 'store/tribe/type';
import { fetchActiveNftInfo } from 'store/tribe';

const Column = styled(Flex)`
  justify-content: space-around;
  align-items: center;
  width: max-content;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 26px;
  }
  &:first-child {
    margin-left: 17px;
  }
  .active {
    box-shadow: ${({ theme }) =>
      theme.isDark
        ? `0px 0px 9px 5px ${theme.colors.white}`
        : ` 0px 0px 10px 0px ${theme.colors.backgroundPrimary}`};
  }
`;
const ActiveImg = styled(Avatar)`
  border-radius: 10px;
`;
const AvatarBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const NftAvatar: React.FC<{
  nftInfo?: NftInfo;
  Nodata: boolean;
}> = ({ nftInfo, Nodata }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeNft = useStore(p => p.tribe.activeNftInfo);

  return (
    <>
      {Nodata ? (
        <Box>
          <Text mb='4px'>
            {t(
              "Sorry, you don't have a tribe ticket, so you can't create a tribe.",
            )}
          </Text>
          <Text mb='16px'>{t("Maybe you can join someone else's tribe.")}</Text>
          <Text>{t('Have fun！')}</Text>
        </Box>
      ) : (
        <Column>
          <AvatarBox
            className={activeNft?.nftId === nftInfo.nftId ? 'active' : ''}
          >
            <ActiveImg
              disableFollow
              src={nftInfo.image}
              scale='ld'
              onClick={() => {
                dispatch(fetchActiveNftInfo({ info: nftInfo }));
              }}
            />
          </AvatarBox>
        </Column>
      )}
    </>
  );
};

export default NftAvatar;
