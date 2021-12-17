import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction } from 'store';
import useAuth from 'hooks/useAuth';

export default function AccountUpdater() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logout } = useAuth();

  const [accountFlag, setAccountFlag] = useState('');
  const { account } = useWeb3React();
  const { pathname } = useLocation();

  // 重置用户信息
  const handleReSetAccount = useCallback(() => {
    // if (pathname !== '/login') {
    // }
    dispatch(storeAction.resetLoginState());
    history.replace('/login');
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
  }, [account, handleReSetAccount, accountFlag]);
  return null;
}
