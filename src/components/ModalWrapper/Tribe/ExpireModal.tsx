import React, { useEffect, useState } from 'react';
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
import { JoinTribeModal } from '.';
import { setOrGetTribeExpireToasted } from 'utils/utils';

export const ExpireModal: React.FC<{
  tribeInfo: TribeInfo;
  tribeBaseInfo: TribeBaseInfo;
}> = React.memo(({ tribeInfo, tribeBaseInfo }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();

  const [visible, setVisible] = useState(false);
  const [visibleTips, setVisibleTips] = useState(false);
  const [visibleJoin, setVisibleJoin] = useState(false);

  // const [toasted, setToasted] = useState(setOrGetTribeExpireToasted());

  useEffect(() => {
    console.log(tribeInfo);
    const toasted = setOrGetTribeExpireToasted(tribeInfo?.tribe_id);
    if (tribeInfo?.expire && !toasted) {
      setVisible(true);
      setOrGetTribeExpireToasted(tribeInfo?.tribe_id, 1);
      // setToasted(1);
    }
  }, [tribeInfo]);

  return (
    <>
      {visibleJoin && (
        <JoinTribeModal
          visible={visibleJoin}
          tribeInfo={tribeInfo}
          tribeBaseInfo={tribeBaseInfo}
          onClose={function (event?: boolean): void {
            setVisibleJoin(false);
            setVisibleTips(true);
          }}
        />
      )}
      <ModalWrapper
        // title={t('')}
        visible={visible}
        setVisible={setVisible}
      >
        <Box width='320px'>
          <Text>
            {t(
              'Your "%name%" member NFT has expired. Do you want to join again?',
              { name: tribeInfo?.tribe?.name || '' },
            )}
          </Text>
          <Text fontSize='14px' color='textTips'>
            {t(
              'If you add a new NFT pledge again, you need to cancel the pledge of the original expired NFT.',
            )}
          </Text>
          <Flex justifyContent='space-around' mt='16px'>
            <Button
              onClick={() => {
                setVisible(false);
              }}
              variant='secondary'
            >
              {t('Cancel')}
            </Button>
            <Button
              onClick={() => {
                setVisibleJoin(true);
              }}
            >
              {t('tribeJoin')}
            </Button>
          </Flex>
        </Box>
      </ModalWrapper>
      <ModalWrapper
        // title={t('')}
        visible={visibleTips}
        setVisible={value => {
          setVisible(value);
          setVisibleTips(value);
        }}
      >
        <Box width='320px'>
          <Text>
            {t(
              'You need to cancel the pledge of the expired NFT before you can pledge the new NFT!',
            )}
          </Text>
          <Flex justifyContent='space-around' mt='16px'>
            <Button
              onClick={() => {
                setVisible(false);
                setVisibleTips(false);
              }}
              variant='secondary'
            >
              {t('OK')}
            </Button>
          </Flex>
        </Box>
      </ModalWrapper>
    </>
  );
});
