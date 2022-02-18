import { useWeb3React } from '@web3-react/core';
import { useERC721New, useTribeContract } from 'hooks/useContract';
import { useCallback } from 'react';
import { getTribeAddress, getTribeNFTAddress } from 'utils/addressHelpers';

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
        console.log(erc721Contract);

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

export const useTribeNft = () => {
  const tribeContract = useTribeContract();

  const handleClaimOwnerNft = useCallback(
    async (tribeId: number) => {
      try {
        const tx = await tribeContract.claimOnwerNFT(tribeId, {});
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
  return {
    onClaimOwnerNft: handleClaimOwnerNft,
    onStakeOwnerNft: handleStakeOwnerNft,
    onUnStakeOwnerNft: handleUnStakeOwnerNft,
  };
};
