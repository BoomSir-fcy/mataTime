import { useCallback } from 'react';
import { useExPhotoContract } from 'hooks/useContract';
import { exchangeToPhtot } from 'utils/myCalls';
import isZero from 'utils/isZero';

export enum ExChangeResult {
  AVATAR_EXISTS,
  SUFF_NOT_LEFT,
  SUCCESS,
}

export const useExchangePhoto = () => {
  const masterContract = useExPhotoContract();
  const handleExchange = useCallback(
    async (ids: number[], tokenId: string, color: string) => {
      console.debug(ids, tokenId);
      const tx = await masterContract.encodeToken(ids);
      const owner = await masterContract._nft_address(tx.toJSON());
      if (!isZero(owner)) return ExChangeResult.AVATAR_EXISTS; // 此头像已存在
      const exists = await masterContract.checkTokenID(tx.toJSON());

      if (!exists) return ExChangeResult.SUFF_NOT_LEFT; // 此头像已存在
      const receipt = await exchangeToPhtot(
        masterContract,
        tokenId,
        tx.toJSON().hex,
        color,
      );
      return ExChangeResult.SUCCESS;
    },
    [masterContract],
  );

  return { onExchange: handleExchange };
};
