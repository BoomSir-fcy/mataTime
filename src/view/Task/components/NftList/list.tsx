import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Box, Text, Flex, Button } from 'uikit';
import { Avatar, Icon } from 'components';
import { useStore } from 'store';
import { useTranslation } from 'contexts/Localization';
import { useApproveNftsFarm } from 'view/Login/hook';
import { fetchUserNftInfoAsync } from 'store/login/reducer';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { storeAction } from 'store';
import Dots from 'components/Loader/Dots';

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
  /* .active {
    box-shadow: 0px 0px 9px 5px ${({ theme }) => theme.colors.white};
  } */
`;
const GetAuthorizeBox = styled(Box)`
  padding: 10px 0 17px 0;
  margin-top: 10px;
  border-radius: 10px;
  max-width: 400px;
  /* background: ${({ theme }) => theme.colors.backgroundDisabled}; */
`;
const GetAuthorize = styled(Flex)`
  padding-top: 10px;
  overflow-x: auto;
  /* Scrollbar */
  ::-webkit-scrollbar {
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
const ActiveImg = styled(Avatar)`
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px ${({ theme }) => theme.colors.white};
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
  position: relative;
  width: 102px;
  height: 104px;
  border-radius: 10px;
  .icon {
    position: absolute;
    bottom: 8%;
    right: 5%;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
  }
`;

const ReceivedBox = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 5px;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.backgroundThemeCard};
`;

interface Nft {
  address: string;
  needApprove: boolean;
}
const NftAvatar: React.FC<{
  NftInfo?: Nft;
  Nodata: boolean;
  status?: number;
  handleClickNft?: () => void;
}> = ({ NftInfo, Nodata, handleClickNft }) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const NftList = useStore(p => p.loginReducer.nftList);

  const nft = useStore(p => p.loginReducer.nft);
  console.log(NftList, '========NftList');
  return (
    <GetAuthorizeBox>
      {Nodata ? (
        <NodataDom>
          <Text mb='15px'>{t('setNftAvatarGetMore')}</Text>
          <Button>{t('loginGetNft')}</Button>
        </NodataDom>
      ) : (
        <>
          <GetAuthorize>
            {NftList.map((item, index) =>
              NftInfo.address === item.properties.token ? (
                <Column key={`${index}_${item.properties.token_id}`}>
                  <AvatarBox>
                    {nft.properties?.token_id === item.properties.token_id ? (
                      <ReceivedBox>
                        <Icon
                          name={'icon-complete'}
                          color='primary'
                          size={25}
                        />
                        <Text mt='16px' color='textTips' small>
                          {t('NFT has been collected')}
                        </Text>
                      </ReceivedBox>
                    ) : (
                      <>
                        <ActiveImg
                          disableFollow
                          src={item.image}
                          scale='ld'
                          onClick={() => {
                            if (!NftInfo.needApprove) {
                              dispatch(
                                storeAction.setUserNftStake({
                                  isStakeNft: true
                                })
                              );
                              dispatch(storeAction.setUserNft(item));
                            }
                            handleClickNft();
                          }}
                        />
                        <Icon
                          className='icon'
                          name={'icon-fenxiang'}
                          color='textPrimary'
                          size={18}
                        />
                      </>
                    )}
                  </AvatarBox>
                </Column>
              ) : (
                <></>
              )
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
