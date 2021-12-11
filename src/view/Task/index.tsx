import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button, Spinner, Empty } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import CountdownTime from './Countdown';
import { useTranslation } from 'contexts/Localization';
import { useTaskList } from './hooks/matter';
import MissionCard from './MissionCard';
import { Status } from './type';

const ScrollBox = styled(Box)`
  height: calc(100vh - 152px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TaskTitle = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 57px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${mediaQueriesSize.paddingxs}
`;

const LeftFlex = styled(Flex)`
  justify-content: start;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  padding: 23px 14px 55px 14px;
  & > :not(:nth-child(3)) {
    margin-right: 12px;
  }
`;
const Time = styled.img`
  width: 18px;
  display: inline-block;
`;

const TaskCountBox = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 95px;
  padding: 0 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  transition: all 0.3s;
  .left {
    border-radius: 10px 0 0 10px;
    background: ${({ theme }) => theme.colors.tertiary};
  }
  .right {
    border-radius: 0 10px 10px 0;
    background: ${({ theme }) => theme.colors.backgroundTextArea};
  }
`;

const TaskCount = ({ left, right }) => {
  return (
    <Box mr="50px">
      <Button className="left">{left}</Button>
      <Button className="right">{right}</Button>
    </Box>
  );
};

const Task: React.FC = () => {
  const { t } = useTranslation();
  const { dailyList, weekList, specialList, loading } = useTaskList();

  const dailyReceived = dailyList.filter(
    v => v.status === Status.Received
  ).length;
  const dailyTotal = dailyList.length;

  const weekReceived = weekList.filter(
    v => v.status === Status.Received
  ).length;
  const weekTotal = weekList.length;

  const specialReceived = specialList.filter(
    v => v.status === Status.Received
  ).length;
  const specialTotal = specialList.length;
  return (
    <>
      {loading ? (
        <Flex height="100vh" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      ) : (
        <Box>
          <TaskTitle>
            <Text fontSize="18px" bold>
              {t('EasyTaskEarn$Matter')}
            </Text>
          </TaskTitle>
          <TaskCountBox>
            <Flex flexWrap="wrap" justifyContent="space-between">
              <TaskCount
                left={t('DailyTask')}
                right={`${dailyReceived}/${dailyTotal}`}
              />
              <TaskCount
                left={t('WeekTask')}
                right={`${weekReceived}/${weekTotal}`}
              />
              <TaskCount
                left={t('SpecialTask')}
                right={`${specialReceived}/${specialTotal}`}
              />
            </Flex>
            <Button>{t('RevenueRecord')}</Button>
          </TaskCountBox>
          <ScrollBox>
            <TaskTitle>
              <Flex alignItems="center">
                <Text mr="43px" fontSize="18px" bold>
                  {t('DailyTask')} ({dailyReceived} / {dailyTotal})
                </Text>
                <Flex mr="12px">
                  <Text fontSize="14px" color="textTips">
                    {t('RefreshTimeCountdown')}：
                  </Text>
                  {dailyList[0]?.end_time && (
                    <CountdownTime
                      endTime={dailyList[0].end_time}
                      startTime={dailyList[0].now_time}
                    />
                  )}
                </Flex>
                <Time
                  src={require('assets/images/myWallet/time.png').default}
                  alt=""
                />
              </Flex>
            </TaskTitle>
            <LeftFlex>
              {dailyList.length ? (
                dailyList.map(item => (
                  <MissionCard key={item.task_id} info={item} />
                ))
              ) : (
                <Empty />
              )}
            </LeftFlex>
            <TaskTitle>
              <Flex alignItems="center">
                <Text mr="43px" fontSize="18px" bold>
                  {t('WeekTask')} ({weekReceived} / {weekTotal})
                </Text>
                <Flex mr="12px">
                  <Text fontSize="14px" color="textTips">
                    {t('RefreshTimeCountdown')}：
                  </Text>
                  {weekList[0]?.end_time && (
                    <CountdownTime
                      endTime={weekList[0].end_time}
                      startTime={weekList[0].now_time}
                    />
                  )}
                </Flex>
                <Time
                  src={require('assets/images/myWallet/time.png').default}
                  alt=""
                />
              </Flex>
            </TaskTitle>
            <LeftFlex>
              {weekList.length ? (
                weekList.map(item => (
                  <MissionCard key={item.task_id} info={item} />
                ))
              ) : (
                <Empty />
              )}
            </LeftFlex>
            <TaskTitle>
              <Flex alignItems="center">
                <Text mr="43px" fontSize="18px" bold>
                  {t('SpecialTask')} ({specialReceived} / {specialTotal})
                </Text>
                <Text mr="12px" fontSize="14px" color="textTips">
                  {t('OneTimeTask')}
                </Text>
              </Flex>
            </TaskTitle>
            <LeftFlex>
              {specialList.length ? (
                specialList.map(item => (
                  <MissionCard key={item.task_id} info={item} />
                ))
              ) : (
                <Empty />
              )}
            </LeftFlex>
          </ScrollBox>
        </Box>
      )}
    </>
  );
};

export default Task;
