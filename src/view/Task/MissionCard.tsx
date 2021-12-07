import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { Button, Heading, Text, Flex, Svg, Progress, Box, Image } from 'uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getAddress } from 'utils/addressHelpers'
// import { fetchTaskListAsync } from 'state/mission'
// import tokens from 'config/constants/tokens'
import { GetTaskName, useCountdownTime, useSignIn } from './hooks/matter'
import { useToast } from 'hooks'
import { useDispatch } from 'react-redux'
import CountdownTime from './Countdown'

/* eslint-disable */


const MisCard = styled.div`
  background: ${(props) => props.theme.card.background};
  border-radius: ${({ theme }) => theme.radii.card};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding:25px 14px 20px;
  position: relative;
  width: 290px;
  margin-bottom: 47px;
`
const Ribbon = styled(Svg)`
  position: absolute;
  left: 0;
  top: 0;
  width:70px;
`
const MisText = styled(Text)`
  width: 45px;
  text-align: center;
  position: absolute;
  left: 4px;
  top: 15px;
  transform: rotate(-45deg);
  z-index: 1;
  color:${({ theme }) => theme.colors.white};
`
const Info = styled.div`
  background: ${({ theme }) => theme.colors.backgroundMenu};
  box-shadow: inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35);
  border-radius: 20px;
  padding: 20px 16px;
  margin-bottom:18px;
`
const ProgressBox = styled(Flex)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
`
const CardAction = styled(Box)`
  position: absolute;
  bottom: -17px;
  left: 50%;
  transform: translate(-50%, 0);
`
interface MissionList {
  taskID: number
  nowTime: number
  endTime: number
  taskStatus: number
  points: number
  taskType: number
  taskName: string
  continuous: any
}
export interface CardProps {
  info: MissionList
}
const MissionCard: React.FC<CardProps> = ({
  info
}) => {
  const { t } = useTranslation()
  const { account, chainId, library } = useActiveWeb3React();
  const { toastSuccess, toastError } = useToast();
  const dispatch = useDispatch()
  const history = useHistory();
  const [pengdingType, setpengdingType] = useState(false)
  const [loadTime, setloadTime] = useState(0)

  // const [onPresent] = useModal(
  //   <MissionIntroModal />,
  // )
  const toFinisheTask = (taskName: string) => {
    // if (taskName === 'AnyTransaction') history.push('/swap')
    // if (taskName === 'AnyMarketMaking') history.push('/liquidity')
    // if (taskName === 'MintLeast01vdsg') history.push('/vdsg')
    // if (taskName === 'Least3TransactionsWithDinosaurEggs') history.push('/swap')
    // // 邀请交易
    // if (taskName === 'inviteNewUserTransfer' || taskName === 'Invitation') {
    //   // onPresent()
    // }
    // if (taskName === 'SpecifyTradingPairBNBToBUSDTask') {
    //   const BUSDT = tokens.busd
    //   const BUSDTADD = getAddress(BUSDT.address)
    //   history.push(`/swap?outputCurrency=${BUSDTADD}`)
    // }
    // if (taskName === 'SpecifyTradingPairBNBToDSGTask') {
    //   const DSG = tokens.dsg
    //   const DSGADD = getAddress(DSG.address)
    //   history.push(`/swap?outputCurrency=${DSGADD}`)
    // }
    // if (taskName === 'MintMore1vdsg') history.push('/vdsg')
    // if (taskName === 'More1TransactionsWithNFTdsg') history.push('/nft')
    // if (taskName === 'ExtractMiningIncomeFromOneTransaction') history.push('/trading')
    // if (taskName === 'PledgeDSGreceivedBNBrewardToday') history.push('/nftfarm')
  }

  // 签到
  const OnSgin = (taskName, taskID, taskType) => {
    let type = 2
    if (taskName === 'SignIn') type = 1
    return useSignIn(dispatch, account, library, type, taskID, taskType)
  }
  const downTime = useCountdownTime(info.endTime)

  const getName = (taskName) => {
    if (taskName === 'Invitation') return t('times')
    if (taskName === 'ContinuousSignIn') return t('d')
    return t('times')
  }
  // 防止用户乱调时间，导致接口一直调用！现在时间不对10秒重新请求接口
  useEffect(() => {
    if (downTime <= 0 && downTime !== null && info.endTime && (Math.floor(new Date().getTime() / 1000) - loadTime > 60)) {
      setloadTime(Math.floor(new Date().getTime() / 1000))
      // dispatch(fetchTaskListAsync({ account, lastEndTime: info.endTime }))
    }
  }, [dispatch, downTime, info.endTime, info.nowTime, loadTime, account])
  // 任务taskStatus 1.未完成 2.可领取 3.已完成
  return (
    <>
      <MisCard >
        <MisText fontSize="14px">{info.taskType === 1 ? t('Daily') : info.taskType === 2 ? t('Week') : t('Special')}</MisText>
        <Ribbon color={info.taskType === 1 ? 'taskDay' : info.taskType === 2 ? 'taskWeek' : 'taskAchievement'} viewBox="0 0 200 200">
          <polygon points="0,106 0,200 199.5,0 103,0 " />
        </Ribbon>
        <Info>
          <Flex flexDirection="column" justifyContent='space-between' alignItems='center'>
            <Heading mb='16px' scale='ld'>{GetTaskName(info.taskName, t)}</Heading>
            <Text mb='20px' color='textTips'>每日评论累计3次</Text>
            <ProgressBox>
              <Text small mb="8px">{`${info.continuous?.now}/${info.continuous?.max}`}</Text>
              <Box width="100%"><Progress scale='sm' variant='round' primaryStep={(info.continuous?.now / info.continuous?.max) * 100} /></Box>
            </ProgressBox>
            <Flex alignItems="center">
              <img alt="" width={33} src="/images/tokens/matter.svg" />
              <Text ml="30px" color='textPrimary' fontWeight='bold' fontSize='16px'>+{info.points}</Text>
              <Text ml="8px" color='textPrimary'>Matter</Text>
            </Flex>
          </Flex>
        </Info>
        <CardAction>
          <Button disabled={pengdingType || info.taskStatus === 3 || ((info.taskName === 'CompletedAllDailyTasksAndAdvancedTasks' || info.taskName === 'ContinuousSignIn') && info.taskStatus === 1)} onClick={async () => {
            if (info.taskStatus === 1) {
              toFinisheTask(info.taskName)
            } else {
              try {
                setpengdingType(true)
                const res = await OnSgin(info.taskName, info.taskID, info.taskType)
                if (res.code === 20008) {
                  toastError(t('The difference between the local time and the standard time is too large, please synchronize the time!'))
                } else {
                  toastSuccess(t('Received successfully'))
                }
              } catch (error) {
                toastError(t('Claim failed'))
              } finally {
                setpengdingType(false)
              }
            }
          }} >
            {
              info.taskStatus === 3 ? t('Claim') : info.taskStatus === 2 ? t('Claim2') : (info.taskName === 'CompletedAllDailyTasksAndAdvancedTasks' || info.taskName === 'ContinuousSignIn') ? t('To be completed') : t('To finish')
            }
          </Button>
        </CardAction>
      </MisCard >
    </>
  )
}

export default MissionCard
