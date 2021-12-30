import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Box } from 'uikit';
import { useLocation } from 'react-router-dom';
import { TaskPage, TaskInvite } from './components';

const BgBox = styled(Box)`
  height: auto;
  background: ${({ theme }) => theme.colors.background};
`;

const Task: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <BgBox>
      {pathname === '/task' && <TaskPage />}
      {pathname === '/task/invite' && <TaskInvite />}
    </BgBox>
  );
};

export default Task;
