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
import { TribeCreateBtn } from '../TribeCreateBtn';

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
  address: string;
  needApprove: boolean;
}
const NftAvatar: React.FC<{
  NftInfo?: Nft;
  Nodata: boolean;
  status?: number;
}> = ({ NftInfo, Nodata, status }) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const [ActiveAvInfo, setActiveAvInfo] = useState(NftItem);
  const NftList = useStore(p => p.loginReducer.nftList);
  const nft = useStore(p => p.loginReducer.nft);
  const { toastWarning, toastError } = useToast();

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
              {NftList.map((item, index) =>
                NftInfo.address === item.properties.token ? (
                  <Column key={`${index}_${item.properties.token_id}`}>
                    <AvatarBox
                      className={
                        nft.properties?.token_id === item.properties.token_id &&
                        'active'
                      }
                    >
                      <ActiveImg
                        disableFollow
                        src={item.image}
                        scale='ld'
                        onClick={() => {
                          if (!NftInfo.needApprove) {
                            dispatch(
                              storeAction.setUserNftStake({ isStakeNft: true }),
                            );
                            dispatch(storeAction.setUserNft(item));
                          } else {
                            toastWarning(t('You should approve first!'));
                          }
                        }}
                      />
                    </AvatarBox>
                  </Column>
                ) : (
                  <></>
                ),
              )}
            </GetAuthorize>
          </>
        )}
      </GetAuthorizeBox>
      <TribeCreateBtn hasNft />
    </NftBox>
  );
};

export default NftAvatar;
