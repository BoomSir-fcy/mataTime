import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction, useStore } from 'store';
import useAuth from 'hooks/useAuth';
import useIm from 'hooks/imHooks/useIm';

export default function AccountUpdater() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logout } = useAuth();
  const [accountFlag, setAccountFlag] = useState('');
  const { account } = useWeb3React();
  const { pathname } = useLocation();
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const { im } = useIm()

  // 重置用户信息
  const handleReSetAccount = useCallback(() => {
    // if (pathname !== '/login') {
    // }
    dispatch(storeAction.resetLoginState());
    history.replace('/login');
    if (im) {
      im.close(true)
    }
  }, [dispatch, history]);

  useEffect(() => {
    // 如果钱包地址不一样退出
    if (
      userInfo.address &&
      account &&
      account?.toLowerCase() !== userInfo.address
    ) {
      console.log(account.toLowerCase(), 23232, userInfo.address);
      handleReSetAccount();
    }
  }, [account, userInfo]);

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
