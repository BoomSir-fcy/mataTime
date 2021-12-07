import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button } from 'uikit';
import DayTask from './DayTask';
import { TaskTitle } from './StyledTask';


const TaskCountBox = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 95px;
  padding: 0 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  .left{
    border-radius: 10px 0 0 10px;
    background: ${({ theme }) => theme.colors.tertiary};
  }
  .right{
    border-radius: 0 10px 10px 0;
    background: ${({ theme }) => theme.colors.backgroundTextArea};
  }
`

const TaskCount = ({ left, right }) => {
  return (
    <Box mr="50px">
      <Button className="left" >{left}</Button>
      <Button className="right" >{right}</Button>
    </Box>
  )
}
const Task = () => {
  return (
    <Box>
      <TaskTitle><Text fontSize="18px" bold>轻松任务，赚取$Matter</Text></TaskTitle>
      <Box>
        <TaskCountBox>
          <Flex justifyContent="space-between">
            <TaskCount left="当日任务" right="2/10" />
            <TaskCount left="当周任务" right="2/10" />
            <TaskCount left="成就任务" right="2/10" />
          </Flex>
          <Button>收益记录</Button>
        </TaskCountBox>
        <DayTask />
      </Box>
    </Box>
  );
};

export default Task;
