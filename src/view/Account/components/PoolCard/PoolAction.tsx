import React, { useState } from 'react';
import { Flex, Box, Text, Card } from 'uikit';
import { Container } from 'components'
import PoolActionHarvest from './PoolActionHarvest';
import PoolActionStake from './PoolActionStake';
import styled from 'styled-components';
import { SinglePoolData, UserData } from 'store/pools/types';
import BigNumber from 'bignumber.js';

const ActionBoxStyled = styled(Box)`
  background: ${({ theme }) => theme.colors.backgroundLight};
`
const ContainerItem = styled(Container)`
  padding-top: 12px;
  padding-bottom: 12px;
`

interface PoolActionProps {
  poolInfo: SinglePoolData
  userData?: UserData
}
const PoolAction: React.FC<PoolActionProps> = ({ poolInfo, userData }) => {

  const {
    allowance: allowanceAsString = '0'
  } = userData || {}
  console.log(userData)
  const allowance = new BigNumber(allowanceAsString)
  const isApproved = allowance.isGreaterThan(0)

  console.log(isApproved)

  return (
    <ActionBoxStyled>
      <ContainerItem>
        <PoolActionStake />
      </ContainerItem>
      <ContainerItem>
        <PoolActionHarvest
          depositToken={poolInfo.depositToken}
          poolAddress={poolInfo.poolAddress}
          pid={poolInfo.pid}
          isApproved={isApproved}
        />
      </ContainerItem>
    </ActionBoxStyled>
  )
}

export default PoolAction;
