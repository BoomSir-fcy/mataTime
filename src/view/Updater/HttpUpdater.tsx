import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { useHistory } from 'react-router-dom';
import { ModalWrapper } from 'components'
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction } from 'store';
import eventBus from 'utils/eventBus';
import useAuth from 'hooks/useAuth';
import { storage } from 'config';
import InsufficientBalanceModal from './InsufficientBalanceModal'

export default function HttpUpdater() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation()

  const [visible, setVisible] = useState(false)

  // 重置用户信息
  const handleReSetAccount = useCallback(() => {
    dispatch(storeAction.resetLoginState());
    history.replace('/login');
  }, [dispatch, history]);

  // 余额不足
  const handleInsufficient = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  useEffect(() => {
    eventBus.addEventListener('unauthorized', handleReSetAccount);
    return () => {
      eventBus.addEventListener('unauthorized', handleReSetAccount);
    }
  }, [handleReSetAccount])

  useEffect(() => {
    eventBus.addEventListener('insufficient', handleInsufficient);
    return () => {
      eventBus.addEventListener('insufficient', handleInsufficient);
    }
  }, [handleInsufficient])
  return (
    <ModalWrapper padding="0" customizeTitle visible={visible} >
      <InsufficientBalanceModal
        title={t('$TIME余额不足')}
        tips={t('Metatime 基于阅读时间扣费，1Time=1秒钟需要提前充值后方可浏览平台信息')}
        onConfirmLable={t('前去充值')}
        onSecondaryLable={t('登出账号')}
        onConfirm={() => {
          setVisible(false)
          history.push('/account');
        }}
        onSecondary={() => {
          setVisible(false)
          handleReSetAccount()
        }}
      />
    </ModalWrapper>
  );
}
