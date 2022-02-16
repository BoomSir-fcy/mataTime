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

const Column = styled(Flex)`
  flex-direction: column;
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
const NftBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
const GetAuthorizeBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  margin: 20px 0;
  border-radius: 10px;
  background: ${({ theme }) =>
    theme.isDark
      ? theme.colors.backgroundDisabled
      : theme.colors.backgroundThemeCard};
`;
const GetAuthorize = styled(Flex)`
  /* justify-content: space-between; */
  padding-top: 10px;
  overflow-x: auto;
  /* Scrollbar */
  ::-webkit-scrollbar {
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.white_black};
  }
`;
const ActiveImg = styled(Avatar)`
  border-radius: 10px;
`;
const NodataDom = styled.div`
  /* color: ${({ theme }) => theme.colors.textTips}; */
  /* text-align: center; */
`;
const NowrapBtn = styled(Button)`
  width: max-content;
  word-break: keep-all;
`;
const AvatarBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const NftItem = {
  description: '',
  image: '',
  isApprovedMarket: false,
  isStakeMarket: false,
  name: '',
  properties: {
    author: '',
    createdTime: 0,
    id: '',
    level: 0,
    owner: '',
    owner_status: 0,
    power: 0,
    res: '',
    token: '',
    token_id: '',
  },
};

interface Nft {
  name?: string;
  image?: string;
  nftToken?: string;
  nftId?: number;
}
const NftAvatar: React.FC<{
  NftInfo?: Nft;
  Nodata: boolean;
}> = ({ NftInfo, Nodata }) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const [activeNft, setActiveNft] = useState<Nft>({});

  return (
    <NftBox>
      <GetAuthorizeBox>
        {Nodata ? (
          <NodataDom>
            <Text mb='4px'>
              {t(
                "Sorry, you don't have a tribe ticket, so you can't create a tribe.",
              )}
            </Text>
            <Text mb='16px'>
              {t("Maybe you can join someone else's tribe.")}
            </Text>
            <Text>{t('Have fun！')}</Text>
          </NodataDom>
        ) : (
          <>
            <GetAuthorize>
              <Column>
                <AvatarBox
                  className={
                    activeNft?.nftToken === NftInfo.nftToken ? 'active' : ''
                  }
                >
                  <ActiveImg
                    disableFollow
                    src={NftInfo.image}
                    scale='ld'
                    onClick={() => {
                      setActiveNft(NftInfo);
                    }}
                  />
                </AvatarBox>
              </Column>
            </GetAuthorize>
          </>
        )}
      </GetAuthorizeBox>
    </NftBox>
  );
};

export default NftAvatar;
