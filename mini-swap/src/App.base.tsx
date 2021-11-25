import React, { lazy } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from 'pancake-uikit'
import BigNumber from 'bignumber.js'

import { usePollBlockNumber } from 'state/block/hooks'
import GlobalStyle from './style/Global'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import history from './routerHistory'
import Swap from './views/Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects'
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Test = lazy(() => import('./views/Test'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <SuspenseWithChunkError fallback={<PageLoader />}>
        <Switch>
          
          <Route exact strict path="/" component={Swap} />
          <Route exact strict path="/swap" component={Swap} />
          <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
          <Route exact strict path="/send" component={RedirectPathToSwapOnly} />

          {
            process.env.NODE_ENV === 'development' && (
              <Route path="/test" component={Test} />
            )
          }
          {/* 404 */}
          <Route component={Swap} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </SuspenseWithChunkError>
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
