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
import { SERVICE_TIME_LIMIT, MAX_PER_SPEND_TIME } from 'config';
import InsufficientBalanceModal from './InsufficientBalanceModal'
import { useEstimatedServiceTime, usePlatformTimeBalance } from 'store/wallet/hooks';
import useIm from 'hooks/imHooks/useIm';

export default function TimeLeftUpdater() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation()
  const leftTime = useEstimatedServiceTime()
  const { availableBalance } = usePlatformTimeBalance()
  const { im } = useIm()

  const [visible, setVisible] = useState(false)
  const [prompted, setPrompted] = useState(false)
  const token = useStore(p => p.loginReducer.token);

  useEffect(() => {
    // 剩余时间小于提示时间（5分钟） 并且 余额大于单次最大花费数量, 并且第一次提示, 并且已经登录
    if (leftTime && leftTime < SERVICE_TIME_LIMIT && availableBalance.isGreaterThan(MAX_PER_SPEND_TIME) && !prompted && token) {
      setVisible(true)
      setPrompted(true)
    } else if (leftTime > SERVICE_TIME_LIMIT) {
      setVisible(false)
      setPrompted(false)
    }
  }, [leftTime, availableBalance, token, prompted])

  useEffect(() => {
    if (availableBalance.isGreaterThanOrEqualTo(MAX_PER_SPEND_TIME) && im) {
      im.removeSuspendTpl(im.messageProtocol.WSProtocol_Spend_Time)
    }
  }, [availableBalance, im])

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
