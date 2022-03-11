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
import { TribeType, TribeInfo, TribeBaseInfo } from 'store/tribe/type';

import { ApproveToken } from 'store/tribe/fetchTribe';

import { useTranslation } from 'contexts';
import { useJoinTribe } from './hooks';

import useActiveWeb3React from 'hooks/useActiveWeb3React';

import QuestionHelper from 'components/QuestionHelper';
import Dots from 'components/Loader/Dots';

import { Container, MaskInfo } from './styles';

export const JoinTribeModal: React.FC<{
  visible: boolean;
  tribeInfo: TribeInfo;
  tribeBaseInfo: TribeBaseInfo;
  onClose: (event?: boolean) => void;
}> = React.memo(({ visible, tribeInfo, tribeBaseInfo, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const { handleApprove } = ApproveToken(tribeBaseInfo?.feeToken);
  const { joinTribe } = useJoinTribe();
  const { account } = useActiveWeb3React();
  const joinTribeInfo = useStore(p => p.tribe.joinTribe);
  const { detail, baseInfo } = tribeInfo || {};

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
            address: tribeBaseInfo?.feeToken,
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

  // 加入部落
  const handleJoinTribe = React.useCallback(async () => {
    // 邀请地址
    const inviteAddress = Boolean(state.inviteAddress)
      ? state.inviteAddress
      : '0x0000000000000000000000000000000000000000';
    // BNB传入加入费用
    const joinServiceFee =
      detail?.type === TribeType.PRO &&
      tribeBaseInfo?.feeToken === '0x0000000000000000000000000000000000000001'
        ? detail?.charge
        : '';
    console.log(tribeInfo.tribe_id, inviteAddress, joinServiceFee);
    try {
      setState(p => {
        p.submitLoading = true;
      });
      const res = await joinTribe(
        tribeInfo.tribe_id,
        inviteAddress,
        joinServiceFee,
      );
      if (res === 1) {
        toastSuccess(t('TribeJoinSuccessfully'));
        setTimeout(() => {
          onClose(true);
        }, 5000);
      } else if (res !== 0) {
        toastError(t(`contractCode-${res}`));
      } else {
        toastError(t('TribeJoinFailed'));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setState(p => {
        p.submitLoading = false;
      });
    }
  }, [state, setState, joinTribe, detail]);

  return (
    <ModalWrapper
      title={t('TribeJoinModalTitle', { value: tribeInfo?.tribe?.name || '' })}
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
                  <Text color='textTips'>{t('TribeJoinModalText')}</Text>
                  {detail?.type === TribeType.BASIC && (
                    <QuestionHelper
                      ml='5px'
                      mt='4px'
                      color='white_black'
                      text={t('TribeJoinModalText1')}
                      placement='auto'
                    />
                  )}
                </Flex>
                <Text fontSize='16px'>
                  {detail?.type === TribeType.BASIC
                    ? baseInfo?.serviceCharge
                    : new BigNumber(detail?.charge)
                        .dividedBy(new BigNumber(10).pow(18))
                        .toString()}{' '}
                  {detail?.symbol}
                </Text>
              </Flex>
              <Flex justifyContent='space-between' alignItems='center'>
                <Text color='textTips'>{t('TribeJoinModalValidityDate')}</Text>
                <Text fontSize='16px'>
                  {detail?.valid_time > 0
                    ? `${dayjs().format('YYYY-MM-DD')} ~ ${dayjs()
                        .add(detail?.valid_time / 60 / 60 / 24, 'day')
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
                  <Text color='textTips'>{t('TIMEBurned')}</Text>
                  <Text fontSize='16px'>
                    {t('TIMEBurnedUnit', {
                      value: detail?.spend_time || 0,
                    })}
                  </Text>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Text color='textTips'>{t('TIMEMAXBurned/Post')}</Text>
                  <Text fontSize='16px'>
                    {t('TIMEMAXBurned/PostUnit', {
                      value: detail?.spend_max_time || 0,
                    })}
                  </Text>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Text color='textTips'>{t('TribeJoinModalText2')}</Text>
                </Flex>
                <Flex flexDirection='column'>
                  <Text fontSize='16px'>
                    {t('TIMETribeHost', {
                      value: detail?.reward_master || 0,
                    })}
                  </Text>
                  <Text fontSize='16px'>
                    {t('TIMEPoster', {
                      value: detail?.reward_author || 0,
                    })}
                  </Text>
                  <Text fontSize='16px'>
                    {t('TIMEMembers', {
                      value: detail?.reward_member || 0,
                    })}
                  </Text>
                </Flex>
              </MaskInfo>
            )}
            {state.next === 2 && detail?.type === TribeType.PRO && (
              <Box mt='17px'>
                <Text mb='10px'>{t('TribeJoinModalInviteText')}</Text>
                <Input
                  onChange={event =>
                    setState(p => {
                      p.inviteAddress = event.target.value;
                    })
                  }
                  placeholder={t('TribeJoinModalInviteValue')}
                />
              </Box>
            )}
            {state.next === 1 && (
              <>
                {detail?.type === TribeType.BASIC && (
                  <Text mt='10px'>{t('TribeJoinModalText3')}</Text>
                )}
                <Flex mt='20px' justifyContent='center'>
                  <Button
                    onClick={() =>
                      setState(p => {
                        p.next = 2;
                      })
                    }
                  >
                    {t('TribeJoinModalConfirm')}
                  </Button>
                </Flex>
              </>
            )}
            {state.next === 2 && (
              <Flex mt='20px' justifyContent='center'>
                {joinTribeInfo.approveLimit > 0 ? (
                  <Button onClick={() => handleJoinTribe()}>
                    {state.submitLoading ? (
                      <Dots>{t('TribeJoinModalConfirm')}</Dots>
                    ) : (
                      `${t('TribeJoinModalConfirm')}`
                    )}
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
