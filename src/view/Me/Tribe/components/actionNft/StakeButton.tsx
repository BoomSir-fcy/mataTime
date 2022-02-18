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
}> = ({ tribeId, nftId, nftType, callback }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { toastSuccess } = useToast();
  const [pending, setPending] = useState(false);
  const { onApproveTribeNFT } = useApproveTribeStakeNFT();
  const { onStakeOwnerNft } = useTribeNft();

  const isApproved = useStore(p => p.tribe.isApproveStakeNft);

  // 质押nft
  const handleStakeNft = useCallback(async () => {
    try {
      // 部落主
      if (nftType === 1) {
        await onStakeOwnerNft(tribeId, nftId);
        toastSuccess(t('质押部落主nft成功！'));
      }

      // 成员
      if (nftType === 2) {
        // await onStakeOwnerNft(tribeId, nftId);
      }
      if (callback) callback();
    } catch (error) {
      console.log(error);
      toastSuccess(t('质押nft失败！'));
    }
  }, [tribeId, nftId, nftType]);

  return (
    <>
      {isApproved ? (
        <StyledButton
          onClick={() => {
            handleStakeNft();
          }}
        >
          {t('质押')}
        </StyledButton>
      ) : (
        <StyledButton
          disabled={pending}
          onClick={async e => {
            e.stopPropagation();
            e.preventDefault();
            setPending(true);
            try {
              await onApproveTribeNFT();
              toastSuccess(t('授权成功！'));
              dispatch(fetchIsApproveStakeNft({ account }));
            } catch (error) {
              toastSuccess(t('授权失败！'));
              console.log(error);
            } finally {
              setPending(false);
            }
          }}
        >
          {pending ? <Dots>{t('Approving')}</Dots> : t('Approve')}
        </StyledButton>
      )}
    </>
  );
};
