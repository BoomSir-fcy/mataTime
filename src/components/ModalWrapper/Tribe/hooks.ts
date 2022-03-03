import { useTribeContract } from 'hooks/useContract';
import { useCallback } from 'react';

export const useJoinTribe = () => {
  const tribeContract = useTribeContract();

  const joinTribe = useCallback(
    async (
      tribeId: number,
      invaiteAddress: string,
      amount?: number | string,
    ) => {
      console.log('joinTribe', tribeId, invaiteAddress, amount);
      try {
        const tx = await tribeContract.ClaimMemberNFT(tribeId, invaiteAddress, {
          value: !amount ? '' : amount,
        });
        const receipt = await tx.wait();
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
