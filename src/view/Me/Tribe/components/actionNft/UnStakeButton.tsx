import { useWeb3React } from '@web3-react/core';
import Dots from 'components/Loader/Dots';
import { useTranslation } from 'contexts';
import { useToast } from 'hooks';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStore } from 'store';
import { fetchIsApproveStakeNft } from 'store/tribe';
import { NftStatus } from 'store/tribe/type';
import { useApproveTribeStakeNFT, useTribeNft } from '../../hooks';
import { StyledButton } from '../../styled';

export const UnStakeButton: React.FC<{
  tribeId: number;
  nftType: number;
  callback?: () => void;
}> = ({ tribeId, nftType, callback }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toastSuccess } = useToast();
  const { onUnStakeOwnerNft } = useTribeNft();

  // 取消质押nft
  const handleUnStakeNft = useCallback(async () => {
    try {
      // 部落主
      if (nftType === 1) {
        await onUnStakeOwnerNft(tribeId);
        toastSuccess(t('取消质押部落主nft成功！'));
      }
      // 成员
      if (nftType === 2) {
        // await onStakeOwnerNft(tribeId, nftId);
      }
      if (callback) callback();
    } catch (error) {
      console.log(error);
      toastSuccess(t('取消质押nft失败！'));
    }
  }, [tribeId, nftType]);

  return (
    <StyledButton
      onClick={() => {
        handleUnStakeNft();
      }}
    >
      {t('取消质押')}
    </StyledButton>
  );
};
