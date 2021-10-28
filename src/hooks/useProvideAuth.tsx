import React from 'react';
import { useStore } from 'store';

export const useProvideAuth = () => {
  const { userInfo } = useStore(p => p.loginReducer);

  return {
    userInfo
  };
}