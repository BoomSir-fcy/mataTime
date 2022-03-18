import React from 'react';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Box, Card, Flex, Image, Button, Text } from 'uikit';
import { useTranslation } from 'contexts';
import { BASE_IMAGE_URL } from 'config';
import { storeAction } from 'store';
import { fetchTribeJoinBasicServiceAsync } from 'store/tribe';
import { fetchTribeInfoAsync } from 'store/mapModule/reducer';

import {
  TribeType,
  NftStatus,
  TribeNftStatus,
  TribeBelongNft,
} from 'store/tribe/type';
import { useTribeInfoById } from 'store/mapModule/hooks';
import { StakeButton, UnStakeButton } from 'view/Me/Tribe/components/actionNft';

import useConnectWallet from 'hooks/useConnectWallet';

import BtnIcon from '../BtnIcon';

const AvatarBox = styled(Box)<{ active?: boolean }>`
  width: 65px;
  height: 65px;
  margin-right: 16px;
  border-radius: 10px;
  ${props =>
    props.active &&
    css`
      box-shadow: ${({ theme }) =>
        theme.isDark
          ? `0px 0px 9px 5px ${theme.colors.white}`
          : ` 0px 0px 10px 0px ${theme.colors.backgroundPrimary}`};
    `}
`;

const AvatarNft = styled(Image)`
  width: 65px;
  height: 65px;
  border-radius: 10px;
  overflow: hidden;
`;

const RowsEllipsis = styled(Flex)`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Desc = styled(Text)`
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  line-height: 1.4;
`;

const TribeNft: React.FC<{
  tribe_id: number;
  mb: string;
}> = ({ ...props }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { onConnectWallet } = useConnectWallet();
  const tribeInfo = useTribeInfoById(props.tribe_id);
  const { tribe, detail, member_nft } = tribeInfo || {};
  const nowDateUnix = dayjs().unix();

  return (
    <React.Fragment>
      {member_nft?.sender && (
        <Card padding='16px' isRadius {...props}>
          <Flex mb='12px' justifyContent='flex-start'>
            <AvatarBox active={tribeInfo?.status === 4}>
              <AvatarNft
                width={65}
                height={65}
                src={
                  BASE_IMAGE_URL +
                  (detail?.nft_type === TribeBelongNft.Owner
                    ? member_nft?.owner_nft_image
                    : member_nft?.member_nft_image)
                }
              />
            </AvatarBox>
            <Box style={{ width: 'calc(100% - 80px)' }}>
              <RowsEllipsis>
                <Text fontWeight='bold' ellipsis>
                  {detail?.nft_type === TribeBelongNft.Owner
                    ? tribe?.name
                    : member_nft?.member_nft_name}
                </Text>
                <Text ml='6px' color='textTips' ellipsis>
                  {detail?.nft_type === TribeBelongNft.Owner
                    ? '-Tribe Chief NFT'
                    : detail?.nft_id
                    ? `#${detail?.nft_id}`
                    : ''}
                </Text>
              </RowsEllipsis>
              <Desc maxLine={2} color='textTips'>
                {detail?.nft_type === TribeBelongNft.Owner
                  ? member_nft?.owner_nft_introduction
                  : member_nft?.member_nft_introduction}
              </Desc>
            </Box>
          </Flex>

          {!account ? (
            <Flex mb='12px' justifyContent='center'>
              <Button
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  onConnectWallet();
                }}
              >
                {t('Connect Wallet')}
              </Button>
            </Flex>
          ) : (
            <>
              {/* 已经过期处理 */}
              {tribeInfo?.expire === TribeNftStatus.expire ? (
                <>
                  {/* 加入部落 */}
                  {tribeInfo?.status <= NftStatus.UnStake && (
                    <Flex mb='12px' justifyContent='center'>
                      <BtnIcon
                        disabled={!Boolean(tribeInfo?.baseInfo?.feeToken)}
                        name='icon-wodebula'
                        text={t('tribeJoin')}
                        onClick={() => {
                          if (detail?.type === TribeType.BASIC) {
                            dispatch(fetchTribeJoinBasicServiceAsync());
                          }
                          dispatch(storeAction.setJoinTribeVisibleModal(true));
                        }}
                      />
                    </Flex>
                  )}
                  {/* 取消质押 */}
                  {tribeInfo?.status === NftStatus.Staked && (
                    <Flex mb='12px' justifyContent='space-between'>
                      <Flex flexDirection='column' mr='15px'>
                        <Text>{t('ValidityDays')}: </Text>
                        <Text color='textTips'>
                          {detail?.expire_time > 0 &&
                            nowDateUnix >= detail?.expire_time &&
                            t('TribeValidityDaysExpired')}

                          {detail?.expire_time > 0 &&
                            nowDateUnix < detail?.expire_time &&
                            `${dayjs().format('YY-MM-DD')}~${dayjs(
                              detail?.expire_time * 1000,
                            ).format('YY-MM-DD')}`}

                          {detail?.expire_time === 0 && t('ValidityDaysForver')}
                        </Text>
                      </Flex>
                      <UnStakeButton
                        tribeId={props.tribe_id}
                        nftType={detail?.nft_type}
                        callback={() =>
                          dispatch(fetchTribeInfoAsync(props.tribe_id))
                        }
                      />
                    </Flex>
                  )}
                </>
              ) : (
                <>
                  {(tribeInfo?.status === NftStatus.INIT ||
                    tribeInfo?.status === NftStatus.Quit) && (
                    <Flex mb='12px' justifyContent='center'>
                      <BtnIcon
                        disabled={!Boolean(tribeInfo?.baseInfo?.feeToken)}
                        name='icon-wodebula'
                        text={t('tribeJoin')}
                        onClick={() => {
                          if (detail?.type === TribeType.BASIC) {
                            dispatch(fetchTribeJoinBasicServiceAsync());
                          }
                          dispatch(storeAction.setJoinTribeVisibleModal(true));
                        }}
                      />
                    </Flex>
                  )}

                  {/* 质押 */}
                  {(tribeInfo?.status === NftStatus.Received ||
                    tribeInfo?.status === NftStatus.UnStake) && (
                    <Flex mb='12px' justifyContent='space-between'>
                      <Flex flexDirection='column' mr='15px'>
                        <Text>{t('ValidityDays')}:</Text>
                        <Text color='textTips'>
                          {detail?.expire_time > 0
                            ? `${dayjs().format('YY-MM-DD')}~${dayjs(
                                detail?.expire_time * 1000,
                              ).format('YY-MM-DD')}`
                            : t('ValidityDaysForver')}
                        </Text>
                      </Flex>
                      {detail?.nft_id !== 0 && (
                        <StakeButton
                          tribeId={props.tribe_id}
                          nftId={detail.nft_id}
                          nftType={detail?.nft_type}
                          callback={() => {
                            dispatch(fetchTribeInfoAsync(props.tribe_id));
                          }}
                        />
                      )}
                    </Flex>
                  )}

                  {/* 取消质押 */}
                  {tribeInfo?.status === NftStatus.Staked && (
                    <Flex mb='12px' justifyContent='space-between'>
                      <Flex flexDirection='column' mr='15px'>
                        <Text>{t('ValidityDays')}:</Text>
                        <Text color='textTips'>
                          {detail?.expire_time > 0 &&
                            nowDateUnix >= detail?.expire_time &&
                            t('TribeValidityDaysExpired')}

                          {detail?.expire_time > 0 &&
                            nowDateUnix < detail?.expire_time &&
                            `${dayjs().format('YY-MM-DD')}~${dayjs(
                              detail?.expire_time * 1000,
                            ).format('YY-MM-DD')}`}

                          {detail?.expire_time === 0 && t('ValidityDaysForver')}
                        </Text>
                      </Flex>
                      <UnStakeButton
                        tribeId={props.tribe_id}
                        nftType={detail?.nft_type}
                        callback={() =>
                          dispatch(fetchTribeInfoAsync(props.tribe_id))
                        }
                      />
                    </Flex>
                  )}
                </>
              )}
            </>
          )}
        </Card>
      )}
    </React.Fragment>
  );
};

export default TribeNft;
