import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction } from 'store';
import useAuth from 'hooks/useAuth';
import { storage } from 'config';

export default function AccountUpdater() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logout } = useAuth();

  const [accountFlag, setAccountFlag] = useState('');
  const { account } = useWeb3React();

  // 重置用户信息
  const handleReSetAccount = useCallback(() => {
    dispatch(storeAction.resetLoginState());
    history.replace('/login');
    // logout();
  }, [dispatch, history]);

  useEffect(() => {
    if (account && !accountFlag) {
      setAccountFlag(account);
      return;
    }
    if (account && accountFlag && accountFlag !== account) {
      setAccountFlag(account);
      handleReSetAccount();
    }
  }, [account, accountFlag]);
  return null;
}
