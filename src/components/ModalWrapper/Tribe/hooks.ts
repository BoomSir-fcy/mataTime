import { useWeb3React } from '@web3-react/core';
import { useTribeContract } from 'hooks/useContract';
import { useCallback } from 'react';

export const useJoinTribe = () => {
  const tribeContract = useTribeContract();
  const { account } = useWeb3React();

  const joinTribe = useCallback(
    async (tribeId: number, eth?: string) => {
      console.log('joinTribe', tribeId, eth);
      try {
        const tx = await tribeContract.ClaimMemberNFT(tribeId);
        const receipt = await tx.wait();
        console.log('receipt', receipt);
        return receipt.status;
      } catch (error) {
        throw error;
      }
    },
    [tribeContract],
  );

  return {
    joinTribe,
  };
};
