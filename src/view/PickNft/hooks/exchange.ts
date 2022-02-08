import { useCallback } from 'react';
import { useInvitation } from 'hooks/useContract';
import {
  exchangeToPhtot,
  lockInviteCode,
  exchangeAndBuyToPhtot,
  estimateGas,
} from 'utils/myCalls';
import isZero from 'utils/isZero';
import { useBiconomyInvitationExcute } from './useBiconomyInvitationExcute';
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance';
import { getInvitationContract } from 'utils/contractHelpers';
import { useGasprice } from 'hooks/useGasprice';

export enum ExChangeResult {
  AVATAR_EXISTS,
  SUFF_NOT_LEFT,
  SUCCESS,
}

export const useExchangePhoto = () => {
  const masterContract = useInvitation();
  const { executeMetaTransaction } = useBiconomyInvitationExcute()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { gasPirce } = useGasprice()
  const handleExchange = useCallback(
    async (ids: number[], nickname: string, code: string, color: string) => {
      // console.debug(ids, nickname);
      const tx = await masterContract.encodeToken(ids);
      const owner = await masterContract._nft_address(tx.toJSON());
      if (!isZero(owner)) return ExChangeResult.AVATAR_EXISTS; // 此头像已存在
      const exists = await masterContract.checkTokenID(tx.toJSON());
      if (!exists) return ExChangeResult.SUFF_NOT_LEFT; // 物件个数用完了

      const gasLimitVal = await estimateGas(masterContract, 'exchange', [
        nickname,
        code,
        tx.toJSON().hex,
        color,
      ])
      const fee = gasPirce.times(gasLimitVal.toString())
      const noGas = !(fetchStatus === FetchStatus.SUCCESS && balance.isGreaterThanOrEqualTo(fee));

      let receipt = null
      if (noGas) {
        receipt = await executeMetaTransaction('exchange', [
          nickname,
          code,
          tx.toJSON().hex,
          color,
        ]);
      } else {
        receipt = await exchangeToPhtot(
          masterContract,
          nickname,
          code,
          tx.toJSON().hex,
          color,
        );
      }
      return ExChangeResult.SUCCESS;
    },
    [masterContract, executeMetaTransaction, balance, gasPirce, fetchStatus],
  );

  return { onExchange: handleExchange };
};

export const useExchangeAndBuyPhoto = () => {
  const masterContract = useInvitation();
  const handleExchange = useCallback(
    async (ids: number[], color: string, value: string) => {
      const tx = await masterContract.encodeToken(ids);
      const owner = await masterContract._nft_address(tx.toJSON());
      if (!isZero(owner)) return ExChangeResult.AVATAR_EXISTS; // 此头像已存在
      const exists = await masterContract.checkTokenID(tx.toJSON());

      if (!exists) return ExChangeResult.SUFF_NOT_LEFT; // 此头像已存在
      const receipt = await exchangeAndBuyToPhtot(
        masterContract,
        tx.toJSON().hex,
        color,
        value,
      );
      return ExChangeResult.SUCCESS;
    },
    [masterContract],
  );

  return { onExchange: handleExchange };
};

export const useLockInviteCode = () => {
  const masterContract = useInvitation();
  
  const { executeMetaTransaction } = useBiconomyInvitationExcute()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { gasPirce } = useGasprice()

  const handleLockCode = useCallback(
    async (code: string) => {
      const haxCode = `0x${code}`
      const gasLimitVal = await estimateGas(masterContract, 'lockCode', [haxCode])
      const fee = gasPirce.times(gasLimitVal.toString())
      const noGas = !(fetchStatus === FetchStatus.SUCCESS && balance.isGreaterThanOrEqualTo(fee));

      let receipt = null;
      if (noGas) {
        receipt = await executeMetaTransaction('lockCode', [haxCode]);
      } else {
        receipt = await lockInviteCode(masterContract, haxCode);
      }
      return receipt;
    },
    [masterContract, executeMetaTransaction, balance, gasPirce, fetchStatus ],
  );

  return { onLockCode: handleLockCode };
};
