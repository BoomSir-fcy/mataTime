import { Icon } from 'components';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'uikit';
import { GetTaskTag } from '../../hooks/matter';
import { TaskInfo, Variant, TaskContentProps } from '../../type';
import StyledTag from './StyledTag';
import TaskItem from './TaskItem';
import { useTranslation } from 'contexts/Localization';

const TaskTitle = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  cursor: pointer;
`;
const CollapseIcon = styled(Icon)<{ collapse: boolean }>`
  max-width: 18px;
  transition: all 0.3s;
  transform: ${({ collapse }) =>
    collapse ? 'rotate(90deg)' : 'rotate(-90deg)'};
  cursor: pointer;
`;
const TaskContentBox = styled(Box)<{ collapse: boolean }>`
  overflow: hidden;
  max-height: ${({ collapse }) => (collapse ? 'max-content' : '0px')};
  transition: all 1s ease-in-out;
`;
const RewardsText = styled(Text)`
  margin-right: 30px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 70px;
  }
`;

const TaskContent: React.FC<TaskContentProps> = React.memo(
  ({ taskGroupId, taskList }) => {
    const { t } = useTranslation();
    const [collapse, setCollapse] = useState(true);

    const tag: Variant = useMemo(() => GetTaskTag(taskGroupId), [taskGroupId]);
    return (
      <Box>
        <TaskTitle onClick={() => setCollapse(collapse => !collapse)}>
          <StyledTag variant={tag}>
            <Text color='primaryBright' fontSize='18px' bold>
              {t(`Task ${tag}`).toUpperCase()}
            </Text>
          </StyledTag>
          <Flex alignItems='center'>
            <RewardsText fontSize='18px' bold>
              {t('Task Rewards')}
            </RewardsText>
            <CollapseIcon
              name='icon-fanhui1'
              collapse={collapse}
              size={18}
              color='white_black'
              // src={require('assets/images/task/back.png').default}
            />
          </Flex>
        </TaskTitle>
        <TaskContentBox collapse={collapse}>
          {taskList?.length &&
            taskList.map(item => (
              <TaskItem
                key={item.task_id}
                info={item}
                taskGroupId={taskGroupId}
              />
            ))}
        </TaskContentBox>
      </Box>
    );
  },
);

export default TaskContent;
