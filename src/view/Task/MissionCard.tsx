import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { Button, Heading, Text, Flex, Svg, Progress, Box, Image } from 'uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getAddress } from 'utils/addressHelpers'
// import { fetchTaskListAsync } from 'state/mission'
// import tokens from 'config/constants/tokens'
import { GetTaskName, useCountdownTime, useReceive, useSignIn } from './hooks/matter'
import { useToast } from 'hooks'
import { useDispatch } from 'react-redux'
import CountdownTime from './Countdown'
import { TaskInfo, Status } from './type'

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
const ReceiveButton = styled(Button) <{ disabled: boolean }>`
  background-color: ${({ theme, disabled }) => disabled ? theme.colors.disableStep : theme.colors.backgroundPrimary};
`

const MissionCard: React.FC<{ info: TaskInfo }> = ({
  info
}) => {
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast();
  const [pengdingType, setpengdingType] = useState(false)
  const [status, setStatus] = useState(info.status);


  // 领取
  const handleReceive = useCallback(
    async () => {
      try {
        setpengdingType(true)
        console.log('领取中。。。');

        // const res = await useReceive(info.task_id)
        // if (res.code === 1) {
        //   toastSuccess(t('Received successfully'))
        //   setStatus(Status.Received);
        // } else {
        //   toastError(t('Received failed'))
        // }
      } catch (error) {
        toastError(t('Received failed'))
      } finally {
        setpengdingType(false)
      }
    },
    [],
  )

  const getTipColor = () => {
    if (status === Status.Received) return 'taskTips';
    if (info.task_type === 1) return 'taskDay';
    if (info.task_type === 2) return 'taskWeek';
    if (info.task_type === 3) return 'taskAchievement';
    return 'taskDay';
  }

  return (
    <>
      <MisCard >
        <MisText fontSize="14px">{info.task_type === 1 ? t('Daily') : info.task_type === 2 ? t('Week') : t('Special')}</MisText>
        <Ribbon color={getTipColor()} viewBox="0 0 200 200">
          <polygon points="0,106 0,200 199.5,0 103,0 " />
        </Ribbon>
        <Info>
          <Flex flexDirection="column" justifyContent='space-between' alignItems='center'>
            <Heading mb='16px' scale='ld'>{t(`${GetTaskName(info.task_name_id).name}`)}</Heading>
            <Text mb='20px' color='textTips'>{t(`${GetTaskName(info.task_name_id).describe}`)}</Text>
            {
              info?.Expand &&
              <ProgressBox>
                <Text small mb="8px">{`${info.Expand?.now}/${info.Expand?.max}`}</Text>
                <Box width="100%"><Progress scale='sm' variant='round' primaryStep={(info.Expand?.now / info.Expand?.max) * 100} /></Box>
              </ProgressBox>
            }
            <Flex alignItems="center">
              <img alt="" width={33} src="/images/tokens/matter.svg" />
              <Text ml="30px" color='textPrimary' fontWeight='bold' fontSize='16px'>+{info.matter}</Text>
              <Text ml="8px" color='textPrimary'>Matter</Text>
            </Flex>
          </Flex>
        </Info>
        <CardAction>
          <ReceiveButton
            isLoading={pengdingType}
            disabled={pengdingType || status === Status.UnCompleted || status === Status.Received}
            onClick={handleReceive} >
            {status === Status.UnCompleted || status === Status.Completed ? t('Receive') : t('Completed')}
          </ReceiveButton>
        </CardAction>
      </MisCard >
    </>
  )
}

export default MissionCard
