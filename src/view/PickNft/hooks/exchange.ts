import { useCallback } from 'react';
import { useInvitation } from 'hooks/useContract';
import { exchangeToPhtot, lockInviteCode } from 'utils/myCalls';
import isZero from 'utils/isZero';

export enum ExChangeResult {
  AVATAR_EXISTS,
  SUFF_NOT_LEFT,
  SUCCESS,
}

export const useExchangePhoto = () => {
  const masterContract = useInvitation();
  const handleExchange = useCallback(
    async (ids: number[], nickname: string, code: string, color: string) => {
      console.debug(ids, nickname);
      const tx = await masterContract.encodeToken(ids);
      const owner = await masterContract._nft_address(tx.toJSON());
      if (!isZero(owner)) return ExChangeResult.AVATAR_EXISTS; // 此头像已存在
      const exists = await masterContract.checkTokenID(tx.toJSON());

      if (!exists) return ExChangeResult.SUFF_NOT_LEFT; // 此头像已存在
      console.log(12211221)
      console.log(
        nickname,
        code,
        tx.toJSON().hex,
        color,
      )
      const receipt = await exchangeToPhtot(
        masterContract,
        nickname,
        code,
        tx.toJSON().hex,
        color,
      );
      return ExChangeResult.SUCCESS;
    },
    [masterContract],
  );

  return { onExchange: handleExchange };
};

export const useLockInviteCode = () => {
  const masterContract = useInvitation();
  const handleLockCode = useCallback(
    async (code: string) => {
      const receipt = await lockInviteCode(
        masterContract,
        code,
      );
      return receipt
    },
    [masterContract],
  );

  return { onLockCode: handleLockCode };
};
