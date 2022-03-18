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

const StyledButton = styled(Button)<{ width?: string }>`
  width: ${({ width }) => width || '250px'};
`;

export const TribeCreateBtn: React.FC<{
  pending?: boolean;
  hasNft?: boolean;
  [key: string]: any;
}> = React.memo(({ hasNft, pending, ...props }) => {
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
        {...props}
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
      <Button {...props} width='250px' as={Link} to='/account/tribe-ticket'>
        {t('Get Tribe Tickets')}
      </Button>
    );
  }

  return (
    <>
      {state.isApprove ? (
        <StyledButton disabled={pending} {...props} type='submit'>
          {pending ? <Dots>{t('Pay and Create')}</Dots> : t('Pay and Create')}
        </StyledButton>
      ) : (
        <StyledButton
          {...props}
          disabled={state.pending}
          onClick={async e => {
            e.stopPropagation();
            e.preventDefault();
            setState(p => {
              p.pending = true;
            });
            try {
              await onApproveTicketsNFT();
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
          {state.pending ? <Dots>{t('Approve')}</Dots> : t('Approve')}
        </StyledButton>
      )}
    </>
  );
});
