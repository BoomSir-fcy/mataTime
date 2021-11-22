import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useERC20, useLiquidityPool } from 'hooks/useContract'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { getLiquidityPool } from 'src/utils/addressHelpers'
import { BIG_TEN } from 'utils/bigNumber'

const harvestOptions = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const getDecimal = (decimal?: string) => {
  const tokenDecimal = BIG_TEN.pow(decimal)
  if (tokenDecimal.isFinite()) return tokenDecimal
  return DEFAULT_TOKEN_DECIMAL
}

export const useApproveErc20Pools = (address: string) => {
  const lpAddress = getLiquidityPool()
  const lpContract = useERC20(address)
  const handleApprove = useCallback(async () => {
    try {
      const tx = await lpContract.approve(lpAddress, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [lpContract])

  return { onApprove: handleApprove }
}

export const useHarvestPools = (pid: number) => {
  const masterChefContract = useLiquidityPool()
  const handleHarvest = useCallback(async () => {
    const tx = await masterChefContract.withdraw(pid, '0', harvestOptions)
    const receipt = await tx.wait()
    return receipt.status
  }, [pid, masterChefContract])

  return { onHarvest: handleHarvest }
}

export const useStakePools = (pid: number, decimal?: string) => {
  const masterChefContract = useLiquidityPool()
  const handleStake = useCallback(async (amount) => {
    const value = new BigNumber(amount).times(getDecimal(decimal)).toString()
    const tx = await masterChefContract.deposit(pid, value, harvestOptions)
    const receipt = await tx.wait()
    return receipt.status
  }, [pid, masterChefContract])

  return { onStake: handleStake }
}

export const useWithdrawPools = (pid: number, decimal?: string) => {
  const masterChefContract = useLiquidityPool()
  const handleWithdraw = useCallback(async (amount) => {
    const value = new BigNumber(amount).times(getDecimal(decimal)).toString()
    const tx = await masterChefContract.depwithdrawosit(pid, value, harvestOptions)
    const receipt = await tx.wait()
    return receipt.status
  }, [pid, masterChefContract])

  return { onWithdraw: handleWithdraw }
}
