import React, { useMemo, ReactNode, useState } from 'react'
import MiniSwap from "MiniSwap";
import ReactDOM from 'react-dom'
import useActiveWeb3React from './hooks/useActiveWeb3React'
import { BLOCKED_ADDRESSES } from './config/constants'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import App from './App'
import Providers from './ProvidersBase'

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

function Blocklist({ children }: { children: ReactNode }) {
  const { account } = useActiveWeb3React()
  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return <div>Blocked address</div>
  }
  return <>{children}</>
}
// let isDark = false
// setTimeout(() => {
//   isDark = !isDark
// }, 1000);

// const [isDark, setIsDark] = useState(false)

ReactDOM.render(
  <React.StrictMode>
        {/* <App /> */}
    {/* <button onClick={() => setIsDark(!setIsDark)}>change</button> */}
    {/* {isDark ? 'isDark': 'no-isDark'} */}
    {/* {() => MiniSwap()} */}
    {/* <MiniSwap isDark={isDark} /> */}
    <Providers>
      <Updaters />
      <Blocklist>
        <App />
      </Blocklist>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)



export default MiniSwap