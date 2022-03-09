import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { DEFAULT_TOKEN_DECIMAL } from 'config';
import { useERC721New, useTribeContract } from 'hooks/useContract';
import { useCallback, useEffect, useState } from 'react';
import { TribeBaseInfo } from 'store/tribe/type';
import {
  getTribeAddress,
  getTribeTicketsNFTAddress,
} from 'utils/addressHelpers';
import { BIG_TEN } from 'utils/bigNumber';
import { getTribeContract } from 'utils/contractHelpers';
import multicall from 'utils/multicall';

export const getBalanceAmount = (amount: string | number, decimal = 18) => {
  if (!amount) return '';
  const tokenDecimal = new BigNumber(amount).dividedBy(BIG_TEN.pow(decimal));
  return tokenDecimal.toString();
};

export const getDecimalAmount = (amount: string | number, decimal?: number) => {
  if (!amount || Number(amount) === 0) return '0';
  const tokenDecimal = new BigNumber(amount).times(BIG_TEN.pow(decimal));
  return tokenDecimal.toString();
};

// 授权部落门票nft
export const useApproveTribeTicketsNFT = () => {
  const { account } = useWeb3React();
  const tribeTicketsNFTAddress = getTribeTicketsNFTAddress();
  const tribeAddress = getTribeAddress();
  const erc721Contract = useERC721New(tribeTicketsNFTAddress);

  const isApproveAll = useCallback(async () => {
    try {
      const isApprove = await erc721Contract.isApprovedForAll(
        account,
        tribeAddress,
      );
      return isApprove;
    } catch (e) {
      throw e;
    }
  }, [erc721Contract, tribeAddress, account]);

  const handleApproveAll = useCallback(async () => {
    try {
      const tx = await erc721Contract.setApprovalForAll(tribeAddress, true);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      throw e;
    }
  }, [erc721Contract, tribeAddress]);

  return { onApproveTicketsNFT: handleApproveAll, isApproveAll };
};

export const useTribe = () => {
  const tribeContract = useTribeContract();
  const { account } = useWeb3React();
  const [status, setStatus] = useState('start');

  const CheckUniqueName = useCallback(
    async (name: string) => {
      try {
        const unique = await tribeContract.unique_name(name);
        return unique;
      } catch (error) {
        return true;
      }
    },
    [tribeContract],
  );

  const setTribeBaseInfo = useCallback(
    async (tribeId: number, tribeInfo: TribeBaseInfo) => {
      try {
        const tx = await tribeContract.setTribeExtraInfo(
          tribeId,
          tribeInfo.introduction,
          {},
        );
        const receipt = await tx.wait();
        return receipt.status;
      } catch (error) {
        throw error;
      }
    },
    [tribeContract],
  );

  const setTribeFeeInfo = useCallback(
    async (tribeId: number, tribeInfo: TribeBaseInfo) => {
      try {
        const tx = await tribeContract.updateTribeFeeSetting(
          tribeId,
          tribeInfo.feeToken,
          tribeInfo.feeAmount,
          tribeInfo.validDate,
          {},
        );
        const receipt = await tx.wait();
        return receipt.status;
      } catch (error) {
        throw error;
      }
    },
    [tribeContract],
  );

  const CreateTribe = useCallback(
    async (tribeInfo: TribeBaseInfo) => {
      try {
        const tx = await tribeContract.createTribe(
          tribeInfo.name,
          tribeInfo.logo,
          tribeInfo.introduction,
          tribeInfo.feeToken,
          tribeInfo.feeAmount,
          tribeInfo.validDate,
          tribeInfo.perTime,
          tribeInfo.ownerPercent,
          tribeInfo.authorPercent,
          tribeInfo.memberPercent,
          tribeInfo.nftAddress,
          tribeInfo.nftid,
          {},
        );
        setStatus('waiting');
        const receipt = await tx.wait();
        setStatus('success');
        return receipt.status;
      } catch (error) {
        setStatus('start');
        throw error;
      }
    },
    [tribeContract],
  );

  return {
    createStatus: status,
    onCheckUniqueName: CheckUniqueName,
    onCreateTribe: CreateTribe,
    onSetTribeBaseInfo: setTribeBaseInfo,
    onSetTribeFeeInfo: setTribeFeeInfo,
  };
};
