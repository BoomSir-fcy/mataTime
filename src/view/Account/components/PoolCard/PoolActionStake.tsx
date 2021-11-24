import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, Box, Text, Card, Button, Heading, Skeleton } from 'uikit';
import { useSinglePoolState } from 'store/pools/hooks';
import { UserData } from 'store/pools/types';
import BigNumber from 'bignumber.js';
import { TokenPairImage, TokenImage } from 'components';
import { Container, ModalWrapper } from 'components'
import { useApproveErc20Pool, useHarvestStakeId, useStakePool } from '../../hooks/pools';
import StakeModal from '../PoolModal/StakeModal'
import PoolStakeInfo, { PoolDispalynUserData } from './PoolStakeInfo';

const ButtonStyled = styled(Button)`
  padding: 0 8px;
`

interface PoolActionStakeProps {
  depositToken: address
  rewardToken0: address
  rewardToken1: address
  depositSymbol: string
  rewardToken0Symbol: string
  rewardToken1Symbol: string
  poolAddress: string
  rewardToken0Decimals: number
  rewardToken1Decimals: number
  depositDecimals: number
  pid: string
  dispalynUserData?: PoolDispalynUserData
}

const PoolActionStake: React.FC<PoolActionStakeProps> = ({
  depositToken,
  rewardToken0,
  rewardToken1,
  depositSymbol,
  rewardToken0Symbol,
  rewardToken1Symbol,
  rewardToken0Decimals,
  rewardToken1Decimals,
  depositDecimals,
  poolAddress,
  pid,
  dispalynUserData,
}) => {

  const [visible, setVisible] = useState(false)
  const [visibleView, setVisibleView] = useState(false)
  const [testVal, setTestVal] = useState(1)

  // const { onApprove } = useStakePool(pid, de)
  const { onStake } = useStakePool(pid)
  const { userStakesMap } = useSinglePoolState()

  return (
    <Box>
      <PoolStakeInfo
        depositToken={depositToken}
        rewardToken0={rewardToken0}
        rewardToken1={rewardToken1}
        depositSymbol={depositSymbol}
        rewardToken0Symbol={rewardToken0Symbol}
        rewardToken1Symbol={rewardToken1Symbol}
        dispalynUserData={dispalynUserData}
      >
        <Flex>
          <Button onClick={() => setVisible(true)}>加仓</Button>
          <Button ml="12px">查看</Button>
        </Flex>
      </PoolStakeInfo>
      <ModalWrapper title="质押" creactOnUse visible={visible} setVisible={setVisible}>
        <StakeModal
          max={dispalynUserData.tokenBalance}
          decimals={depositDecimals}
          depositSymbol={depositSymbol}
          onConfirm={onStake}
          onDismiss={() => setVisible(false)}
        />
      </ModalWrapper>
      <ModalWrapper title="查看" creactOnUse visible={visibleView} setVisible={setVisibleView}>
        <StakeModal
          max={dispalynUserData.tokenBalance}
          decimals={depositDecimals}
          depositSymbol={depositSymbol}
          onConfirm={onStake}
          onDismiss={() => setVisibleView(false)}
        />
      </ModalWrapper>
    </Box>
  )
  // max: BigNumber
  // decimals?: number
  // onConfirm?: (amount: string) => void
  // onDismiss?: () => void
}

export default PoolActionStake;
