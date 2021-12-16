import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Spinner } from 'uikit';
import { WalletHead as Header } from 'components/HeaderContent';
import { useTranslation } from 'contexts/Localization';
import { Group } from './type';
import { useFetchTask, useTask } from 'store/task/hooks';
import TaskContent from './TaskContent';
import useMenuNav from 'hooks/useMenuNav';

const ScrollBox = styled(Box)`
`;

const TipsFlex = styled(Box)`
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`

const Time = styled.img`
  max-width: 19px;
  max-height: 21px;
  display: inline-block;
  margin-right: 8px;
`;

const BgBox = styled(Box)`
  height: auto;
  background: ${({ theme }) => theme.colors.primaryDark};
`

const Task: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useMenuNav();
  const [taskGroup, setTaskGroup] = useState({});

  useFetchTask();
  const { taskList } = useTask();
  const { data, dataLoaded } = taskList;

  // 任务分组结果为对象
  const groupByTask = (list = [], field) => {
    let result = { 'default': [] };
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
  }

  // 任务分组结果为数组
  const ItemGroupBy = (list = [], field) => {
    let result = [], types = {};
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
  }

  useEffect(() => {
    const result = groupByTask(data, 'task_group');
    result[Group.ACTIVITY]?.unshift(result['default'][0]);
    // const result = ItemGroupBy(data, 'task_group');
    setTaskGroup(result);
  }, [data])

  return (
    <>
      {!dataLoaded ? (
        <Flex height="100vh" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      ) : (
        <BgBox>
          <Header title={t('EasyTaskEarn$Matter')}>
            {!isMobile && <HeaderTips t={t} />}
          </Header>
          {/* <TaskHeader>
            <Text mr="50px" fontSize="18px" bold>
              {t('EasyTaskEarn$Matter')}
            </Text>
            {!isMobile && <HeaderTips t={t} />}
          </TaskHeader> */}
          <ScrollBox>
            {isMobile && <TipsFlex><HeaderTips t={t} /></TipsFlex>}
            {/* {
              taskGroup.map(item => <TaskContent key={item.type} taskGroupId={item.type} taskList={item.data} />)
            } */}
            <TaskContent taskGroupId={Group.ACTIVITY} taskList={taskGroup[Group.ACTIVITY]} />
            <TaskContent taskGroupId={Group.CREATE} taskList={taskGroup[Group.CREATE]} />
            <TaskContent taskGroupId={Group.INVITE} taskList={taskGroup[Group.INVITE]} />
            <TaskContent taskGroupId={Group.REPORT} taskList={taskGroup[Group.REPORT]} />
          </ScrollBox>
        </BgBox>
      )}
    </>
  );
};


const HeaderTips = ({ t }) => {
  return (
    <Flex alignItems="center">
      <Time src={require('assets/images/myWallet/time.png').default} alt="" />
      <Text small color="textTips">{t('Note that all tasks are refreshed at 0:00 UTC. Please get your $Matter before 0:00 UTC!')}</Text>
    </Flex>
  );
}

export default Task;
