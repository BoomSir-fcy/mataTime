import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Image, Heading, Progress, Button } from 'uikit';
import { GetTaskTag } from '../hooks/matter';
import { TaskInfo } from '../type';
import StyledTag from './StyledTag';
import TaskItem from './TaskItem';

const TaskTitle = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`
const CollapseIcon = styled.img<{ collapse: boolean }>`
  max-width: 18px;
  transform: ${({ collapse }) => collapse ? 'rotate(90deg)' : 'rotate(-90deg)'};
  cursor: pointer;
`
const TaskContentBox = styled(Box) <{ collapse: boolean }>`
  overflow: hidden;
  max-height: ${({ collapse }) => collapse ? 'max-content' : '0em'};
  transition: all 1s;
`

interface TaskContentProps {
  taskGroupId: number,
  taskList: TaskInfo[]
}

const TaskContent: React.FC<TaskContentProps> = ({ taskGroupId, taskList }) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <Box>
      <TaskTitle>
        <StyledTag variant="activity"><Text fontSize="18px" bold>{GetTaskTag(taskGroupId)}</Text></StyledTag>
        <Flex alignItems="center">
          <Text mr="70px" fontSize="18px" bold>Rewards</Text>
          <CollapseIcon collapse={collapse} src={require('assets/images/task/back.png').default} onClick={() => setCollapse(collapse => !collapse)} />
        </Flex>
      </TaskTitle>
      <TaskContentBox collapse={collapse}>
        {taskList.map(item => <TaskItem key={item.task_id} info={item} />)}
      </TaskContentBox>
    </Box>
  );
}

export default TaskContent;