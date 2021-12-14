import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { useHistory, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false)

  // 重置用户信息
  const handleReSetAccount = useCallback(() => {
    if (pathname != '/login') {
      dispatch(storeAction.resetLoginState());
      history.replace('/login');
    }
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
        title={t('Insufficient $time balance')}
        tips={t('Metatime deducts fees based on reading time and needs to recharge in advance before browsing platform information')}
        onConfirmLable={t('Go recharge')}
        onSecondaryLable={t('Logout account')}
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
