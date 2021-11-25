import { createAction } from '@reduxjs/toolkit';

export const updateProfile = createAction<Api.User.userInfoParams>(
  'user/update/profile'
);
