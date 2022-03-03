import { useWeb3React } from '@web3-react/core';
import { useERC721New, useTribeContract } from 'hooks/useContract';
import { useCallback } from 'react';
import { getTribeAddress, getTribeNFTAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';
import tribeAbi from 'config/abi/tribe.json';

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
export const getInitMemberNftList = async (tribeIds: number[]) => {
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
        const tx = await tribeContract.settinginvitaion(tribeId, rate);
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
        const tx = await tribeContract.claimOnwerNFT(tribeId);
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
