import React, { useState } from 'react';
import styled from 'styled-components'
import { Flex, Box, Text, Card, Skeleton } from 'uikit';
import { Container, Timer } from 'components'
import { formatDisplayApr } from 'utils/formatBalance';
import getTimePeriods from 'utils/getTimePeriods';
import { SinglePoolData, UserData, PoolUserData, PoolAprs } from 'store/pools/types';
import PoolCardHeader from './PoolCardHeader'
import PoolAction from './PoolAction';

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

  const { days, hours, minutes } = getTimePeriods(Number(poolInfo.duration))

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
        <ContainerStyled>
          <Flex justifyContent="space-between">
            <Box>
              <Text color="textTips">ARP</Text>
              <Text bold color="textPrimary">{formatDisplayApr(poolApr?.totalApr)}%</Text>
            </Box>
            <Box>
              <Text color="textTips">锁仓时间</Text>
              <Timer bold color="white_black" itemMr="6px" minutes={minutes} hours={hours} days={days} />
            </Box>
            <Box>
              <Text color="textTips" textAlign="right">Liquidity</Text>
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
