import React from 'react'

const ConnectWallet = React.createContext({ onConnectWallet: null })

const ConnectWalletProvider = ({ children, onConnectWallet }) => {

  return <ConnectWallet.Provider value={{onConnectWallet }}>{children}</ConnectWallet.Provider>
}

export { ConnectWallet, ConnectWalletProvider }
