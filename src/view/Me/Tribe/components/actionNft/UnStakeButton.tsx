import { useWeb3React } from '@web3-react/core';
import Dots from 'components/Loader/Dots';
import { useTranslation } from 'contexts';
import { useToast } from 'hooks';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NftStatus, TribeBelongNft } from 'store/tribe/type';
import { useTribeNft } from '../../hooks';
import { StyledButton } from '../../styled';

export const UnStakeButton: React.FC<{
  tribeId: number;
  nftType: number;
  status?: number;
  callback?: () => void;
  [key: string]: any;
}> = ({ tribeId, nftType, status, callback, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toastSuccess, toastError } = useToast();
  const { onUnStakeOwnerNft, onUnStakeNft } = useTribeNft();
  const [pending, setPending] = useState(false);

  // 取消质押nft
  const handleUnStakeNft = useCallback(async () => {
    if (status && status === NftStatus.Expired) {
      toastError(t('The current NFT has expired'));
      return false;
    }
    try {
      setPending(true);
      // 部落主
      if (nftType === TribeBelongNft.Owner) {
        await onUnStakeOwnerNft(tribeId);
      }
      // 成员
      if (nftType === TribeBelongNft.Member) {
        await onUnStakeNft(tribeId);
      }
      toastSuccess(t('UnStake succeeded'));
      setPending(false);
      if (callback) callback();
    } catch (error) {
      console.log(error);
      toastError(t('UnStake failed'));
      setPending(false);
    }
  }, [tribeId, nftType, status]);

  return (
    <StyledButton
      {...props}
      disabled={pending}
      onClick={() => {
        handleUnStakeNft();
      }}
    >
      {pending ? <Dots>{t('UnStake')}</Dots> : t('UnStake')}
    </StyledButton>
  );
};
