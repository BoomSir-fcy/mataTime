import React, { useState } from 'react';
import styled from 'styled-components'
import { Flex, Box, Text, Card, Skeleton } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Container, Timer } from 'components'
import { formatDisplayApr } from 'utils/formatBalance';
import getTimePeriods from 'utils/getTimePeriods';
import { SinglePoolData, UserData, PoolUserData, PoolAprs } from 'store/pools/types';
import PoolCardHeader from './PoolCardHeader'
import PoolAction from './PoolAction';
import { boostData } from '../../datas/boost'

const ContainerStyled = styled(Container)`
 padding-top: 0;
`

interface PoolCardProps {
  poolInfo: SinglePoolData
  userData?: UserData
  poolApr?: PoolAprs
  userStakes?: PoolUserData[]
}
const PoolCard: React.FC<PoolCardProps> = ({ poolInfo, userData, poolApr, userStakes }) => {
  const { t } = useTranslation()


  const { years, months, days, hours, minutes } = getTimePeriods(Number(poolInfo.duration), true)

  const boostVal = boostData.find(item => item.days === days)

  return (
    <Card isRadius={true}>
      <Box>
        <PoolCardHeader
          depositToken={poolInfo.depositToken}
          rewardToken0={poolInfo.rewardToken0}
          rewardToken1={poolInfo.rewardToken1}
          depositSymbol={poolInfo.depositSymbol}
          rewardToken0Symbol={poolInfo.rewardToken0Symbol}
          rewardToken1Symbol={poolInfo.rewardToken1Symbol}
          poolAddress={poolInfo.poolAddress} />
        <ContainerStyled mt="16px">
          <Flex justifyContent="space-between">
            <Box>
              <Text color="textTips">{t('ARP')}</Text>
              <Text bold color="upPrice">{formatDisplayApr(poolApr?.totalApr)}%</Text>
            </Box>
            <Box>
              <Text color="textTips">{t('Lock time')}</Text>
              <Timer bold color="white_black" itemMr="6px" days={days} />
            </Box>
            <Box>
              <Text color="textTips">{t('Boost')}</Text>
              <Text bold color="orange">{boostVal?.value ? `X ${boostVal?.value}` : '--'}</Text>
            </Box>
            <Box>
              <Text color="textTips" textAlign="right">{t('Total staked')}</Text>
              {
                Number(poolInfo.totalLiquidity)
                  ?
                  <Text bold textAlign="right">$ {Number(poolInfo.totalLiquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                  :
                  <Skeleton />

              }
            </Box>
          </Flex>
        </ContainerStyled>
        <PoolAction userData={userData} poolInfo={poolInfo} />
      </Box>
    </Card>
  )
}

export default PoolCard;
