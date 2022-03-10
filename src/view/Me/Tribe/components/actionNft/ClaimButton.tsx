import { useWeb3React } from '@web3-react/core';
import Dots from 'components/Loader/Dots';
import { useTranslation } from 'contexts';
import { useToast } from 'hooks';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTribeExtraInfo, useTribeNft } from '../../hooks';
import { StyledButton } from '../../styled';

export const ClaimButton: React.FC<{
  tribeId: number;
  nftType: number;
  callback?: () => void;
  [key: string]: any;
}> = ({ tribeId, nftType, callback, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const { onClaimOwnerNft } = useTribeNft();

  // 领取
  const handleClaimOwnerNft = useCallback(async () => {
    try {
      setPending(true);
      const list = await getTribeExtraInfo([tribeId]);
      if (list[0]?.claimOwnerNFT) {
        toastError(t('Confirming service, please refresh manually'));
        setPending(false);
        return false;
      }
      await onClaimOwnerNft(tribeId);
      setPending(false);
      if (callback) callback();
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  }, [tribeId]);

  return (
    <StyledButton
      {...props}
      disabled={pending}
      onClick={() => {
        handleClaimOwnerNft();
      }}
    >
      {pending ? <Dots>{t('Time Claim')}</Dots> : t('Time Claim')}
    </StyledButton>
  );
};
