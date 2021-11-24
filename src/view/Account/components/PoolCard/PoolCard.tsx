import React, { useState } from 'react';
import styled from 'styled-components'
import { Flex, Box, Text, Card } from 'uikit';
import { Container } from 'components'
import { SinglePoolData, UserData } from 'store/pools/types';
import PoolCardHeader from './PoolCardHeader'
import PoolAction from './PoolAction';

const ContainerStyled = styled(Container)`
 padding-top: 0;
`

interface PoolCardProps {
  poolInfo: SinglePoolData
  userData?: UserData
}
const PoolCard: React.FC<PoolCardProps> = ({ poolInfo, userData }) => {

  return (
    <Card>
      <Box>
        <PoolCardHeader depositToken={''} rewardToken0={''} rewardToken1={''} depositSymbol={''} rewardToken0Symbol={''} rewardToken1Symbol={''} poolAddress={''} />
        <ContainerStyled>
          <Flex justifyContent="space-between">
            <Box>
              <Text>ARP</Text>
              <Text>253%</Text>
            </Box>
            <Box>
              <Text textAlign="right">Liquidity</Text>
              <Text textAlign="right">$ 111.122</Text>
            </Box>
          </Flex>
        </ContainerStyled>
        <PoolAction userData={userData} poolInfo={poolInfo} />
      </Box>
    </Card>
  )
}

export default PoolCard;
