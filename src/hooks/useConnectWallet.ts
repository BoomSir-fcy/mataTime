import { useContext } from 'react'
import { ConnectWallet } from 'contexts/ConnectWalletContext'

const useConnectWallet = () => {
  const { onConnectWallet } = useContext(ConnectWallet)
  return { onConnectWallet }
}

export default useConnectWallet
