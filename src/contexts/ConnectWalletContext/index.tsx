import React, { useCallback, useEffect, useState } from 'react'
import WalletModal, { Cover } from 'components/ConnectWallet/WalletModal'
import { useWeb3React } from '@web3-react/core'

const ConnectWallet = React.createContext({ onConnectWallet: null })

const ConnectWalletProvider = ({ children }) => {

  const [show, setShow] = useState(false)

  const onConnectWallet = useCallback(() => {
    setShow(true)
  }, [setShow])

  const { chainId } = useWeb3React()

  // XXX: 这样写应该是有问题的 暂时没遇到 也暂时没用更好的方案
  useEffect(() => {
    if (chainId) {
      setShow(false)
    }
  }, [chainId])

  return (
    <ConnectWallet.Provider value={{ onConnectWallet }}>
      <Cover show={show} onClick={() => setShow(false)} />
      <WalletModal show={show} />
      {children}
    </ConnectWallet.Provider>
  )
}

export { ConnectWallet, ConnectWalletProvider }
