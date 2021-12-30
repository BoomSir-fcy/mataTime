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

import { NftButton } from './approve';

import Dots from '../Loader/Dots';

const Point = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
  font-size: 16px;
  margin-left: 17px;
`;
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
    box-shadow: 0px 0px 9px 5px ${({ theme }) => theme.colors.white};
  }
`;
const GetAuthorizeBox = styled(Box)`
  padding: 10px 0 17px 0;
  margin-top: 10px;
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
const AvatarName = styled(Text)`
  width: max-content;
  text-align: center;
  margin-top: 14px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textTips};
`;
const ActiveImg = styled(Avatar)`
  border-radius: 10px;
`;
const NodataDom = styled.div`
  color: ${({ theme }) => theme.colors.textTips};
  text-align: center;
`;
const NowrapBtn = styled(Button)`
  width: max-content;
  word-break: keep-all;
`;
const AvatarBox = styled.div`
  width: 102px;
  height: 104px;
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
  return (
    <GetAuthorizeBox>
      {Nodata ? (
        <NodataDom>
          <Text mb='15px'>{t('setNftAvatarGetMore')}</Text>
          <Button>
            <Link external href={GET_DSG_NFT_URL}>
              {t('loginGetNft')}
            </Link>
          </Button>
        </NodataDom>
      ) : (
        <>
          <Flex justifyContent='space-between' alignItems='center'>
            <Point>{!Boolean(status) && t('setNftAvatarListTips')}</Point>
            {NftInfo?.needApprove ? (
              <StakeAllBtn token={NftInfo.address} account={account} />
            ) : (
              <React.Fragment>
                {!Boolean(status) && <NftButton item={nft} />}
              </React.Fragment>
            )}
          </Flex>
          <GetAuthorize>
            {NftList.map((item, index) =>
              NftInfo.address === item.properties.token ? (
                <Column key={`${index}_${item.properties.token_id}`}>
                  {/* {ActiveAvInfo.properties?.token_id === item.properties.token_id && <ActiveImg src={require('./img/active.png').default} />} */}
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
                        }
                      }}
                    />
                  </AvatarBox>
                  <AvatarName>
                    {item.name} #{item.properties.token_id}
                  </AvatarName>
                </Column>
              ) : (
                <></>
              ),
            )}
          </GetAuthorize>
        </>
      )}
    </GetAuthorizeBox>
  );
};

const StakeAllBtn = ({ token, account }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onApprove } = useApproveNftsFarm(token);
  const [pendingTx, setPendingTx] = useState(false);

  // 授权
  const handleApprove = useCallback(async () => {
    try {
      // 一键授权
      await onApprove();
      dispatch(fetchUserNftInfoAsync(account));
    } catch (e) {
      throw e;
    }
  }, [onApprove]);

  return (
    <NowrapBtn
      disabled={pendingTx}
      onClick={async () => {
        setPendingTx(true);
        try {
          // 授权
          await handleApprove();
          toast.success(t('setNftAuthorizationSuccess'));
        } catch (error) {
          console.error(error);
          toast.error(t('setNftAuthorizationFail'));
        } finally {
          setPendingTx(false);
        }
      }}
    >
      {pendingTx ? (
        <Dots>{t('setNftAuthorizationing')}</Dots>
      ) : (
        t('setNftAuthorization')
      )}
    </NowrapBtn>
  );
};
export default NftAvatar;
