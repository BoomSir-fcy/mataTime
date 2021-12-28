import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { useHistory, useLocation } from 'react-router-dom';
import { ModalWrapper } from 'components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction } from 'store';
import eventBus from 'utils/eventBus';
import useAuth from 'hooks/useAuth';
import { MAX_PER_SPEND_TIME, storage } from 'config';
import InsufficientBalanceModal from './InsufficientBalanceModal';
import { usePlatformTimeBalance } from 'store/wallet/hooks';
import useHttpError from 'hooks/useHttpError';

export default function HttpUpdater() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const { availableBalance } = usePlatformTimeBalance();
  const httpErrorToast = useHttpError();

  // 重置用户信息
  const handleReSetAccount = useCallback(() => {
    if (pathname !== '/login') {
      dispatch(storeAction.resetLoginState());
      history.replace('/login');
    }
  }, [dispatch, pathname, history]);

  // 余额不足
  const handleInsufficient = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  // http 错误码提示
  const handleHttpError = useCallback(
    error => {
      httpErrorToast(error.data);
    },
    [setVisible],
  );

  useEffect(() => {
    eventBus.addEventListener('unauthorized', handleReSetAccount);
    return () => {
      eventBus.removeEventListener('unauthorized', handleReSetAccount);
    };
  }, [handleReSetAccount]);

  useEffect(() => {
    eventBus.addEventListener('insufficient', handleInsufficient);
    return () => {
      eventBus.removeEventListener('insufficient', handleInsufficient);
    };
  }, [handleInsufficient]);

  useEffect(() => {
    eventBus.addEventListener('httpError', handleHttpError);
    return () => {
      eventBus.removeEventListener('httpError', handleHttpError);
    };
  }, [handleHttpError]);

  useEffect(() => {
    if (availableBalance.isGreaterThanOrEqualTo(MAX_PER_SPEND_TIME)) {
      setVisible(false);
    }
  }, [availableBalance]);

  return (
    <ModalWrapper padding='0' customizeTitle visible={visible}>
      <InsufficientBalanceModal
        title={t('Insufficient $TIME balance')}
        tips={t(
          'Metatime deducts fees based on reading time and needs to recharge in advance before browsing platform information',
        )}
        onConfirmLable={t('Go recharge')}
        onSecondaryLable={t('Logout account')}
        onConfirm={() => {
          setVisible(false);
          history.push('/account');
        }}
        onSecondary={() => {
          setVisible(false);
          handleReSetAccount();
        }}
      />
    </ModalWrapper>
  );
}
