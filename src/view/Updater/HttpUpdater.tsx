import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction } from 'store';
import eventBus from 'utils/eventBus';
import useAuth from 'hooks/useAuth';
import { storage } from 'config';

export default function HttpUpdater() {
  const dispatch = useDispatch();
  const history = useHistory();

  // 重置用户信息
  const handleReSetAccount = useCallback(() => {
    // TODO:
    alert('TOKEN 过期')
    dispatch(storeAction.resetLoginState());
    history.replace('/login');
    localStorage.removeItem(storage.Token);
  }, [dispatch, history]);

  const handleInsufficient = useCallback(() => {
    // TODO:
    alert('余额不足')
  }, [])

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
  return null;
}
