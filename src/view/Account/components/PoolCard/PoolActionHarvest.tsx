import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux'
import { Flex, Box, Text, Card, Button, Heading, BalanceText } from 'uikit';
import { fetchVaultUserAsync } from 'store/pools/thunks';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'contexts/Localization';
import { Container } from 'components'
import { useApproveErc20Pool, useHarvestPool } from '../../hooks/pools';
import Dots from 'components/Loader/Dots';
import { getBalanceAmount } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';


interface HarvestProps {
  earnings?: string
  isApproved?: boolean
  stakeAddress: string
  poolAddress: string
  poolId: string
  rewardTokenPrice?: BigNumber
}

// TODO: Remove Partial
const PoolActionHarvest: React.FC<Partial<HarvestProps>> = ({
  earnings = '0',
  isApproved,
  stakeAddress,
  poolAddress,
  poolId,
  rewardTokenPrice,
}) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [pendingTx, setPendingTx] = useState(false)


  const userValues = useMemo(() => {
    const rawEarningsBalance = account ? getBalanceAmount(new BigNumber(earnings)) : BIG_ZERO
    const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
    const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(rewardTokenPrice).toNumber() : 0
    return {
      rawEarningsBalance,
      displayBalance,
      earningsBusd,
    }
  }, [account, earnings, rewardTokenPrice])

  // const { onApprove } = useApproveErc20Pool(stakeAddress, poolAddress)
  const onApprove = () => { }
  const handleApprove = useCallback(async () => {
    try {
      setPendingTx(true)
      await onApprove()
      dispatch(fetchVaultUserAsync(account))
      setPendingTx(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account])

  // const { onHarvest } = useHarvestPool(poolId)
  const onHarvest = () => { }
  const onHandleReward = useCallback(async () => {
    setPendingTx(true)
    await onHarvest()
    setPendingTx(false)
    dispatch(fetchVaultUserAsync(account))
  }, [onHarvest, dispatch, account])

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <Text color="textTips">Rewards</Text>
        <Flex flexDirection="column" alignItems="flex-start">
          <Heading color={userValues.rawEarningsBalance.eq(0) ? 'textDisabled' : 'primary'}>
            {userValues.displayBalance}
          </Heading>
          {userValues.earningsBusd > 0 && (
            <BalanceText
              fontSize="12px"
              color="textSubtle"
              decimals={2}
              value={userValues.earningsBusd}
              unit=""
              prefix="$ " />
          )}
        </Flex>
      </Box>
      <Box>
        {
          !isApproved
            ?
            (<Button disabled={pendingTx} onClick={handleApprove}>
              {
                pendingTx
                  ?
                  <Dots>{t('Enabling')}</Dots>
                  :
                  t('Enable')
              }
            </Button>)
            :
            (<Button disabled={pendingTx} onClick={onHandleReward}>
              {
                pendingTx
                  ?
                  <Dots>{t('Harvesting')}</Dots>
                  :
                  t('Harvest')
              }
            </Button>)
        }

      </Box>
    </Flex>
  )
}

export default PoolActionHarvest;
