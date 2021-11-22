import React from 'react';
import styled from 'styled-components';
import { Box, Button } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import useConnectWallet from 'hooks/useConnectWallet';

const WalletButton = styled(Button)`
  width: 205px;
`;

export const ConnectWalletButton: React.FC = props => {
  const { t } = useTranslation();

  const { onConnectWallet } = useConnectWallet();

  return (
    <Box>
      <WalletButton onClick={onConnectWallet} {...props}>
        {t('Connect Wallet')}
      </WalletButton>
    </Box>
  );
};
