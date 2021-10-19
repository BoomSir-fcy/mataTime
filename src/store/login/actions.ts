import { createAction } from '@reduxjs/toolkit';

export const changeSignUp = createAction<{isSignup: boolean}>('login/changeSignUp');