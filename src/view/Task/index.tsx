import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import CountdownTime from './Countdown';
import MissionCard from './MissionCard';

const TaskTitle = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 57px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${mediaQueriesSize.paddingxs}
`

const LeftFlex = styled(Flex)`
  justify-content: start;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  padding: 23px 14px 55px 14px;
  &>:not(:nth-child(3)){
    margin-right: 12px;
  }
`
const Time = styled.img`
  width: 18px;
  display: inline-block;
`

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


interface MatterInfo {
  Balance?: number
  TokenAddr: string
  BalanceInfo: Api.Account.Balance
}

const Task: React.FC<MatterInfo> = () => {
  const endTime = 1638979200;
  const TaskList = [{
    taskID: 11,
    nowTime: 1635758812,
    endTime: 1638870125,
    taskStatus: 1,
    points: 100,
    taskType: 1,
    taskName: 'SignIn1',
    continuous: { now: 2, max: 3 }
  },
  {
    taskID: 2,
    nowTime: 1635758812,
    endTime: 1638956525,
    taskStatus: 2,
    points: 100,
    taskType: 1,
    taskName: 'SignIn2',
    continuous: { now: 2, max: 3 }
  },
  {
    taskID: 3,
    nowTime: 1635758812,
    endTime: 1638956525,
    taskStatus: 3,
    points: 100,
    taskType: 1,
    taskName: 'SignIn3',
    continuous: { now: 2, max: 3 }
  },
  {
    taskID: 4,
    nowTime: 1635758812,
    endTime: 1638956525,
    taskStatus: 1,
    points: 100,
    taskType: 1,
    taskName: 'SignIn4',
    continuous: { now: 2, max: 3 }
  }, {
    taskID: 5,
    nowTime: 1635758812,
    endTime: 1638956525,
    taskStatus: 1,
    points: 100,
    taskType: 2,
    taskName: 'SignIn',
    continuous: { now: 2, max: 3 }
  }, {
    taskID: 6,
    nowTime: 1635758812,
    endTime: 1638956525,
    taskStatus: 1,
    points: 100,
    taskType: 3,
    taskName: 'SignIn',
    continuous: { now: 2, max: 10 }
  }
  ];

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
        <TaskTitle>
          <Flex alignItems="center">
            <Text mr="43px" fontSize="18px" bold>每日任务 (0 / 10)</Text>
            <Flex mr="12px">
              <Text fontSize="14px" color="textTips">刷新时间倒计时：</Text>
              {/* <CountdownTime endTime={endTime} /> */}
            </Flex>
            <Time src={require('assets/images/myWallet/time.png').default} alt="" />
          </Flex>
        </TaskTitle>
        <LeftFlex>
          {
            TaskList.filter(v => v.taskType === 1).map(item => <MissionCard key={item.taskID} info={item} />)
          }
        </LeftFlex>
        <TaskTitle>
          <Flex alignItems="center">
            <Text mr="43px" fontSize="18px" bold>每周任务 (0 / 10)</Text>
            <Text mr="12px" fontSize="14px" color="textTips">刷新时间倒计时：8h 23m 15s</Text>
            <Time src={require('assets/images/myWallet/time.png').default} alt="" />
          </Flex>
        </TaskTitle>
        <LeftFlex>
          {
            TaskList.filter(v => v.taskType === 2).map(item => <MissionCard key={item.taskID} info={item} />)
          }
        </LeftFlex>
        <TaskTitle>
          <Flex alignItems="center">
            <Text mr="43px" fontSize="18px" bold>成就任务 (0 / 10)</Text>
            <Text mr="12px" fontSize="14px" color="textTips">一次性任务</Text>
          </Flex>
        </TaskTitle>
        <LeftFlex>
          {
            TaskList.filter(v => v.taskType === 3).map(item => <MissionCard key={item.taskID} info={item} />)
          }
        </LeftFlex>
      </Box>
    </Box>
  );
};

export default Task;
