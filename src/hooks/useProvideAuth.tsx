import { storage } from 'config';

export const useProvideAuth = () => {

  const userInfo = window.localStorage.getItem(storage.UserInfo);
  const userData = userInfo ? JSON.parse(userInfo) : {};

  return {
    ...userData
  };
}