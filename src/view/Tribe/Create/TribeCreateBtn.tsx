import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import Dots from 'components/Loader/Dots';
import { useTranslation } from 'contexts';
import useConnectWallet from 'hooks/useConnectWallet';
import { Link } from 'react-router-dom';
import { NftInfo } from 'store/tribe/type';
import styled from 'styled-components';
import { Button, Flex } from 'uikit';
import { useImmer } from 'use-immer';
import { useApproveTribeTicketsNFT } from './hooks';
import { useToast } from 'hooks';

const StyledButton = styled(Button)`
  width: 250px;
`;

export const TribeCreateBtn: React.FC<{
  hasNft?: boolean;
  activeNftInfo?: NftInfo;
}> = React.memo(({ hasNft, activeNftInfo }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { toastError } = useToast();
  const { onConnectWallet } = useConnectWallet();
  const { onApproveTicketsNFT, isApproveAll } = useApproveTribeTicketsNFT();

  const [state, setState] = useImmer({
    pending: false,
    isApprove: false,
  });

  useEffect(() => {
    const getNftApprove = async () => {
      const isApprove = await isApproveAll();
      setState(p => {
        p.isApprove = isApprove;
      });
    };

    if (account && hasNft) {
      getNftApprove();
    }
  }, [account, hasNft]);

  if (!account) {
    return (
      <StyledButton
        margin='10px 0'
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          onConnectWallet();
        }}
      >
        {t('Connect Wallet')}
      </StyledButton>
    );
  }
  if (!hasNft) {
    return (
      <StyledButton as={Link} to='/account'>
        {t('Get Tribe Tickets')}
      </StyledButton>
    );
  }

  return (
    <>
      {state.isApprove ? (
        <StyledButton type='submit'>{t('Pay and Create')}</StyledButton>
      ) : (
        <StyledButton
          disabled={state.pending}
          onClick={async e => {
            e.stopPropagation();
            e.preventDefault();
            if (!activeNftInfo.nftId) {
              toastError(t('请选择头像'));
              return false;
            }
            setState(p => {
              p.pending = true;
            });
            try {
              await onApproveTicketsNFT();
              console.log('22222222222');

              setState(p => {
                p.isApprove = true;
              });
            } catch (error) {
              console.log(error);
            } finally {
              setState(p => {
                p.pending = false;
              });
            }
          }}
        >
          {state.pending ? <Dots>{t('Approving')}</Dots> : t('Approve')}
        </StyledButton>
      )}
    </>
  );
});
