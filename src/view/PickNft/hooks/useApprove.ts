import { useCallback } from 'react';
import { useTicketNftContract } from 'hooks/useContract';
import { getExPhotoAddress } from 'utils/addressHelpers';

export const useNftApproveExPhoto = () => {
  const address = getExPhotoAddress();
  const dsgNftContract = useTicketNftContract();
  const handleApprove = useCallback(async () => {
    try {
      const tx = await dsgNftContract.setApprovalForAll(address, true);
      const receipt = await tx.wait();
      return true;
    } catch (error) {
      return false;
    }
  }, [dsgNftContract, address]);

  return { onApprove: handleApprove };
};
