import { useStore } from 'store';
import { storage } from 'config';

export const useProvideAuth = () => {
  const sotreUser = useStore(p => p.loginReducer.userInfo);
  const userInfo = window.localStorage.getItem(storage.UserInfo);
  const userData = sotreUser?.uid ? sotreUser : userInfo ? JSON.parse(userInfo) : {};

  return {
    ...userData
  };
};
