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
      } catch (error: any) {
        // const messgae = error?.data?.message;
        const code = error?.code ?? 0;
        return code;
      }
    },
    [tribeContract],
  );

  return {
    joinTribe,
  };
};
