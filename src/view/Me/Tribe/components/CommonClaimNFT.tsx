import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'contexts';
import { Box, Text, Flex, LinkExternal, Input } from 'uikit';
import styled from 'styled-components';
import { BASE_IMAGE_URL } from 'config';
import { getBscScanLink } from 'utils/contract';
import { getTribeAddress } from 'utils/addressHelpers';
import { formatTime } from 'utils';
import { StyledButton } from '../styled';
import { useWeb3React } from '@web3-react/core';
import useConnectWallet from 'hooks/useConnectWallet';
import { MemberNft, NftStatus } from 'store/tribe/type';
import {
  ClaimButton,
  StakeButton,
  TransferButton,
  UnStakeButton,
} from './actionNft';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchTribeInfoAsync } from 'store/mapModule/reducer';
import { fetchIsApproveStakeNft } from 'store/tribe';
import default_avatar from 'assets/images/default_avatar.jpg';

const NFTBox = styled(Box)`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  .nft-img {
    width: 200px;
    border-radius: 10px;
    box-shadow: ${({ theme }) =>
      theme.isDark
        ? `0px 0px 10px 0px ${theme.colors.white}`
        : ` 0px 0px 10px 0px ${theme.colors.backgroundPrimary}`};
  }
`;
const StyledImg = styled.img`
  width: 200px;
  height: 200px;
`;

const nftType = {
  MASTER: 'master',
  MEMBER: 'member',
} as const;
type NFTType = typeof nftType[keyof typeof nftType];

export const CommonClaimNFT: React.FC<{
  type: NFTType;
  tribeId: number;
  nft_id: number;
  status?: number;
  tribesNftInfo?: MemberNft;
  tribeName?: string;
}> = React.memo(
  ({ type, tribeId, nft_id, status, tribesNftInfo = {}, tribeName }) => {
    const { t } = useTranslation();
    const tribeAddress = getTribeAddress();
    const history = useHistory();
    const dispatch = useDispatch();
    const { account } = useWeb3React();
    const { onConnectWallet } = useConnectWallet();

    useEffect(() => {
      if (account) {
        dispatch(fetchIsApproveStakeNft({ account }));
      }
    }, [account]);

    const nftInfo = useMemo(() => {
      if (type === nftType.MASTER) {
        return {
          name: tribesNftInfo.owner_nft_name,
          image: tribesNftInfo.owner_nft_image,
          introduction: tribesNftInfo.owner_nft_introduction,
          create_time: tribesNftInfo.create_time,
          nick_name: tribesNftInfo.nick_name,
        };
      }
      if (type === nftType.MEMBER) {
        return {
          name: tribesNftInfo.member_nft_name,
          image: tribesNftInfo.member_nft_image,
          introduction: tribesNftInfo.member_nft_introduction,
          create_time: tribesNftInfo.create_time,
          nick_name: tribesNftInfo.nick_name,
        };
      }
    }, [type, tribesNftInfo]);
    return (
      <>
        <Flex flexWrap='wrap' alignItems='center'>
          <NFTBox mr='80px' mb='20px'>
            <StyledImg
              className='nft-img'
              src={
                nftInfo.image
                  ? `${BASE_IMAGE_URL}${nftInfo.image}`
                  : default_avatar
              }
              alt=''
            />
          </NFTBox>
          <Flex maxWidth='60%' flex='auto' flexDirection='column'>
            <Text fontSize='18px' bold>
              {type === nftType.MASTER ? (
                <>
                  {t(`${tribeName}`)} - {t(`${nftInfo.name}`)}
                </>
              ) : (
                t(`${nftInfo.name}`)
              )}
            </Text>
            <Text mt='20px' color='textTips' small>
              {t(`${nftInfo.introduction}`)}
            </Text>
            <Text mt='20px' color='textTips' small>
              {t('Birthday:')} {formatTime(nftInfo.create_time, 'YYYY-MM-DD')}
            </Text>
            <Flex>
              <Text color='textTips' small>
                {t('Created by:')}
              </Text>
              <Text ml='10px' small>
                {nftInfo.nick_name}
              </Text>
            </Flex>
            <Flex justifyContent='space-between' alignItems='flex-end'>
              <LinkExternal
                mt='20px'
                color='textPrimary'
                height='24px'
                fontSize='16px'
                href={getBscScanLink(tribeAddress, 'token')}
              >
                View on BSCscan
              </LinkExternal>
              {type === nftType.MASTER && (
                <Flex>
                  {!account && (
                    <StyledButton
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        onConnectWallet();
                      }}
                    >
                      {t('Connect Wallet')}
                    </StyledButton>
                  )}
                  {account && status <= NftStatus.UnReceive && (
                    <ClaimButton
                      tribeId={tribeId}
                      nftType={1}
                      callback={() => {
                        dispatch(fetchTribeInfoAsync(tribeId));
                      }}
                    />
                  )}
                  {account &&
                  (status === NftStatus.Received ||
                    status === NftStatus.UnStake) ? (
                    <>
                      <StakeButton
                        mr='20px'
                        tribeId={tribeId}
                        nftId={nft_id}
                        nftType={1}
                        callback={() => {
                          dispatch(fetchTribeInfoAsync(tribeId));
                        }}
                      />
                      <TransferButton
                        nftId={nft_id}
                        callback={() => {
                          history.push('/me/tribe');
                        }}
                      />
                    </>
                  ) : null}
                  {account && status === NftStatus.Staked && (
                    <>
                      <UnStakeButton
                        tribeId={tribeId}
                        nftType={1}
                        callback={() => {
                          dispatch(fetchTribeInfoAsync(tribeId));
                        }}
                      />
                    </>
                  )}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  },
);
