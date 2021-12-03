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
    // TODO:
    dispatch(storeAction.resetLoginState());
    history.replace('/login');
    localStorage.removeItem(storage.Token);
  }, [dispatch, history]);

  const handleInsufficient = useCallback(() => {
    // TODO:
    // alert('余额不足')
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
  if (visible) return (
    <ModalWrapper padding="0" customizeTitle creactOnUse visible={visible} >
      <InsufficientBalanceModal
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
  )
  return null;
}
