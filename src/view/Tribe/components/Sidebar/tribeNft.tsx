import React from 'react';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';
import { useImmer } from 'use-immer';
import { useDispatch } from 'react-redux';
import { Box, Card, Flex, Image, Text, Button } from 'uikit';
import { JoinTribeModal } from 'components';
import { useTranslation } from 'contexts';
import { BASE_IMAGE_URL } from 'config';
import { storeAction, useStore } from 'store';
import {
  fetchTribeJoinBasicServiceAsync,
  fetchTribeDetailAsync,
  fetchTribeInfoAsync,
} from 'store/tribe';
import { TribeType } from 'store/tribe/type';
import { useTribeInfoById, useFetchTribeInfoById } from 'store/mapModule/hooks';

import { StakeButton, UnStakeButton } from 'view/Me/Tribe/components/actionNft';

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
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const { updater } = useFetchTribeInfoById(props.tribe_id);

  const tribeInfo = useTribeInfoById(props.tribe_id);
  const { tribeBaseInfo } = useStore(p => p.tribe);
  const { detail, member_nft } = tribeInfo || {};
  const isOwner = userInfo?.address === tribeInfo?.tribe?.owner_address ? 1 : 2;

  const [state, setState] = useImmer({
    visible: false,
  });

  return (
    <React.Fragment>
      <Card padding='16px' isRadius {...props}>
        <Flex mb='12px' justifyContent='flex-start'>
          <AvatarBox active={tribeInfo?.status === 4}>
            <AvatarNft
              width={65}
              height={65}
              src={BASE_IMAGE_URL + member_nft?.member_nft_image}
            />
          </AvatarBox>
          <Box style={{ width: 'calc(100% - 80px)' }}>
            <RowsEllipsis>
              <Text fontWeight='bold' ellipsis>
                {member_nft?.member_nft_name}
              </Text>
              <Text ml='6px' color='textTips' ellipsis>
                -Tribe Host NFT
              </Text>
            </RowsEllipsis>
            <Desc maxLine={2} color='textTips'>
              {member_nft?.member_nft_introduction}
            </Desc>
          </Box>
        </Flex>
        {tribeInfo?.status === 0 && (
          <Flex mb='12px' justifyContent='center'>
            <Button
              onClick={() => {
                if (detail?.type === TribeType.BASIC) {
                  dispatch(fetchTribeJoinBasicServiceAsync());
                }
                setState(p => {
                  p.visible = true;
                });
              }}
            >
              {t('tribeJoin')}
            </Button>
          </Flex>
        )}
        {/* {tribeInfo?.status !== 0 && (
          <React.Fragment>
            <Flex mb='12px'>
              <Text color='textTips'>#{detail?.nft_id}</Text>
              <Text ml='30px' color='textTips'>
                Validity Date:{' '}
                {`${dayjs().format('YY-MM-DD')}~${dayjs(
                  detail?.expire_time * 1000,
                ).format('YY-MM-DD')}`}
              </Text>
            </Flex>
          </React.Fragment>
        )} */}

        {/* 质押 */}
        {(tribeInfo?.status === 2 || tribeInfo?.status === 3) && (
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
                nftType={isOwner}
                callback={() => {
                  dispatch(
                    storeAction.updateTribeDetails({
                      ...tribeInfo,
                      status: 4,
                    }),
                  );
                }}
              />
            )}
          </Flex>
        )}
        {/* 取消质押 */}
        {tribeInfo?.status === 4 && (
          <Flex mb='12px' justifyContent='space-between'>
            <Flex flexDirection='column' mr='15px'>
              <Text>{t('ValidityDays')}:</Text>
              <Text color='textTips'>
                {detail?.valid_time > 0
                  ? `${dayjs().format('YY-MM-DD')}~${dayjs()
                      .add(detail?.valid_time / 60 / 60 / 24, 'day')
                      .format('YY-MM-DD')}`
                  : t('ValidityDaysForver')}
              </Text>
            </Flex>
            <UnStakeButton
              tribeId={props.tribe_id}
              nftType={isOwner}
              callback={() => {
                dispatch(
                  storeAction.updateTribeDetails({
                    ...tribeInfo,
                    status: 3,
                  }),
                );
              }}
            />
          </Flex>
        )}
      </Card>
      <JoinTribeModal
        visible={state.visible}
        tribeInfo={tribeInfo}
        tribeBaseInfo={tribeBaseInfo}
        onClose={event => {
          setState(p => {
            p.visible = false;
          });
          if (event) {
            dispatch(fetchTribeInfoAsync({ tribe_id: props.tribe_id }));
            dispatch(fetchTribeDetailAsync({ tribe_id: props.tribe_id }));
          }
        }}
      />
    </React.Fragment>
  );
};

export default TribeNft;
