import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button, Spinner, Empty } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import CountdownTime from './Countdown';
import { useTranslation } from 'contexts/Localization';
import MissionCard from './MissionCard';
import { Status } from './type';
import { Link } from 'react-router-dom';
import { useFetchTask, useTask } from 'store/task/hooks';
import TaskContent from './TaskContent';
import { partition } from 'lodash';

const ScrollBox = styled(Box)`
  height: calc(100vh - 153px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TaskHeader = styled(Flex)`
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 57px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${mediaQueriesSize.paddingxs}
`;


const Time = styled.img`
  width: 18px;
  display: inline-block;
  margin-right: 8px;
`;

const BgBox = styled(Box)`
  background: ${({ theme }) => theme.colors.primaryDark};
`

const Task: React.FC = () => {
  const { t } = useTranslation();

  // useFetchTask();
  // const { taskList } = useTask();
  // const { data, dataLoaded } = taskList;

  const data = [{
    Expand: null,
    end_time: 1639486740,
    matter: 1,
    now_time: 1639483307,
    status: 2,
    task_id: 1252227241,
    task_name: "SignIn",
    task_name_id: 1,
    task_type: 1,
    task_group_id: 1
  },
  {
    Expand: { now: 3, max: 5 },
    end_time: 1639486740,
    matter: 3,
    now_time: 1639483307,
    status: 1,
    task_id: 752338066,
    task_name: "ConsumeTime300",
    task_name_id: 15,
    task_type: 1,
    task_group_id: 1
  },
  {
    Expand: { now: 2, max: 5 },
    end_time: 1639486740,
    matter: 3,
    now_time: 1639483307,
    status: 1,
    task_id: 357511692,
    task_name: "ConsumeTime600",
    task_name_id: 16,
    task_type: 1,
    task_group_id: 1
  },
  {
    Expand: { now: 5, max: 10 },
    end_time: 1639486740,
    matter: 3,
    now_time: 1639483307,
    status: 1,
    task_id: 2496806558,
    task_name: "ReportOne",
    task_name_id: 10,
    task_type: 1,
    task_group_id: 2
  },
  {
    Expand: { now: 2, max: 10 },
    end_time: 1639486740,
    matter: 3,
    now_time: 1639483307,
    status: 1,
    task_id: 3573889365,
    task_name: "ReportTwo",
    task_name_id: 11,
    task_type: 1,
    task_group_id: 2
  }
  ]

  const groupByTask = (list) => {
    const obj = {};

  }

  const dataLoaded = true;
  return (
    <>
      {!dataLoaded ? (
        <Flex height="100vh" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      ) : (
        <BgBox>
          <TaskHeader>
            <Text mr="50px" fontSize="18px" bold>
              {t('EasyTaskEarn$Matter')}
            </Text>
            <Flex>
              <Time src={require('assets/images/myWallet/time.png').default} alt="" />
              <Text>注意，所有任务健在UTC时间0点刷新， 请在UTC 0点前领取您的$Matter！</Text>
            </Flex>
          </TaskHeader>
          <TaskContent taskGroupId={1} taskList={data} />
        </BgBox>
      )}
    </>
  );
};

export default Task;
