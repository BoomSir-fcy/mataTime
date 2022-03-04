import { useWeb3React } from '@web3-react/core';
import Dots from 'components/Loader/Dots';
import { useTranslation } from 'contexts';
import { useToast } from 'hooks';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStore } from 'store';
import { fetchIsApproveStakeNft } from 'store/tribe';
import { useApproveTribeStakeNFT, useTribeNft } from '../../hooks';
import { StyledButton } from '../../styled';

export const StakeButton: React.FC<{
  tribeId: number;
  nftId: number;
  nftType: number;
  callback?: () => void;
  [key: string]: any;
}> = ({ tribeId, nftId, nftType, callback, ...props }) => {
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
    try {
      setPending(true);
      // 部落主
      if (nftType === 1) {
        await onStakeOwnerNft(tribeId, nftId);
      }
      // 成员
      if (nftType === 2) {
        await onStakeNft(tribeId, nftId);
      }
      setPending(false);
      toastSuccess(t('Stake succeeded'));
      if (callback) callback();
    } catch (error) {
      console.log(error);
      setPending(false);
      toastError(t('Stake failed'));
    }
  }, [tribeId, nftId, nftType]);

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
              toastSuccess(t('Approve succeeded'));
              dispatch(fetchIsApproveStakeNft({ account }));
            } catch (error) {
              console.log(error);
              toastSuccess(t('Approve failed'));
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
