import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Box, Text, Card, Button, InputPanel, Input } from 'uikit';
import Dots from 'components/Loader/Dots';
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useTranslation } from 'contexts/Localization';
import { Container, } from 'components'
import styled from 'styled-components';
import { PoolUserData } from 'store/pools/types';
import BigNumber from 'bignumber.js';
import { formatDisplayBalanceWithSymbol, getFullDisplayBalance } from 'utils/formatBalance';
import PoolStakeInfo, { PoolDispalynUserData } from '../PoolCard/PoolStakeInfo';
import { assignInWith } from 'lodash';


const UnStakeModalBox = styled(Box)`
  width: 88vw;
  padding-top: 8px;
  padding-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 410px;
  }
`

const BoxItemStyled = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 16px 20px;
`

interface UnStakeModalProps {
  onConfirm?: (stakeId: string) => void
  onDismiss?: () => void
  stakes: PoolUserData[]
  depositToken: address
  rewardToken0: address
  rewardToken1: address
  depositSymbol: string
  rewardToken0Symbol: string
  rewardToken1Symbol: string
  rewardToken0Decimals: number
  rewardToken1Decimals: number
  depositDecimals: number
}

const UnstakeBtn: React.FC<{
  stakingId: string,
  onConfirm?: (stakeId: string) => void
  onDismiss?: () => void
}> = ({ onConfirm, onDismiss, stakingId }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()

  return (
    <Button
      disabled={pendingTx}
      onClick={async () => {
        setPendingTx(true)
        try {
          await onConfirm(stakingId)
          onDismiss()
          toast.success(<>
            <Text color='black'>{t('Unstaked!')}</Text>
            <Text color='black'>{t('Your earnings have also been harvested to your wallet')}</Text>
          </>)
        } catch (error) {
          if ((error as any)?.code !== 4001) {
            toast.error(<>
              <Text color='black'>{t('Error')}</Text>
              <Text color='black'>{t('Please try again. Confirm the transaction and make sure you are paying enough gas!')}</Text>
            </>)
          }
        } finally {
          setPendingTx(false)
        }
      }}>
      {
        pendingTx
          ?
          <Dots>{t('Unstaking')}</Dots>
          :
          t('Unstaked')
      }
    </Button>
  )
}

const UnStakeModal: React.FC<UnStakeModalProps> = ({
  onConfirm,
  onDismiss,
  stakes,
  depositToken,
  rewardToken0,
  rewardToken1,
  depositSymbol,
  rewardToken0Symbol,
  rewardToken1Symbol,
  rewardToken0Decimals,
  rewardToken1Decimals,
  depositDecimals,
}) => {
  const { t } = useTranslation()

  const stakesList = useMemo(() => {
    return stakes.map(item => {
      const {
        token0UnclaimedRewards: token0UnclaimedRewardsAsString = '0',
        token1UnclaimedRewards: token1UnclaimedRewardsAsString = '0',
        stakeAmount: stakeAmountAsString = '0',
      } = item
      const token0UnclaimedRewards = new BigNumber(token0UnclaimedRewardsAsString)
      const token1UnclaimedRewards = new BigNumber(token1UnclaimedRewardsAsString)
      const stakeAmount = new BigNumber(stakeAmountAsString)

      const dispalyToken0Rewards = formatDisplayBalanceWithSymbol(token0UnclaimedRewards, rewardToken1Decimals)
      const dispalyToken1Rewards = formatDisplayBalanceWithSymbol(token1UnclaimedRewards, rewardToken0Decimals)
      const dispalyStakeAmount = formatDisplayBalanceWithSymbol(stakeAmount, depositDecimals)

      return {
        ...item,
        stakeAmount,
        token0UnclaimedRewards,
        token1UnclaimedRewards,
        dispalyStakeAmount,
        dispalyToken0Rewards,
        dispalyToken1Rewards,
      }
    })
  }, [stakes])

  const nowTime = new Date().getTime()

  return (
    <UnStakeModalBox>
      {
        stakesList.map(item => (
          <BoxItemStyled key={item.stakingId}>
            <PoolStakeInfo
              depositToken={depositToken}
              rewardToken0={rewardToken0}
              rewardToken1={rewardToken1}
              depositSymbol={depositSymbol}
              rewardToken0Symbol={rewardToken0Symbol}
              rewardToken1Symbol={rewardToken1Symbol}
              stakeAmount={item.stakeAmount}
              token0UnclaimedRewards={item.token0UnclaimedRewards}
              token1UnclaimedRewards={item.token1UnclaimedRewards}
              dispalyStakeAmount={item.dispalyStakeAmount}
              dispalyToken0Rewards={item.dispalyToken0Rewards}
              dispalyToken1Rewards={item.dispalyToken1Rewards}
            >
              {
                Number(item.unlockTime) * 1000 <= nowTime
                  ?
                  <UnstakeBtn stakingId={item.stakingId} onConfirm={onConfirm} onDismiss={onDismiss} />
                  :
                  <Box>
                    <Text textAlign="right">{t('Ending at')}</Text>
                    <Text textAlign="right">{dayjs(Number(item.unlockTime) * 1000).format('YYYY-MM-DD HH:mm')}</Text>
                  </Box>
              }
            </PoolStakeInfo>
          </BoxItemStyled>
        ))
      }
    </UnStakeModalBox>
  )
}

export default UnStakeModal;
