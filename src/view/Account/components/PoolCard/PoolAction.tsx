import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Box, Text, Card } from 'uikit';
import { Container } from 'components'
import styled from 'styled-components';
import { formatDisplayBalance, formatDisplayBalanceWithSymbol, getBalanceAmount } from 'utils/formatBalance';
import { SinglePoolData, UserData } from 'store/pools/types';
import BigNumber from 'bignumber.js';
import { ModalWrapper } from 'components/ModalWrapper'
import { useTranslation } from 'contexts';
import { useWithdrawPool } from 'view/Account/hooks/pools';
import { useSinglePoolState } from 'store/pools/hooks';
import { fetchSpVaultUserAsync } from 'store/pools/thunks';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import PoolActionHarvest from './PoolActionHarvest';
import PoolActionStake from './PoolActionStake';
import { PoolDispalynUserData } from './PoolStakeInfo';
import UnStakeModal from '../PoolModal/UnStakeModal'

const ActionBoxStyled = styled(Box)`
  background: ${({ theme }) => theme.colors.input};
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
  const { account } = useWeb3React()
  const { t } = useTranslation()

  const [visibleView, setVisibleView] = useState(false)
  const { onWithdraw } = useWithdrawPool()
  const dispatch = useDispatch()
  const { userStakesMap } = useSinglePoolState()
  const updateUserData = useCallback(() => {
    dispatch(fetchSpVaultUserAsync(account))

  }, [dispatch, account])

  const dispalynUserData = useMemo(() => {
    const {
      allowance: allowanceAsString = '0',
      token0UnclaimedRewards: token0UnclaimedRewardsAsString = '0',
      token1UnclaimedRewards: token1UnclaimedRewardsAsString = '0',
      stakeAmount: stakeAmountAsString = '0',
      tokenBalance: tokenBalanceAsString = '0'
    } = userData || {}
    const allowance = new BigNumber(allowanceAsString)
    const token0UnclaimedRewards = new BigNumber(token0UnclaimedRewardsAsString)
    const token1UnclaimedRewards = new BigNumber(token1UnclaimedRewardsAsString)
    const stakeAmount = new BigNumber(stakeAmountAsString)
    const tokenBalance = new BigNumber(tokenBalanceAsString)

    const isApproved = allowance.isGreaterThan(0)
    const dispalyToken0Rewards = formatDisplayBalanceWithSymbol(token0UnclaimedRewards, poolInfo.rewardToken1Decimals)
    const dispalyToken1Rewards = formatDisplayBalanceWithSymbol(token1UnclaimedRewards, poolInfo.rewardToken0Decimals)
    const dispalyStakeAmount = formatDisplayBalanceWithSymbol(stakeAmount, poolInfo.depositDecimals)
    return {
      allowance,
      isApproved,
      token0UnclaimedRewards,
      token1UnclaimedRewards,
      stakeAmount,
      tokenBalance,
      dispalyToken0Rewards,
      dispalyToken1Rewards,
      dispalyStakeAmount,
    }
  }, [userData, poolInfo.depositDecimals, poolInfo.rewardToken0Decimals, poolInfo.rewardToken1Decimals])

  return (
    <ActionBoxStyled>
      <ContainerItem>
        <PoolActionStake
          depositToken={poolInfo.depositToken}
          isApproved={dispalynUserData.isApproved}
          rewardToken0={poolInfo.rewardToken0}
          rewardToken1={poolInfo.rewardToken1}
          depositSymbol={poolInfo.depositSymbol}
          rewardToken0Symbol={poolInfo.rewardToken0Symbol}
          rewardToken1Symbol={poolInfo.rewardToken1Symbol}
          poolAddress={poolInfo.poolAddress}
          dispalynUserData={dispalynUserData}
          rewardToken0Decimals={poolInfo.rewardToken0Decimals}
          pid={poolInfo.pid}
          rewardToken1Decimals={poolInfo.rewardToken1Decimals}
          depositDecimals={poolInfo.depositDecimals} />
      </ContainerItem>
      <PoolActionHarvest
        depositToken={poolInfo.depositToken}
        poolAddress={poolInfo.poolAddress}
        pid={poolInfo.pid}
        onView={() => setVisibleView(true)}
        showView={!!userStakesMap[poolInfo.pid]}
        isApproved={dispalynUserData.isApproved}
      />
      <ModalWrapper fillBody title={t('View')} creactOnUse visible={visibleView} setVisible={setVisibleView}>
        <UnStakeModal
          onConfirm={async (_pid) => {
            await onWithdraw(_pid)
            updateUserData()
          }}
          onDismiss={() => setVisibleView(false)}
          depositToken={poolInfo.depositToken}
          rewardToken0={poolInfo.rewardToken0}
          rewardToken1={poolInfo.rewardToken1}
          depositSymbol={poolInfo.depositSymbol}
          rewardToken0Symbol={poolInfo.rewardToken0Symbol}
          rewardToken1Symbol={poolInfo.rewardToken1Symbol}
          rewardToken0Decimals={poolInfo.rewardToken0Decimals}
          rewardToken1Decimals={poolInfo.rewardToken1Decimals}
          depositDecimals={poolInfo.depositDecimals}
          stakes={userStakesMap[poolInfo.pid]}
        />
      </ModalWrapper>
    </ActionBoxStyled>
  )
}

export default PoolAction;
