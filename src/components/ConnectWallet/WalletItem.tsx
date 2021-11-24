import React from 'react';
import styled from 'styled-components';
import { Text, Button } from 'uikit';
import connectors, {
  walletLocalStorageKey,
  connectorLocalStorageKey
} from 'config/wallet/config';
import { ConnectorNames, Login, Config } from 'config/wallet';

interface Props {
  walletConfig: Config;
  login: Login;
}

const WalletButton = styled(Button).attrs({ width: '100%', variant: 'text' })`
  align-items: center;
  display: flex;
  /* flex-direction: column; */
  height: auto;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  width: 200px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const WalletItem: React.FC<Props> = ({ login, walletConfig }) => {
  const { title, icon: Icon } = walletConfig;

  return (
    <WalletButton
      variant="tertiary"
      onClick={() => {
        const isIOS =
          /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        // Since iOS does not support Trust Wallet we fall back to WalletConnect
        if (walletConfig.title === 'Trust Wallet' && isIOS) {
          login(ConnectorNames.WalletConnect);
        } else {
          login(walletConfig.connectorId);
        }

        localStorage.setItem(walletLocalStorageKey, walletConfig.title);
        localStorage.setItem(
          connectorLocalStorageKey,
          walletConfig.connectorId
        );
        // onDismiss();
      }}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Icon width="40px" mr="16px" />
      <Text fontSize="14px">{title}</Text>
    </WalletButton>
  );
};

export default WalletItem;
