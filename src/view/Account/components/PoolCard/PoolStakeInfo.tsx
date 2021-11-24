import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, Box, Text, Card, Button, Heading, Skeleton } from 'uikit';
import { UserData } from 'store/pools/types';
import BigNumber from 'bignumber.js';
import { TokenPairImage, TokenImage } from 'components';
import { Container, ModalWrapper } from 'components'
import { useApproveErc20Pool, useHarvestStakeId, useStakePool } from '../../hooks/pools';
import StakeModal from '../PoolModal/StakeModal'

const ButtonStyled = styled(Button)`
  padding: 0 8px;
`

export interface PoolDispalynUserData {
  allowance: BigNumber
  isApproved: boolean
  token0UnclaimedRewards: BigNumber
  token1UnclaimedRewards: BigNumber
  stakeAmount: BigNumber
  tokenBalance: BigNumber
  dispalyToken0Rewards: string
  dispalyToken1Rewards: string
  dispalyStakeAmount: string
}

interface PoolStakeInfoProps {
  depositToken: address
  rewardToken0: address
  rewardToken1: address
  depositSymbol: string
  rewardToken0Symbol: string
  rewardToken1Symbol: string
  dispalynUserData?: PoolDispalynUserData
}

const PoolStakeInfo: React.FC<PoolStakeInfoProps> = ({
  depositToken,
  rewardToken0,
  rewardToken1,
  depositSymbol,
  rewardToken0Symbol,
  rewardToken1Symbol,
  dispalynUserData,
  children
}) => {

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" flex="1">
          <TokenImage tokenAddress={depositToken} width={33} height={36} />
          <Box ml="8px">
            <Text fontSize="14px" color="textTips">总质押的 {depositSymbol}</Text>
            {
              dispalynUserData?.stakeAmount.isFinite()
                ?
                <Text bold color="white_black">{dispalynUserData?.dispalyStakeAmount}</Text>
                :
                <Skeleton />
            }
          </Box>
        </Flex>
        <Box>{children}</Box>
      </Flex>
      <Flex mt="16px" justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" flex="1">
          <TokenImage tokenAddress={rewardToken0} width={33} height={36} />
          <Box ml="8px">
            <Text fontSize="14px" color="textTips">总收益的 {rewardToken0Symbol}</Text>
            {
              dispalynUserData?.token0UnclaimedRewards.isFinite()
                ?
                <Text bold color="white_black">{dispalynUserData?.dispalyToken0Rewards}</Text>
                :
                <Skeleton />
            }
          </Box>
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" flex="1">
          <Box mr="8px">
            <Text fontSize="14px" textAlign="right" color="textTips">总收益的 {rewardToken1Symbol}</Text>
            {
              dispalynUserData?.token1UnclaimedRewards.isFinite()
                ?
                <Text textAlign="right" bold color="white_black">{dispalynUserData?.dispalyToken1Rewards}</Text>
                :
                <Skeleton />
            }
          </Box>
          <TokenImage tokenAddress={rewardToken1} width={33} height={36} />
        </Flex>
      </Flex>
    </Box>
  )
}

export default PoolStakeInfo;
