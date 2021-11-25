import React from 'react'
import { Button } from 'pancake-uikit'
import { useTranslation } from 'contexts/Localization'
import useConnectWallet from 'hooks/useConnectWallet'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { onConnectWallet } = useConnectWallet()

  return (
    <Button onClick={onConnectWallet} {...props}>
      {t('Connect Wallet')}
    </Button>
  )
}

export default ConnectWalletButton
