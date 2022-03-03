import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import ReactLoading from 'react-loading';
import BigNumber from 'bignumber.js';
import { useImmer } from 'use-immer';
import { useDispatch } from 'react-redux';
import { ModalWrapper } from 'components';
import { Box, Button, Flex, Text, Input } from 'uikit';
import { useToast } from 'hooks';
import { useStore } from 'store';
import { fetchisApprove } from 'store/tribe';
import { TribeInfo, TribeBaseInfo } from 'store/tribe/type';
import { ApproveToken } from 'store/tribe/fetchTribe';
import { useJoinTribe } from './hooks';
import { getBalanceNumber } from 'utils/formatBalance';

import { useTranslation } from 'contexts';

import useActiveWeb3React from 'hooks/useActiveWeb3React';

import QuestionHelper from 'components/QuestionHelper';
import Dots from 'components/Loader/Dots';

const Container = styled(Box)`
  width: 410px;
  padding-bottom: 20px;
`;

const MaskInfo = styled(Box)`
  background-color: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 18px 13px;
`;

const InputStyle = styled(Input)`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.white_black};
  box-shadow: none;
`;

export const JoinTribeModal: React.FC<{
  visible: boolean;
  tribeInfo: TribeInfo;
  tribeBaseInfo: TribeBaseInfo;
  onClose: (event?: boolean) => void;
}> = React.memo(({ visible, tribeInfo, tribeBaseInfo, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const { handleApprove } = ApproveToken(tribeBaseInfo.feeToken);
  const { joinTribe } = useJoinTribe();
  const { account } = useActiveWeb3React();
  const tribeDetails = useStore(p => p.tribe.tribeDetails);
  const joinTribeInfo = useStore(p => p.tribe.joinTribe);
  const [state, setState] = useImmer({
    loading: false,
    submitLoading: false,
    next: 1,
    inviteAddress: '',
  });

  const changeApprove = React.useCallback(async () => {
    try {
      setState(p => {
        p.loading = true;
      });
      const res = await handleApprove();
      if (Boolean(res)) {
        dispatch(
          fetchisApprove({
            account,
            address: tribeBaseInfo.feeToken,
          }),
        );
      } else {
        toastError(t('setNftAuthorizationFail'));
      }
    } finally {
      setState(p => {
        p.loading = false;
      });
    }
  }, [handleApprove]);

  const handleChange = React.useCallback(e => {
    if (e.currentTarget.validity.valid) {
      setState(p => {
        p.inviteAddress = e.currentTarget.value;
      });
    }
  }, []);

  // 加入部落
  const handleJoinTribe = React.useCallback(async () => {
    const inviteAddress = Boolean(state.inviteAddress)
      ? state.inviteAddress
      : '0x0000000000000000000000000000000000000000';
    const joinServiceFee = tribeDetails.type === 2 ? tribeDetails.charge : '';
    try {
      setState(p => {
        p.submitLoading = true;
      });
      const res = await joinTribe(
        tribeDetails.tribe_id,
        inviteAddress,
        joinServiceFee,
      );
      if (res === 1) {
        toastSuccess('Join Successfully');
        onClose(true);
      } else if (res === 400001) {
        toastError(t('rewardAutherTransferAmountExceedsBlanceError'));
      } else {
        toastError('Failed to join');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setState(p => {
        p.submitLoading = false;
      });
    }
  }, [state, joinTribe, tribeDetails]);

  return (
    <ModalWrapper
      title={`Join "${tribeInfo?.tribe?.name}"`}
      visible={visible}
      setVisible={onClose}
    >
      <Container>
        {joinTribeInfo.loading ? (
          <ReactLoading type={'cylon'} />
        ) : (
          <React.Fragment>
            <MaskInfo>
              <Flex
                justifyContent='space-between'
                alignItems='center'
                mb='18px'
              >
                <Flex>
                  <Text color='textTips'>Fees to join a basic tribe</Text>
                  <QuestionHelper
                    ml='15px'
                    mt='4px'
                    color='white_black'
                    text={
                      'Based on the MATTER circulating supply and METATIME DAU'
                    }
                    placement='auto'
                  />
                </Flex>
                <Text fontSize='16px'>
                  {tribeDetails.type === 1
                    ? joinTribeInfo.basicServiceCharge
                    : getBalanceNumber(new BigNumber(tribeDetails.charge), 18)}
                  {tribeDetails.symbol}
                </Text>
              </Flex>
              <Flex justifyContent='space-between' alignItems='center'>
                <Text color='textTips'>Validity Date</Text>
                <Text fontSize='16px'>
                  {tribeDetails.valid_time > 0
                    ? `${dayjs().format('YYYY-MM-DD')} ~ ${dayjs()
                        .add(tribeDetails.valid_time / 60 / 60 / 24, 'day')
                        .format('YYYY-MM-DD')}`
                    : t('ValidityDaysForver')}
                </Text>
              </Flex>
            </MaskInfo>
            {state.next === 2 && (
              <MaskInfo mt='17px'>
                <Flex
                  justifyContent='space-between'
                  alignItems='center'
                  mb='18px'
                >
                  <Text color='textTips'>TIME Burned</Text>
                  <Text fontSize='16px'>{tribeDetails.spend_time} TIME/s</Text>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Text color='textTips'>MAX TIME Burned/Post</Text>
                  <Text fontSize='16px'>
                    {tribeDetails.spend_max_time} TIME/Post
                  </Text>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Text color='textTips'>
                    TIME Reward Distribution for Content Producers
                  </Text>
                </Flex>
                <Flex flexDirection='column'>
                  <Text fontSize='16px'>
                    Tribe Host: {tribeDetails.reward_master}%
                  </Text>
                  <Text fontSize='16px'>
                    Poster: {tribeDetails.reward_author}%
                  </Text>
                  <Text fontSize='16px'>
                    Members: {tribeDetails.reward_member}%
                  </Text>
                </Flex>
              </MaskInfo>
            )}
            {state.next === 2 && tribeDetails.type === 2 && (
              <MaskInfo mt='17px'>
                <Flex alignItems='center'>
                  <Text mr='10px'>邀请钱包地址</Text>
                  <InputStyle onChange={handleChange} placeholder='选填' />
                </Flex>
              </MaskInfo>
            )}
            {state.next === 1 && (
              <>
                <Text mt='10px'>* The MATTER will be destroyed</Text>
                <Flex mt='20px' justifyContent='center'>
                  <Button
                    onClick={() =>
                      setState(p => {
                        p.next = 2;
                      })
                    }
                  >
                    Confirm
                  </Button>
                </Flex>
              </>
            )}
            {state.next === 2 && (
              <Flex mt='20px' justifyContent='center'>
                {joinTribeInfo.approveLimit > 0 ? (
                  <Button onClick={() => handleJoinTribe()}>
                    {state.submitLoading ? <Dots>Confirm</Dots> : 'Confirm'}
                  </Button>
                ) : (
                  <Button onClick={changeApprove}>
                    {state.loading ? (
                      <Dots>{t('Account Approve')}</Dots>
                    ) : (
                      `${t('Account Approve')}`
                    )}
                  </Button>
                )}
              </Flex>
            )}
          </React.Fragment>
        )}
      </Container>
    </ModalWrapper>
  );
});
