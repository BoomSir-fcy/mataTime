import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { useHistory } from 'react-router-dom';
import { ModalWrapper } from 'components'
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { useStore } from 'store';
import eventBus from 'utils/eventBus';
import useAuth from 'hooks/useAuth';
import { SERVICE_TIME_LIMIT } from 'config';
import InsufficientBalanceModal from './InsufficientBalanceModal'
import { useEstimatedServiceTime } from 'store/wallet/hooks';

export default function TimeLeftUpdater() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation()
  const leftTime = useEstimatedServiceTime()

  const [visible, setVisible] = useState(false)
  const [prompted, setPrompted] = useState(false)
  const token = useStore(p => p.loginReducer.token);

  useEffect(() => {
    // 剩余时间小于提示时间（5分钟） 并且 剩余时间不为0, 并且第一次提示, 并且已经登录
    if (leftTime < SERVICE_TIME_LIMIT && leftTime !== 0 && !prompted && token) {
      setVisible(true)
      setPrompted(true)
    } else if (leftTime > SERVICE_TIME_LIMIT) {
      setVisible(false)
      setPrompted(false)
    }
  }, [leftTime, token, prompted])

  return (
    <ModalWrapper padding="0" customizeTitle visible={visible} >
      <InsufficientBalanceModal
        title={t('$time balance less than 5 minutes')}
        tips={t('Metatime deducts fees based on reading time and needs to recharge in advance before browsing platform information')}
        onConfirmLable={t('Go recharge')}
        onSecondaryLable={t('I see!')}
        onConfirm={() => {
          setVisible(false)
          history.push('/account');
          // history.push('/faucet-smart');
        }}
        onSecondary={() => {
          setVisible(false)
        }}
      />
    </ModalWrapper>
  );
}
