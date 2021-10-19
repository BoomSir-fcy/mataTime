import React, { useCallback } from 'react'
// import { Button } from 'uikit'
import useAuth from 'hooks/useAuth'
// import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'

export const ConnectWalletButton: React.FC = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  // const { toastCustom, clear } = useToast()
  // const { onPresentConnectModal } = useWalletModal(login, logout, toastCustom, clear)
  const onPresentConnectModal = useCallback(
    () => {
      console.log('12')
    },
    [],
  )

  return (
    <button onClick={onPresentConnectModal} {...props}>
      {t('Connect Wallet')}
    </button>
  )
}

// export ConnectWalletButton
