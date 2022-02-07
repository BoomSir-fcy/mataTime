import { useCallback } from 'react';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { useERC20, useSinglePool } from 'hooks/useContract';
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config';
import { BIG_TEN } from 'utils/bigNumber';

const harvestOptions = {
  gasLimit: DEFAULT_GAS_LIMIT,
};

const getDecimal = (decimal?: string) => {
  const tokenDecimal = BIG_TEN.pow(decimal);
  if (tokenDecimal.isFinite()) return tokenDecimal;
  return DEFAULT_TOKEN_DECIMAL;
};

export const useApproveErc20Pool = (address: string, lpAddress: string) => {
  const lpContract = useERC20(address);
  const handleApprove = useCallback(async () => {
    try {
      const tx = await lpContract.approve(
        lpAddress,
        ethers.constants.MaxUint256,
      );
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      return false;
    }
  }, [lpContract, lpAddress]);

  return { onApprove: handleApprove };
};

export const useHarvestStakeId = () => {
  const masterChefContract = useSinglePool();
  const handleHarvest = useCallback(
    async (stakingId: string) => {
      const tx = await masterChefContract.harvest(stakingId, harvestOptions);
      const receipt = await tx.wait();
      return receipt.status;
    },
    [masterChefContract],
  );

  return { onHarvest: handleHarvest };
};

export const useHarvesPoolId = (pid: string) => {
  const masterChefContract = useSinglePool();
  const handleHarvest = useCallback(async () => {
    const tx = await masterChefContract.harvestPool(pid, harvestOptions);
    const receipt = await tx.wait();
    return receipt.status;
  }, [pid, masterChefContract]);

  return { onHarvest: handleHarvest };
};

export const useHarvestAllPool = () => {
  const masterChefContract = useSinglePool();
  const handleHarvest = useCallback(async () => {
    const tx = await masterChefContract.harvestAll(harvestOptions);
    const receipt = await tx.wait();
    return receipt.status;
  }, [masterChefContract]);

  return { onHarvest: handleHarvest };
};

export const useStakePool = (pid: string, decimal?: string) => {
  const masterChefContract = useSinglePool();
  const handleStake = useCallback(
    async amount => {
      const value = new BigNumber(amount).times(getDecimal(decimal)).toString();
      const tx = await masterChefContract.deposit(pid, value, harvestOptions);
      const receipt = await tx.wait();
      return receipt.status;
    },
    [pid, decimal, masterChefContract],
  );

  return { onStake: handleStake };
};

export const useWithdrawPool = () => {
  const masterChefContract = useSinglePool();
  const handleWithdraw = useCallback(
    async (stakingId: string) => {
      const tx = await masterChefContract.withdraw(stakingId, harvestOptions);
      const receipt = await tx.wait();
      return receipt.status;
    },
    [masterChefContract],
  );

  return { onWithdraw: handleWithdraw };
};
