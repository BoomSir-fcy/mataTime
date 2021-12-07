import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button } from 'uikit';
import { TaskTitle } from './StyledTask';

const DayTask = () => {
  return (
    <Box>
      <TaskTitle>
        <Flex alignItems="center">
          <Text mr="43px" fontSize="18px" bold>每日任务 ( 0 / 10)</Text>
          <Text mr="12px" fontSize="14px" color="textTips">刷新时间倒计时：8h 23m 15s</Text>
        </Flex>
      </TaskTitle>
    </Box>
  );
};

export default DayTask;
