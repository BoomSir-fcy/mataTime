import { createAction } from '@reduxjs/toolkit';

export const testUpdaeShow = createAction<{show: boolean}>('test/update/show');