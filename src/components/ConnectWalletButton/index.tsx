import React from 'react';
import styled from 'styled-components';
import { Box, Button } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import Dots from 'components/Loader/Dots';
import useConnectWallet from 'hooks/useConnectWallet';

const WalletButton = styled(Button)`
  width: 205px;
`;

export const ConnectWalletButton: React.FC<{
  loading?: boolean;
}> = props => {
  const { loading } = props;
  const { t } = useTranslation();

  const { onConnectWallet } = useConnectWallet();

  return (
    <Box
      style={{
        position: 'absolute',
        bottom: '-10px'
      }}
    >
      <WalletButton onClick={onConnectWallet} {...props}>
        {loading ? <Dots>{t('Connect Wallet')}</Dots> : t('Connect Wallet')}
      </WalletButton>
    </Box>
  );
};
