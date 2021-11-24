import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux'
import { Flex, Box, Text, Card, Button, Heading, BalanceText } from 'uikit';
import { fetchVaultUserAsync } from 'store/pools/thunks';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'contexts/Localization';
import { Container } from 'components'
import { useApproveErc20Pool, useHarvestStakeId } from '../../hooks/pools';
import Dots from 'components/Loader/Dots';
import { getBalanceAmount } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';
import styled from 'styled-components';

const ContainerItem = styled(Container)`
  padding-top: 12px;
  background: ${({ theme }) => theme.card.background};
  padding-bottom: 12px;
`

interface HarvestProps {
  earnings?: string
  isApproved?: boolean
  depositToken: string
  poolAddress: string
  pid: string
  rewardTokenPrice?: BigNumber
}

// TODO: Remove Partial
const PoolActionHarvest: React.FC<HarvestProps> = ({
  earnings = '0',
  isApproved,
  depositToken,
  poolAddress,
  pid,
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

  const { onApprove } = useApproveErc20Pool(depositToken, poolAddress)
  const handleApprove = useCallback(async () => {
    try {
      setPendingTx(true)
      await onApprove()
      dispatch(fetchVaultUserAsync(account))
      setPendingTx(false)
    } catch (e) {
      setPendingTx(false)
      console.error(e)
    }
  }, [onApprove, dispatch, account])

  const { onHarvest } = useHarvestStakeId()
  const onHandleReward = useCallback(async () => {
    try {
      setPendingTx(true)
      // TODO:
      await onHarvest('1')
      setPendingTx(false)
      dispatch(fetchVaultUserAsync(account))
    } catch (error) {
      console.error(error)
      setPendingTx(false)
    }
  }, [onHarvest, dispatch, account])

  return (
    <ContainerItem>
      <Flex justifyContent="center" alignItems="center">
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
    </ContainerItem>
  )
}

export default PoolActionHarvest;
