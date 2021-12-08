import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button, Spinner } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import CountdownTime from './Countdown';
import { useTaskList } from './hooks/matter';
import MissionCard from './MissionCard';
import { Status } from './type';

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
  const { dailyList, weekList, specialList, loading } = useTaskList();

  const dailyReceived = dailyList.filter(v => v.status === Status.Received).length;
  const dailyTotal = dailyList.length;

  const weekReceived = weekList.filter(v => v.status === Status.Received).length;
  const weekTotal = weekList.length;

  const specialReceived = specialList.filter(v => v.status === Status.Received).length;
  const specialTotal = specialList.length;
  return (
    <>
      {
        loading ?
          <Flex height="100vh" justifyContent="center" alignItems="center">
            <Spinner />
          </Flex > :
          <Box>
            <TaskTitle><Text fontSize="18px" bold>轻松任务，赚取$Matter</Text></TaskTitle>
            <Box>
              <TaskCountBox>
                <Flex justifyContent="space-between">
                  <TaskCount left="当日任务" right={`${dailyReceived}/${dailyTotal}`} />
                  <TaskCount left="当周任务" right={`${weekReceived}/${weekTotal}`} />
                  <TaskCount left="成就任务" right={`${specialReceived}/${specialTotal}`} />
                </Flex>
                <Button>收益记录</Button>
              </TaskCountBox>
              <TaskTitle>
                <Flex alignItems="center">
                  <Text mr="43px" fontSize="18px" bold>每日任务 ({dailyReceived} / {dailyTotal})</Text>
                  <Flex mr="12px">
                    <Text fontSize="14px" color="textTips">刷新时间倒计时：</Text>
                    {
                      dailyList[0]?.end_time && <CountdownTime endTime={dailyList[0].end_time} startTime={dailyList[0].now_time} />
                    }
                  </Flex>
                  <Time src={require('assets/images/myWallet/time.png').default} alt="" />
                </Flex>
              </TaskTitle>
              <LeftFlex>
                {dailyList.map(item => <MissionCard key={item.task_id} info={item} />)}
              </LeftFlex>
              <TaskTitle>
                <Flex alignItems="center">
                  <Text mr="43px" fontSize="18px" bold>每周任务 ({weekReceived} / {weekTotal})</Text>
                  <Flex mr="12px">
                    <Text fontSize="14px" color="textTips">刷新时间倒计时：</Text>
                    {
                      weekList[0]?.end_time && <CountdownTime endTime={weekList[0].end_time} startTime={weekList[0].now_time} />
                    }
                  </Flex>
                  <Time src={require('assets/images/myWallet/time.png').default} alt="" />
                </Flex>
              </TaskTitle>
              <LeftFlex>
                {weekList.map(item => <MissionCard key={item.task_id} info={item} />)}
              </LeftFlex>
              <TaskTitle>
                <Flex alignItems="center">
                  <Text mr="43px" fontSize="18px" bold>成就任务 ({specialReceived} / {specialTotal})</Text>
                  <Text mr="12px" fontSize="14px" color="textTips">一次性任务</Text>
                </Flex>
              </TaskTitle>
              <LeftFlex>
                {specialList.map(item => <MissionCard key={item.task_id} info={item} />)}
              </LeftFlex>
            </Box>
          </Box>
      }
    </>
  );
};

export default Task;
