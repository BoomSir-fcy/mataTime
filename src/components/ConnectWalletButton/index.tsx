import React from 'react';
import styled from 'styled-components';
import { Box, Button, ButtonProps } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import Dots from 'components/Loader/Dots';
import useConnectWallet from 'hooks/useConnectWallet';

const WalletButton = styled(Button)`
  width: 205px;
`;

interface ConnectWalletButtonProps extends ButtonProps {
  loading?: number;
}

export const ConnectWalletButton: React.FC<ButtonProps> = props => {
  // const { loading } = props;
  const { t } = useTranslation();

  const { onConnectWallet } = useConnectWallet();

  return (
    <Box>
      <Button
        disabled={props.isLoading}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onConnectWallet();
        }}
        width='205px'
        {...props}
      >
        {Boolean(props.isLoading) ? (
          <Dots>{t('Connect Wallet')}</Dots>
        ) : (
          t('Connect Wallet')
        )}
      </Button>
    </Box>
  );
};
