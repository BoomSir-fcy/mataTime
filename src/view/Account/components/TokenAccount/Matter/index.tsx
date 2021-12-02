import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import Header from './header';
import MissionCard from './missionCard';

const Content = styled(Box)`
  padding: 30px 18px;
${({ theme }) => theme.mediaQueries.md}{
  padding: 15px 14px;
}
`
const LeftFlex = styled(Flex)`
  justify-content: start;
  flex-wrap: wrap;
  &>:not(:nth-child(3)){
    margin-right: 12px;
  }
`
const TaskTitle = styled(Text)`
  padding-top: 24px;
  padding-bottom: 16px;
  font-size:18px;
  font-weight: bold;
`
interface MatterInfo {
  Balance?: number
  TokenAddr: string
  BalanceInfo: Api.Account.Balance
}

const Matter: React.FC<MatterInfo> = ({ Balance, TokenAddr, BalanceInfo }) => {
  const TaskList = [{
    taskID: 123,
    nowTime: 1635758812,
    endTime: 1638517726,
    taskStatus: 1,
    points: 100,
    taskType: 1,
    taskName: 'SignIn',
    continuous: null
  },
  {
    taskID: 123,
    nowTime: 1635758812,
    endTime: 1638517726,
    taskStatus: 2,
    points: 100,
    taskType: 1,
    taskName: 'SignIn',
    continuous: null
  },
  {
    taskID: 123,
    nowTime: 1635758812,
    endTime: 1638517726,
    taskStatus: 3,
    points: 100,
    taskType: 1,
    taskName: 'SignIn',
    continuous: null
  },
  {
    taskID: 123,
    nowTime: 1635758812,
    endTime: 1638517726,
    taskStatus: 1,
    points: 100,
    taskType: 1,
    taskName: 'SignIn',
    continuous: null
  }, {
    taskID: 123,
    nowTime: 1635758812,
    endTime: 1638517726,
    taskStatus: 1,
    points: 100,
    taskType: 2,
    taskName: 'SignIn',
    continuous: null
  }, {
    taskID: 123,
    nowTime: 1635758812,
    endTime: 1638517726,
    taskStatus: 1,
    points: 100,
    taskType: 3,
    taskName: 'SignIn',
    continuous: null
  }
  ]
  return (
    <Content>
      <Header Balance={Balance} BalanceInfo={BalanceInfo} TokenAddr={TokenAddr} />
      <TaskTitle>Matter每日任务 ( 0 / 10)</TaskTitle>
      <LeftFlex>
        {
          TaskList.map(item => (
            item.taskType == 1 ? <MissionCard key={item.taskID} info={item} /> : <></>
          ))
        }
      </LeftFlex>
      <TaskTitle>Matter每周任务 ( 0 / 5)</TaskTitle>
      <LeftFlex>
        {
          TaskList.map(item => (
            item.taskType == 2 ? <MissionCard key={item.taskID} info={item} /> : <></>
          ))
        }
      </LeftFlex>
      <TaskTitle>Matter成就任务 ( 0 / 2)</TaskTitle>
      <LeftFlex>
        {
          TaskList.map(item => (
            item.taskType == 3 ? <MissionCard key={item.taskID} info={item} /> : <></>
          ))
        }
      </LeftFlex>
    </Content>
  )
}

export default Matter;