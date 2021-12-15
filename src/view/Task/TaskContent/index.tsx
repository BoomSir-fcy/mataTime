import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Image, Heading, Progress, Button } from 'uikit';
import { GetTaskTag } from '../hooks/matter';
import { TaskInfo, Variant } from '../type';
import StyledTag from './StyledTag';
import TaskItem from './TaskItem';

const TaskTitle = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  cursor: pointer;
`
const CollapseIcon = styled.img<{ collapse: boolean }>`
  max-width: 18px;
  transition: all 0.3s;
  transform: ${({ collapse }) => collapse ? 'rotate(90deg)' : 'rotate(-90deg)'};
  cursor: pointer;
`
const TaskContentBox = styled(Box) <{ collapse: boolean }>`
  overflow: hidden;
  max-height: ${({ collapse }) => collapse ? 'max-content' : '0px'};
  transition: all 1s ease-in-out;
`
const RewardsText = styled(Text)`
  margin-right: 30px;
  ${({ theme }) => theme.mediaQueries.lg}{
    margin-right: 70px;
  }
`

interface TaskContentProps {
  taskGroupId: number,
  taskList: TaskInfo[]
}

const TaskContent: React.FC<TaskContentProps> = ({ taskGroupId, taskList }) => {
  const [collapse, setCollapse] = useState(true);

  const tag: Variant = GetTaskTag(taskGroupId);
  return (
    <Box>
      <TaskTitle onClick={() => setCollapse(collapse => !collapse)}>
        <StyledTag variant={tag}><Text fontSize="18px" bold>{tag.toUpperCase()}</Text></StyledTag>
        <Flex alignItems="center">
          <RewardsText fontSize="18px" bold>Rewards</RewardsText>
          <CollapseIcon collapse={collapse} src={require('assets/images/task/back.png').default} />
        </Flex>
      </TaskTitle>
      <TaskContentBox collapse={collapse}>
        {taskList?.map(item => <TaskItem key={item.task_id} info={item} />)}
      </TaskContentBox>
    </Box>
  );
}

export default TaskContent;