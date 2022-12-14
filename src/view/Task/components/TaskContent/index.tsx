import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Spinner } from 'uikit';
import { Group } from '../../type';
import { useFetchTask, useTask } from 'store/task/hooks';
import TaskContent from './TaskContent';
import Header from '../Header';

const ScrollBox = styled(Box)``;

const Task: React.FC = () => {
  const [taskGroup, setTaskGroup] = useState({});

  useFetchTask();
  const { taskList } = useTask();
  const { data, dataLoaded } = taskList;

  // 任务分组结果为对象
  const groupByTask = (list = [], field) => {
    let result = { default: [] };
    list.forEach(item => {
      const group = item[field];
      if (group) {
        if (!result[group]) result[group] = [];
        result[group].push(item);
      } else {
        result['default'].push(item);
      }
    });
    return result;
  };

  // 任务分组结果为数组
  const ItemGroupBy = (list = [], field) => {
    let result = [],
      types = {};
    for (let i = 0; i < list.length; i++) {
      const cur = list[i];
      if (cur[field] === 0) {
        if (!(1 in types)) {
          types[1] = { type: 1, data: [] };
          result.push(types[1]);
        }
        types[1].data.push(cur);
      } else {
        if (!(cur[field] in types)) {
          types[cur[field]] = { type: cur[field], data: [] };
          result.push(types[cur[field]]);
        }
        types[cur[field]].data.push(cur);
      }
    }
    return result;
  };

  useEffect(() => {
    if (data.length) {
      const result = groupByTask(data, 'task_group');
      if (!result[Group.ACTIVITY]) result[Group.ACTIVITY] = [];
      result[Group.ACTIVITY]?.unshift(result['default'][0]);
      setTaskGroup(result);
    }
  }, [data]);

  return (
    <>
      {!dataLoaded ? (
        <Flex height='100vh' justifyContent='center' alignItems='center'>
          <Spinner />
        </Flex>
      ) : (
        <Box>
          <Header />
          <ScrollBox>
            <TaskContent
              taskGroupId={Group.ACTIVITY}
              taskList={taskGroup[Group.ACTIVITY]}
            />
            <TaskContent
              taskGroupId={Group.CREATE}
              taskList={taskGroup[Group.CREATE]}
            />
            <TaskContent
              taskGroupId={Group.INVITE}
              taskList={taskGroup[Group.INVITE]}
            />
            <TaskContent
              taskGroupId={Group.REPORT}
              taskList={taskGroup[Group.REPORT]}
            />
          </ScrollBox>
        </Box>
      )}
    </>
  );
};

export default Task;
