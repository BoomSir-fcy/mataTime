import { useWeb3React } from '@web3-react/core';
import Dots from 'components/Loader/Dots';
import { useTranslation } from 'contexts';
import { useToast } from 'hooks';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStore } from 'store';
import { fetchIsApproveStakeNft } from 'store/tribe';
import { setOrGetTribeExpireToasted } from 'utils';
import { NftStatus, TribeBelongNft } from 'store/tribe/type';
import {
  isExistStakeNft,
  useApproveTribeStakeNFT,
  useTribeNft,
} from '../../hooks';
import { StyledButton } from '../../styled';

export const StakeButton: React.FC<{
  tribeId: number;
  nftId: number;
  nftType: number;
  status?: number;
  callback?: () => void;
  [key: string]: any;
}> = ({ tribeId, nftId, nftType, status, callback, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { toastSuccess, toastError } = useToast();
  const [pending, setPending] = useState(false);
  const { onApproveTribeNFT } = useApproveTribeStakeNFT();
  const { onStakeOwnerNft, onStakeNft } = useTribeNft();

  const isApproved = useStore(p => p.tribe.isApproveStakeNft);

  // 质押nft
  const handleStakeNft = useCallback(async () => {
    setPending(true);
    // 当用户同时拥有一个部落的多个nft时，只能质押一种nft
    const isExistStake = await isExistStakeNft(account, [tribeId]);
    if (isExistStake[0] > 0) {
      toastError(t('NFT that have staked'));
      setPending(false);
      return false;
    }
    if (status && status === NftStatus.Expired) {
      toastError(t('The current NFT has expired'));
      setPending(false);
      return false;
    }
    try {
      // 部落主
      if (nftType === TribeBelongNft.Owner) {
        await onStakeOwnerNft(tribeId, nftId);
      }
      // 成员
      if (nftType === TribeBelongNft.Member) {
        await onStakeNft(tribeId, nftId);
      }
      setPending(false);
      toastSuccess(t('Stake succeeded'));
      setOrGetTribeExpireToasted(tribeId, 0);
      if (callback) callback();
    } catch (error) {
      console.log(error);
      setPending(false);
      toastError(t('Stake failed'));
    }
  }, [tribeId, nftId, nftType, status]);

  return (
    <>
      {isApproved ? (
        <StyledButton
          {...props}
          disabled={pending}
          onClick={() => {
            handleStakeNft();
          }}
        >
          {pending ? <Dots>{t('NftStake')}</Dots> : t('NftStake')}
        </StyledButton>
      ) : (
        <StyledButton
          {...props}
          disabled={pending}
          onClick={async e => {
            e.stopPropagation();
            e.preventDefault();
            setPending(true);
            try {
              await onApproveTribeNFT();
              toastSuccess(t('Approve Succeeded'));
              dispatch(fetchIsApproveStakeNft({ account }));
            } catch (error) {
              console.log(error);
              toastSuccess(t('Approve Failed'));
            } finally {
              setPending(false);
            }
          }}
        >
          {pending ? <Dots>{t('Approve')}</Dots> : t('Approve')}
        </StyledButton>
      )}
    </>
  );
};
