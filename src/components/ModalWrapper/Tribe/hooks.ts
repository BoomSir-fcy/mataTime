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
        const messgae = error?.data?.message;
        switch (messgae) {
          case 'execution reverted: ERC20: transfer amount exceeds balance':
            return 400002;
          case 'execution reverted: invliad address.':
            return 400001;
          default:
            return error?.code ?? 0;
        }
      }
    },
    [tribeContract],
  );

  return {
    joinTribe,
  };
};
