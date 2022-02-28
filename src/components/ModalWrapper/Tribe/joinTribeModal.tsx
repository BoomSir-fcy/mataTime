import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { useImmer } from 'use-immer';
import { useDispatch } from 'react-redux';
import { ModalWrapper } from 'components';
import { Box, Button, Flex, Text } from 'uikit';
import { useToast } from 'hooks';
import { useStore } from 'store';
import { fetchisApprove } from 'store/tribe';
import { TribeInfo, TribeBaseInfo } from 'store/tribe/type';
import { ApproveToken } from 'store/tribe/fetchTribe';
import { useJoinTribe } from './hooks';

import { useTranslation } from 'contexts/Localization';

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

export const JoinTribeModal: React.FC<{
  visible: boolean;
  tribeInfo: TribeInfo;
  tribeBaseInfo: TribeBaseInfo;
  onClose: () => void;
}> = React.memo(({ visible, tribeInfo, tribeBaseInfo, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const { handleApprove } = ApproveToken(tribeBaseInfo.feeToken);
  const { joinTribe } = useJoinTribe();
  const { account } = useActiveWeb3React();
  const tribeId = useStore(p => p.tribe.tribeId);
  const joinTribeInfo = useStore(p => p.tribe.joinTribe);
  const [state, setState] = useImmer({
    loading: false,
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

  const handleJoinTribe = React.useCallback(async () => {
    const res = await joinTribe(tribeId);
    console.log(res);
  }, [joinTribe]);

  console.log(joinTribeInfo.approveLimit);
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
                  {joinTribeInfo.basicServiceCharge} MATTER
                </Text>
              </Flex>
              <Flex justifyContent='space-between' alignItems='center'>
                <Text color='textTips'>Validity Date</Text>
                <Text fontSize='16px'>Forever </Text>
              </Flex>
            </MaskInfo>
            <Text mt='10px'>* The MATTER will be destroyed</Text>
            <Flex mt='20px' justifyContent='center'>
              {joinTribeInfo.approveLimit > 0 ? (
                <Button onClick={() => handleJoinTribe()}>Confirm</Button>
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
          </React.Fragment>
        )}
      </Container>
    </ModalWrapper>
  );
});
