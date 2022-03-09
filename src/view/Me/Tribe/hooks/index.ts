import { useWeb3React } from '@web3-react/core';
import { useERC20, useERC721New, useTribeContract } from 'hooks/useContract';
import { useCallback } from 'react';
import { getTribeAddress, getTribeNFTAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';
import tribeAbi from 'config/abi/tribe.json';
import { getBalanceNumber } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import erc20Abi from 'config/abi/erc20.json';
import { ethers } from 'ethers';

// 授权质押nft
export const useApproveTribeStakeNFT = () => {
  const { account } = useWeb3React();
  const tribeNFTAddress = getTribeNFTAddress();
  const tribeAddress = getTribeAddress();
  const erc721Contract = useERC721New(tribeNFTAddress);

  const handleApproveAll = useCallback(async () => {
    try {
      const tx = await erc721Contract.setApprovalForAll(tribeAddress, true);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      throw e;
    }
  }, [erc721Contract, tribeAddress]);

  return {
    onApproveTribeNFT: handleApproveAll,
  };
};

// 转让
export const useTranferNft = () => {
  const { account } = useWeb3React();
  const tribeNFTAddress = getTribeNFTAddress();
  const tribeAddress = getTribeAddress();
  const erc721Contract = useERC721New(tribeNFTAddress);

  const handleTranferNft = useCallback(
    async (address: string, tokenId: number) => {
      try {
        const tx = await erc721Contract.safeTransferFrom(
          account,
          address,
          tokenId,
          {},
        );
        const receipt = await tx.wait();
        return receipt.status;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    [erc721Contract, tribeAddress],
  );

  return {
    onTranferNft: handleTranferNft,
  };
};

// 查询部落是否设置成员nft
export const getTribeExtraInfo = async (tribeIds: number[]) => {
  const address = getTribeAddress();
  const calls = tribeIds.map(item => {
    return { address, name: 'extraTribesInfo', params: [item] };
  });
  try {
    const list = await multicall(tribeAbi, calls);
    return list;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useTribeNft = () => {
  const tribeContract = useTribeContract();

  const handleSettingInvitation = useCallback(
    async (tribeId: number, rate: string | number) => {
      try {
        const tx = await tribeContract.settingInvitaion(tribeId, rate);
        const receipt = await tx.wait();
        return receipt.status;
      } catch (error) {
        throw error;
      }
    },
    [tribeContract],
  );

  const handleClaimOwnerNft = useCallback(
    async (tribeId: number) => {
      try {
        const tx = await tribeContract.claimOwnerNFT(tribeId);
        const receipt = await tx.wait();
        return receipt.status;
      } catch (error) {
        throw error;
      }
    },
    [tribeContract],
  );

  const handleStakeOwnerNft = useCallback(
    async (tribeId: number, nftId: number) => {
      try {
        const tx = await tribeContract.stakeOwnNFT(tribeId, nftId, {});
        const receipt = await tx.wait();
        return receipt.status;
      } catch (error) {
        throw error;
      }
    },
    [tribeContract],
  );
  const handleUnStakeOwnerNft = useCallback(
    async (tribeId: number) => {
      try {
        const tx = await tribeContract.unOwnStake(tribeId, {});
        const receipt = await tx.wait();
        return receipt.status;
      } catch (error) {
        throw error;
      }
    },
    [tribeContract],
  );

  const setTribeMemberNFT = useCallback(
    async (memberNftInfo: any) => {
      try {
        const tx = await tribeContract.setTribeMemberNFT(
          memberNftInfo.tribeId,
          memberNftInfo.logo,
          memberNftInfo.name,
          memberNftInfo.introduction,
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

  const handleStakeNft = useCallback(
    async (tribeId: number, nftId: number) => {
      try {
        const tx = await tribeContract.stakeNFT(tribeId, nftId, {});
        const receipt = await tx.wait();
        return receipt.status;
      } catch (error) {
        throw error;
      }
    },
    [tribeContract],
  );

  const handleUnStakeNft = useCallback(
    async (tribeId: number) => {
      try {
        const tx = await tribeContract.unStakeNFT(tribeId, {});
        const receipt = await tx.wait();
        return receipt.status;
      } catch (error) {
        throw error;
      }
    },
    [tribeContract],
  );

  return {
    onSettingInvitation: handleSettingInvitation,
    onClaimOwnerNft: handleClaimOwnerNft,
    onStakeOwnerNft: handleStakeOwnerNft,
    onUnStakeOwnerNft: handleUnStakeOwnerNft,
    onSetTribeMemberNFT: setTribeMemberNFT,
    onStakeNft: handleStakeNft,
    onUnStakeNft: handleUnStakeNft,
  };
};

// 获取删除成员退币数量
export const FetchRefundsAmount = async (nftId: number) => {
  const Tribe = getTribeAddress();
  const calls = [
    {
      address: Tribe,
      name: 'getRollbackAmount',
      params: [nftId],
    },
  ];
  try {
    const RewardNum = await multicall(tribeAbi, calls);
    return getBalanceNumber(new BigNumber(RewardNum[0][0].toJSON().hex));
  } catch (error) {
    throw error;
  }
};

// 获取退币币种授权数量
export const FetchTokenApproveNum = async (
  account: string,
  tokenAddr: string,
) => {
  const Tribe = getTribeAddress();
  const calls = [
    {
      address: tokenAddr,
      name: 'allowance',
      params: [account, Tribe],
    },
  ];
  try {
    const approvedNum = await multicall(erc20Abi, calls);
    return getBalanceNumber(approvedNum);
  } catch (error) {
    throw error;
  }
};

// 删除、授权
export function useTribeMemberAction(address: string) {
  const TokenContract = useERC20(address);
  const Tribe = getTribeAddress();

  // 授权
  const onApprove = useCallback(async () => {
    try {
      const tx = await TokenContract.approve(
        Tribe,
        ethers.constants.MaxUint256,
      );
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      throw e;
    }
  }, [TokenContract, Tribe]);

  return {
    onApprove,
  };
}

export function useTribeMemberDelete() {
  const tribeContract = useTribeContract();

  // 删除
  const DeleteNFTFromTribe = useCallback(
    async (nft_id: number) => {
      try {
        const tx = await tribeContract.rollbackNFTFromTribe(nft_id);
        const receipt = await tx.wait();
        return receipt.status;
      } catch (error) {
        throw error;
      }
    },
    [tribeContract],
  );
  return { DeleteNFTFromTribe };
}
